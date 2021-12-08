import { app, BrowserWindow, Notification, ipcMain } from "electron";
import * as isDev from "electron-is-dev";
import * as path from "path";
import axios from "axios";

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
