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
    getTTSStatus: (status) => ipcRenderer.invoke('get-tts-status', status),
    setTTSStatus: (status) => ipcRenderer.send('set-tts-status', status),
    getTTSVolume: (volume) => ipcRenderer.invoke('get-tts-volume', volume),
    

    getLoggingStatus: (status) => ipcRenderer.invoke('get-logging-status', status),
    setLoggingStatus: (status) => ipcRenderer.send('set-logging-status', status),

    getSettings: (settings) => ipcRenderer.invoke('get-settings', settings),
    saveSettings: (settings) => ipcRenderer.invoke('save-settings', settings),
    
    onStatusUpdate: (callback) => ipcRenderer.on('status-update', (event, data) => {
      callback(data)}
    ),

    onKillEvent: (callback) => ipcRenderer.on('kill-event', (event, data) => {
      callback(data)}
    ),

    onIncapEvent: (callback) => ipcRenderer.on('incap-event', (event, data) => {
      callback(data)}
    ),

    // Update handling
    onUpdateCheck: (callback) => ipcRenderer.on('update-checking', () => callback()),

    onUpdateAvailable: (callback) => ipcRenderer.on('update-available', (event, data) => {
      callback(data)}
    ),
    onUpdateError: (callback) => ipcRenderer.on('update-error', (event, data) => {
      callback(data)}
    ),
    onDownloadProgress: (callback) => ipcRenderer.on('update-download-progress', (_event, data) => {
      callback(data);
    }),
    
    getGroupServerStatus: (status) => ipcRenderer.invoke('get-group-server-status', status),
    getGroupCode: (code) => ipcRenderer.invoke('get-group-code', code),
    toggleStatus: (status) => ipcRenderer.invoke('toggle-group-status', status),
    generateGroupCode: (code) => ipcRenderer.invoke('generate-group-code', code),

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
