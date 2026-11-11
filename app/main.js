const { app, BrowserWindow, Menu, dialog, session, shell } = require("electron");
const path = require("path");

function createWindow() {
  Menu.setApplicationMenu(null);
  const win = new BrowserWindow({
    width: 1100,
    height: 800,
    minWidth: 380,
    minHeight: 500,
    title: "מחלק הקבוצות",
    autoHideMenuBar: true,
    webPreferences: { contextIsolation: true, sandbox: true }
  });
  // Word export goes through a normal Save dialog.
  session.defaultSession.on("will-download", (e, item) => {
    const target = dialog.showSaveDialogSync(win, { defaultPath: item.getFilename() });
    if (target) item.setSavePath(target); else item.cancel();
  });
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });
  win.loadFile(path.join(__dirname, "www", "index.html"));
}

app.whenReady().then(createWindow);
app.on("window-all-closed", () => app.quit());
