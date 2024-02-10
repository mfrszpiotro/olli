import { contextBridge, ipcRenderer } from 'electron'

const testVariable: string = 'testPreloadVariable'

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    test: testVariable,
    ping: () => ipcRenderer.invoke('ping'),
})