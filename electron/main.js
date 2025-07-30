import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import psList from 'ps-list';

import googleTTS from 'google-tts-api';



// Get directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

let win; //this is the handle for our main window
let overlayWindow; //this is the handle for our overlay window

function createWindow() {
  // Create the browser window with better security settings
  win = new BrowserWindow({
    width: 800,
    height: 1200,
    resizable: true,          //  Disable resizing
    frame: true,              //  Remove native frame
    titleBarStyle: 'default',  
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: false,  // Disable Node.js integration in the renderer process
      contextIsolation: true,  // Enable context isolation
      enableRemoteModule: false, // Disable remote module
      sandbox: false,          // Required for some nodeIntegration features
      webSecurity: true,       // Enable web security
      webviewTag: false        // Disable webview tag for security
    },
  });

  // Show window when it's ready to prevent flickering
  win.once('ready-to-show', () => {
    win.show()
    if (isDev) {
      //win.webContents.openDevTools()
    }
  });

  // Load the app
  const startUrl = isDev 
    ? 'http://localhost:5173' 
    : `file://${path.join(__dirname, '../dist/index.html')}`;

  win.loadURL(startUrl).catch(err => {
    console.error('Failed to load URL:', err);
    app.quit();
  });

  // Handle window being closed
  win.on('closed', () => {
    win.destroy();
  });
}

function createOverlayWindow() {
  // Create the browser window with better security settings
  overlayWindow = new BrowserWindow({
    fullscreen: true,
    frame: true,   
    transparent: true, 
    alwaysOnTop: true,
    autoHideMenuBar: true,
    skipTaskbar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: false,  // Disable Node.js integration in the renderer process
      contextIsolation: true,  // Enable context isolation
      enableRemoteModule: false, // Disable remote module
      sandbox: false,          // Required for some nodeIntegration features
      webSecurity: true,       // Enable web security
      webviewTag: false        // Disable webview tag for security
    },
  });

  overlayWindow.on('blur', () => {
    overlayWindow.setBackgroundColor("#00000000");
    console.log("blur");

  });

  overlayWindow.on('focus', () => {
    overlayWindow.setBackgroundColor("#00000000");
    console.log("focus");
  });

  // Show window when it's ready to prevent flickering
  overlayWindow.once('ready-to-show', () => {
    overlayWindow.show()
  });

  overlayWindow.setIgnoreMouseEvents(true, { forward: true });
  overlayWindow.loadFile('overlay.html');

}

// initialization and is ready to create browser windows.
app.whenReady().then(createWindow);

ipcMain.handle('open-overlay', async () => {
  //check if sc.exe is running
  const processes = await psList();

  for (const process of processes) {
    if (process.name === 'StarCitizen.exe') {
      console.log("we good bro", process.name, process.pid);
      if (overlayWindow) overlayWindow.destroy();
      app.whenReady().then(createOverlayWindow);
      return true;
    }
  }

  console.log("StarCitizen is not running");
  return false;
});

ipcMain.handle('get-tts-url', async (event, text) => {
    const base64 = await googleTTS.getAudioBase64(text, {
      lang: 'en',
      slow: false,
      host: 'https://translate.google.com'
    });
    return `data:audio/mp3;base64,${base64}`;

});

ipcMain.on('close-overlay', async () => {
  overlayWindow.destroy();
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('get-version', async () => {
  return app.getVersion();
});

ipcMain.on('window-control', (event, action) => {
  const win = BrowserWindow.getFocusedWindow();
  if (!win) return;

  if (action === 'minimize') win.minimize();
  else if (action === 'close') win.close(); // removed maximize
});

// Handle any uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);  
});
