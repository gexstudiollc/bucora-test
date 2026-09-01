const { app, BrowserWindow, net } = require('electron');
const path = require('path');

// URL de la web que se muestra dentro de la app
const APP_URL = 'https://bucora.app/ejemplo/';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    icon: path.join(__dirname, '..', 'build', 'icon.png'),
    title: 'Bucora',
    backgroundColor: '#0b1220',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.setMenuBarVisibility(false);

  loadApp();

  // Si la carga falla (sin conexión, DNS caído, servidor no responde, etc.)
  // se muestra la pantalla de "sin conexión" en vez de un error en blanco.
  mainWindow.webContents.on('did-fail-load', (_event, errorCode) => {
    // -3 es ABORTED (por ejemplo al recargar), lo ignoramos
    if (errorCode !== -3) {
      showOfflineScreen();
    }
  });
}

function loadApp() {
  mainWindow.loadURL(APP_URL);
}

function showOfflineScreen() {
  mainWindow.loadFile(path.join(__dirname, 'offline.html'));
}

// Chequeo de conectividad real antes de reintentar
function checkConnectionAndRetry() {
  const request = net.request(APP_URL);
  request.on('response', () => {
    loadApp();
  });
  request.on('error', () => {
    // sigue sin conexión, no hacemos nada, el usuario puede reintentar manualmente
  });
  request.end();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Expuesto para que offline.html pueda pedir un reintento vía IPC si hace falta
const { ipcMain } = require('electron');
ipcMain.on('retry-connection', () => {
  checkConnectionAndRetry();
});
