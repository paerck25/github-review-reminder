import { app, BrowserWindow, Notification, ipcMain, Tray, nativeImage, Menu } from "electron";
import * as isDev from "electron-is-dev";
import * as path from "path";
import axios from "axios";

let tray;

ipcMain.on("login", async (event, arg) => {
    const REDIRECT_URL = "http://localhost/auth?code=";
    const getAccessToken = async (url: string) => {
        if (url.includes(REDIRECT_URL)) {
            const code = url.replace(REDIRECT_URL, "");
            const { data } = await axios.post(
                "https://github.com/login/oauth/access_token",
                {
                    code: code,
                    client_id: arg.client_id,
                    client_secret: arg.client_secret
                },
                {
                    headers: {
                        Accept: "application/json"
                    }
                }
            );
            return data;
        }
        return null;
    };
    const win = new BrowserWindow({
        width: 600,
        height: 500,
        webPreferences: {
            devTools: false
        }
    });
    win.loadURL(arg.getCodeUrl);
    win.webContents.on("will-navigate", async (e, next) => {
        const token = await getAccessToken(next);
        if (token) {
            event.reply("login-reply", token);
            win.destroy();
        }
    });
    win.webContents.on("did-redirect-navigation", async (e, url) => {
        const token = await getAccessToken(url);
        if (token) {
            event.reply("login-reply", token);
            win.destroy();
        }
    });
});

ipcMain.on("review_notification", async (event, arg) => {
    if (arg.review_count === 0) {
        return app.dock.setBadge("");
    }
    app.dock.bounce("informational");
    app.dock.setBadge(`${arg.review_count}`);
    new Notification({ title: "리뷰 요청 알림!", body: `리뷰를 원하는 PR이 ${arg.review_count}개 있습니다.` }).show();
});

function createWindow() {
    const win = new BrowserWindow({
        width: 500,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: false
        }
    });
    if (isDev) {
        win.loadURL("http://localhost:3000");
        win.webContents.openDevTools();
    } else {
        win.loadFile(path.join(__dirname, "../build/index.html"));
    }

    return win;
}

app.whenReady().then(() => {
    const win = createWindow();
    const icon = nativeImage.createFromPath(path.join(__dirname, "assets/icons/notification_32x32.png"));
    const resizedIcon = icon.resize({ width: 16, height: 16 });
    tray = new Tray(resizedIcon);
    const contextMenu = Menu.buildFromTemplate([
        { label: "열기", type: "normal", click: createWindow },
        { type: "separator" },
        {
            label: "로그아웃",
            type: "normal",
            click: () => {
                win.webContents.postMessage("tray-menu-logout", "logut");
            }
        },
        { type: "separator" },
        { label: "종료", type: "normal", click: () => app.quit() }
    ]);
    tray.setContextMenu(contextMenu);
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
