let mainWindow;

const logger = {
    setMainWindow: (win) => {
        mainWindow = win;
    },
    loading: (message) => {
        if (mainWindow) {
            console.log(`[INFO] ${message}`)
            mainWindow.webContents.send('update-loading-state', message);
        } else {
            console.error('[ERROR] Main window is not defined.');
        }
    },
    app: (message) => {
        if (mainWindow) {
            console.log(`[INFO] ${message}`)
            mainWindow.webContents.send('app-state', message);
        } else {
            console.error('[ERROR] Main window is not defined.');
        }
    }
};

module.exports = logger;
