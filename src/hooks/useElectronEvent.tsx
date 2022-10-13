import { useEffect } from "react";
import { NavigateFunction } from "react-router-dom";
import { AccessToken } from "../github-api/types/types";
const electron = window.require("electron");

const useElectronEvent = (navigate?: NavigateFunction) => {
    useEffect(() => {
        electron.ipcRenderer.on("login-reply", (e: any, arg: AccessToken) => {
            localStorage.setItem("token", `${arg.access_token}`);
            if (navigate) navigate("/home", { replace: true });
        });
    }, []);

    useEffect(() => {
        electron.ipcRenderer.on("tray-menu-logout", () => {
            localStorage.removeItem("token");
            if (navigate) navigate("/", { replace: true });
        });
    }, []);
};

export default useElectronEvent;
