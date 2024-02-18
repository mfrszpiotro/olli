import { ipcRenderer } from 'electron'
//import { contextBridge } from 'electron'

const testVariable: string = 'testPreloadVariable'

interface HowClose {
    absolute: number,
    absolute_percent: number,
    is_negative: boolean,
    context: string,
}

interface TimeTwoEventsComparison {
    diff_name: string,
    event_a_name: string,
    event_b_name: string,
    time_diff_commit: number,
    time_diff_reference: number,
    how_close: HowClose,
    diff_description: string
}

let testComp: TimeTwoEventsComparison = require('../../process_ollie/test.json');

const customApi = {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    test: testVariable,
    ping: () => ipcRenderer.invoke('ping'),
    testComparison: testComp,
}

//contextBridge.exposeInMainWorld('versions', customApi)
//@ts-ignore
window.testCustomApi = customApi