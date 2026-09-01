const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('bucoraApp', {
  retryConnection: () => ipcRenderer.send('retry-connection'),
});
