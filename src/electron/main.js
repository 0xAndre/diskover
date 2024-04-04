const { app, BrowserWindow, ipcMain, ipcRenderer, shell, dialog } = require('electron');
const path = require("path");
const fs = require("fs");
const url = require("url");
const { autoUpdater } = require("electron-updater");

// logger
const logger = require('./logger');

// handlers
const startup = require("./handlers/startup.handler")

var args = process.argv.slice(1),
    serve = args.some(function (val) { return val === '--serve'; });

let win;

// force update on development
Object.defineProperty(app, 'isPackaged', {
    get() {
        return true;
    }
});

// Set update file
autoUpdater.updateConfigPath = path.join(__dirname, 'app-update.yml');

// Disable auto update on quit
autoUpdater.autoInstallOnAppQuit = false;

// Disable pre-release version
autoUpdater.allowPrerelease = false

autoUpdater.on('update-downloaded', (info) => {

    let options = {
        'type': 'question',
        'title': 'Update Available',
        'message': "Update available, do you want to install?",
        'icon': path.join(__dirname, '../favicon.ico'),
        'buttons': [
            'Yes',
            'No'
        ]
    }
    dialog.showMessageBox(win, options)
        .then((result) => {
            if (result.response === 0) {
                autoUpdater.quitAndInstall();
            }
        })
});


function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1024,
        height: 500,
        autoHideMenuBar: true,
        frame: true,
        icon: path.join(__dirname, '../favicon.ico'),
        resizable: false,
        webPreferences: {
            webSecurity: false,
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
            allowRunningInsecureContent: (serve) ? true : false,
        }
    })

    if (serve) {
        var debug = require('electron-debug')
        debug()
        require('electron-reloader')(module)
        win.loadURL('http://localhost:4200')
        win.webContents.openDevTools({ mode: 'detach' });

    } else {
        // Path when running electron executable
        var pathIndex = './index.html';
        if (fs.existsSync(path.join(__dirname, '../../out/diskover/index.html'))) {
            // Path when running electron in local folder
            pathIndex = '../../out/diskover/index.html';
        }
        win.loadURL(url.format({
            pathname: path.join(__dirname, pathIndex),
            protocol: 'file:',
            slashes: true
        }))
    }

    ipcMain.on('maximize-window', () => {
        win.setResizable(true);
        win.maximize();
    });

    ipcMain.handle('open-external-link', (event, link) => {
        shell.openExternal(link)
    })

    // initialize services
    startup.initialize()
    logger.setMainWindow(win);

    win.on('closed', function () {
        win = null
    })
}

// Create window on electron intialization
app.on('ready', () => {
    createWindow();
    console.log('...')
    autoUpdater.checkForUpdates();
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {

    // On macOS specific close process
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // macOS specific close process
    if (win === null) {
        createWindow()
    }
})