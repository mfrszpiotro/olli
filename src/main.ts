import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';

function createWindow(htmlToRenderFilePath: string): void {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        },
    })
    window.loadFile(htmlToRenderFilePath)
}

app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')
    createWindow(path.join(__dirname, 'index.html'))
})


// implement Windows & Linux pattern for quitting the application when all windows are closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})