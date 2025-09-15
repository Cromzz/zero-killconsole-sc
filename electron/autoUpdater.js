import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { autoUpdater } = require('electron-updater');

function setupAutoUpdater(win) {
     
    autoUpdater.forceDevUpdateConfig = true;
    autoUpdater.autoDownload = true;

    autoUpdater.on('check-for-updates', () => {
      console.log('Checking for update...');
      win.webContents.send('update-checking');
    });
  
    autoUpdater.on('update-available', (info) => {
      console.log('Update available:', info);
      win.webContents.send('update-available', info);
    });
  
    autoUpdater.on('update-not-available', (info) => {
      console.log('No update available:', info);
      win.webContents.send('update-not-available', info);
    });
  
    autoUpdater.on('error', (error) => {
      console.error('Update error:', error);
      win.webContents.send('update-error', error.message || error.toString());
    });
  
    autoUpdater.on('download-progress', (progress) => {
      const { percent, transferred, total, bytesPerSecond } = progress;
  
      console.log(
        `Download progress: ${percent.toFixed(2)}% (${transferred}/${total}) at ${bytesPerSecond} Bps`
      );
  
      win.webContents.send('update-download-progress', {
        percent,
        transferred,
        total,
        bytesPerSecond
      });
    });
  
    autoUpdater.on('update-downloaded', (info) => {
      console.log('Update downloaded:', info);
      win.webContents.send('update-downloaded', info);
    });
    win.once('ready-to-show', () => {
        setTimeout(() => {
            autoUpdater.checkForUpdatesAndNotify();
          }, 1000);
    });
}

export { setupAutoUpdater };