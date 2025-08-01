// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods in a way that doesn't allow the renderer
// to access everything in the main process

const api = {
    // Window control
    windowControl: (action) => ipcRenderer.send('window-control', action),
    
    // You can expose specific APIs here if needed
    // For example:
    // send: (channel, data) => ipcRenderer.send(channel, data),
    // receive: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
    
    getAppVersion: () => ipcRenderer.invoke('get-version'),
    openOverlay: () => ipcRenderer.invoke('open-overlay'),
    closeOverlay: () => ipcRenderer.send('close-overlay'),
    getTTSUrl: (text) => ipcRenderer.invoke('get-tts-url', text),
    getSettings: (settings) => ipcRenderer.invoke('get-settings', settings),
    saveSettings: (settings) => ipcRenderer.invoke('save-settings', settings),
    sendStatusUpdate: (message, error = false) => ipcRenderer.send('status-update', { message, error }),

    // Example of exposing process.versions
    versions: {
      node: process.versions.node,
      chrome: process.versions.chrome,
      electron: process.versions.electron,
    },
  }

contextBridge.exposeInMainWorld('electronAPI', api);

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});
