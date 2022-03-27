const electron = window.require("electron");

const addZero = (time: number) => {
    return time < 10 ? `0${time}` : time;
};

export const convertDate = (date: Date | string) => {
    const now = new Date(date);
    const Y = now.getFullYear();
    const m = now.getMonth() + 1;
    const d = now.getDate();
    const hour = now.getHours();
    const min = now.getMinutes();
    const sec = now.getSeconds();
    return `${Y}.${addZero(m)}.${addZero(d)} ${addZero(hour)}:${addZero(min)}:${addZero(sec)}`;
};

export const openBrowser = (href: string) => {
    electron.shell.openExternal(href);
};
