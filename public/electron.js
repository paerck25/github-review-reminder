"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var electron_1 = require("electron");
var isDev = require("electron-is-dev");
var path = require("path");
var axios_1 = require("axios");
var tray;
electron_1.ipcMain.on("auth", function (event, arg) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1["default"].post("https://github.com/login/oauth/access_token", __assign({}, arg), {
                    headers: {
                        Accept: "application/json"
                    }
                })];
            case 1:
                data = (_a.sent()).data;
                event.reply("access_code", data);
                return [2 /*return*/];
        }
    });
}); });
electron_1.ipcMain.on("review_notification", function (event, arg) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (arg.review_count === 0) {
            return [2 /*return*/, electron_1.app.dock.setBadge("")];
        }
        electron_1.app.dock.bounce("informational");
        electron_1.app.dock.setBadge("".concat(arg.review_count));
        new electron_1.Notification({ title: "리뷰 요청 알림!", body: "\uB9AC\uBDF0\uB97C \uC6D0\uD558\uB294 PR\uC774 ".concat(arg.review_count, "\uAC1C \uC788\uC2B5\uB2C8\uB2E4.") }).show();
        return [2 /*return*/];
    });
}); });
function createWindow() {
    var win = new electron_1.BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    var startUrl = "http://localhost:3000";
    if (isDev) {
        win.loadURL(startUrl);
        win.webContents.openDevTools();
    }
    else {
        win.loadFile(path.join(__dirname, "../build/index.html"));
    }
    return win;
    // const icon = nativeImage.createFromPath(path.join(__dirname, "ICON_PATH"));
    // app.dock.setIcon(icon);
}
electron_1.app.whenReady().then(function () {
    var win = createWindow();
    var icon = electron_1.nativeImage.createFromPath(path.join(__dirname, "assets/icons/notification_32x32.png"));
    var resizedIcon = icon.resize({ width: 16, height: 16 });
    tray = new electron_1.Tray(resizedIcon);
    var contextMenu = electron_1.Menu.buildFromTemplate([
        { label: "열기", type: "normal", click: createWindow },
        { type: "separator" },
        {
            label: "로그아웃",
            type: "normal",
            click: function () {
                win.loadURL("http://localhost:3000/logout");
            }
        },
        { type: "separator" },
        { label: "종료", type: "normal", click: function () { return electron_1.app.quit(); } }
    ]);
    tray.setContextMenu(contextMenu);
});
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", function () {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
