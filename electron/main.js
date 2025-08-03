import { app, BrowserWindow, ipcMain } from 'electron';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { splitEntriesByTimestamp, parseKillEntry, parseIncapEntry } from './logParser.js';
import googleTTS from 'google-tts-api';
import config_store from './storage.js'



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
    ? 'http://localhost:5173?window=main' 
    : `file://${path.join(__dirname, '../dist/index.html?window=main')}`;

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
  try {
    console.log("Creating overlay window");
    // Create the browser window with better security settings
    overlayWindow = new BrowserWindow({
      fullscreen: true, //prod true
      frame: true,   
      transparent: true, //prod true
      alwaysOnTop: true, //prod true
      autoHideMenuBar: true, //prod true
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

    overlayWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
    overlayWindow.setAlwaysOnTop(true, 'screen-saver', 1);
    
    overlayWindow.webContents.openDevTools({ mode: 'detach' });
  } catch (error) {
    console.error('Failed to create overlay window:', error);
    app.quit();
  }
  
  overlayWindow.on('blur', () => {
    overlayWindow.setBackgroundColor("#00000000");
  });

  overlayWindow.on('focus', () => {
    overlayWindow.setBackgroundColor("#00000000");        
  });

  // Show window when it's ready to prevent flickering
  overlayWindow.once('ready-to-show', () => {
    overlayWindow.show()
  });

  overlayWindow.setIgnoreMouseEvents(true, { forward: true });

  const startUrl = isDev ? 'http://localhost:5173/index.html?window=overlay' : `file://${path.join(__dirname, '../dist/index.html?window=overlay')}`;

  overlayWindow.loadURL(startUrl).catch(err => {
    console.error('Failed to load URL:', err);
    app.quit();
  }); 
}

// initialization and is ready to create browser windows.
app.whenReady().then(createWindow);

ipcMain.handle('open-overlay', async () => {
  //check if sc.exe is running
  //TODO: implement check for star citizen process which matches build
  createOverlayWindow();
  return true;

});

ipcMain.handle('get-tts-url', async (event, text) => {
    const base64 = await googleTTS.getAudioBase64(text, {
      lang: config_store.get('ttsLanguage') || 'en',
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

ipcMain.handle('get-settings', async () => {
    return {
      gameDirectory: config_store.get('gameDirectory'),
      ttsLanguage: config_store.get('ttsLanguage'),
      apiKey: config_store.get('apiKey'),
      ttsVolume: config_store.get('ttsVolume'),
      overlayPosition: config_store.get('overlayPosition')
    };
});

ipcMain.handle('save-settings', async (event, settings) => {

    config_store.set('gameDirectory', settings.gameDirectory);
    config_store.set('ttsLanguage', settings.ttsLanguage);
    config_store.set('apiKey', settings.apiKey);
    config_store.set('ttsVolume', settings.ttsVolume);
    config_store.set('overlayPosition', settings.overlayPosition);
    return true;
}); 

ipcMain.handle('get-tts-status', async () => {
    return config_store.get('ttsStatus');
});

ipcMain.on('set-tts-status', async (event, status) => {
    config_store.set('ttsStatus', status);
});

ipcMain.handle('get-tts-volume', async () => {
  return config_store.get('ttsVolume');
});

ipcMain.handle('get-logging-status', async () => {
    return config_store.get('loggingStatus');
});

ipcMain.on('set-logging-status', async (event, status) => {
    config_store.set('loggingStatus', status);
});


ipcMain.on('window-control', (event, action) => {
  const win = BrowserWindow.getFocusedWindow();
  if (!win) return;

  if (action === 'minimize') win.minimize();
  else if (action === 'close')
  {
    win.close();
    overlayWindow.close();
  }  // removed maximize
});

// Handle any uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);  
});

///////////// LOG READER /////////////

let lastSize = 0;
const processedEntries = new Set();

let LOG_FILE_PATH = config_store.get('gameDirectory') ? 
path.resolve(config_store.get('gameDirectory') + '/Game.log') : '';


setInterval(() => {
  if (config_store.get('loggingStatus')) {
    readNewLogData(); 
  }
  else {
    sendStatusUpdate('Logging stopped');
  }
}, 500);


function readNewLogData() {
  sendStatusUpdate('Reading... ' + LOG_FILE_PATH);
  
  fs.stat(LOG_FILE_PATH, (err, stats ) => {
    if (err) {
      sendStatusUpdate('Log file not found: ' + LOG_FILE_PATH, true);
      return;
    }
    
    // On first run, set initial size and don't read anything
    if (lastSize === 0) {
      lastSize = stats.size;
      sendStatusUpdate(`Watching log file: ${LOG_FILE_PATH}`);
      return;
    }
    
    // Handle log rotation (file became smaller)
    if (stats.size < lastSize) {
      sendStatusUpdate('Log file rotated, resetting...');
      lastSize = 0;
      return;
    }
    
    // Only read if there's new content
    if (stats.size > lastSize) {
      const stream = fs.createReadStream(LOG_FILE_PATH, {
        start: lastSize,
        end: stats.size,
        encoding: 'utf-8',
      });
  
      let leftover = '';
  
      stream.on('data', (chunk) => {
        const data = leftover + chunk;
        const entries = splitEntriesByTimestamp(data);
        sendStatusUpdate('Processing log entries... ' + LOG_FILE_PATH);
        for (const entry of entries) {
          if (entry.includes('killed by') || entry.includes('_NPC_')) {
            const killInfo = parseKillEntry(entry);
            if (killInfo) {
              const uniqueKey = killInfo.timestamp + "KILL" +killInfo.killerName + Math.random()*1000;
  
              if (!processedEntries.has(uniqueKey)) {
                processedEntries.add(uniqueKey);
                win.webContents.send('kill-event', killInfo);
                if (overlayWindow) overlayWindow.webContents.send('kill-event', killInfo);
              }
            }
          }
          if (entry.includes('<Spawn Flow> CSCPlayerPUSpawningComponent::UnregisterFromExternalSystems')) {
            const incapInfo = parseIncapEntry(entry);
            if (incapInfo) {
              const uniqueKey = incapInfo.timestamp + "INCAP" +incapInfo.victimName + Math.random()*1000;
  
              if (!processedEntries.has(uniqueKey)) {
                processedEntries.add(uniqueKey);
                win.webContents.send('incap-event', incapInfo);
                if (overlayWindow) overlayWindow.webContents.send('incap-event', incapInfo);
              }
            }
          }
        }
    });
  
      stream.on('end', () => {
        lastSize = stats.size;
      });
  
      stream.on('error', (error) => {
        sendStatusUpdate('Stream read error', true);
      });
    }
  });
}

function sendStatusUpdate(message, error = false) {
  win.webContents.send('status-update', { message, error });
}
