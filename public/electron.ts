import { app, BrowserWindow, Notification, ipcMain, Tray, nativeImage, Menu } from "electron";
import * as isDev from "electron-is-dev";
import * as path from "path";
import axios from "axios";

let tray;

ipcMain.on("auth", async (event, arg) => {
    const { data } = await axios.post(
        "https://github.com/login/oauth/access_token",
        {
            ...arg
        },
        {
            headers: {
                Accept: "application/json"
            }
        }
    );
    event.reply("access_code", data);
});

function createWindow() {
    const win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
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

    // const icon = nativeImage.createFromPath(path.join(__dirname, "ICON_PATH"));

    // app.dock.setIcon(icon);
}

app.whenReady().then(() => {
    const icon = nativeImage.createFromPath(path.join(__dirname, "assets/icons/notification_32x32.png"));
    const resizedIcon = icon.resize({ width: 16, height: 16 });
    tray = new Tray(resizedIcon);
    const contextMenu = Menu.buildFromTemplate([
        { label: "열기", type: "normal", click: createWindow },
        { label: "종료", type: "normal", click: () => app.quit() }
    ]);
    tray.setContextMenu(contextMenu);
    createWindow();
});

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
