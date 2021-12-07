const { app, BrowserWindow, Notification, Tray, Menu, nativeImage } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const { ipcMain } = require("electron");
ipcMain.on("asynchronous-message", (event, arg) => {
    console.log("테스트", arg);
    new Notification({ title: "테스트", body: arg }).show();
    event.reply("asynchronous-reply", "pong");
});

ipcMain.on("synchronous-message", (event, arg) => {
    new Notification({ title: "테스트", body: arg }).show();
    event.returnValue = "pong";
});

function createWindow() {
    const win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
        }
    });

    const startUrl = "http://localhost:3000";

    if (isDev) {
        win.loadURL(startUrl);
        win.webContents.openDevTools();
    } else {
        win.loadFile(path.join(__dirname, "../build/index.html"));
    }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
