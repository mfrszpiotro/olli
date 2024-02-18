import { ipcRenderer } from 'electron'
import { TimeTwoEventsComparison } from './data_interfaces/time_two_events_comparison'

const testVariable: string = 'testPreloadVariable'

const testComp: TimeTwoEventsComparison = require('../../process_ollie/test.json');

export interface CustomApi {
    node: () => string,
    chrome: () => string,
    electron: () => string,
    test: string,
    ping: () => Promise<any>,
    testComparison: TimeTwoEventsComparison
}

let customApi = {} as CustomApi
customApi = {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    test: testVariable,
    ping: () => ipcRenderer.invoke('ping'),
    testComparison: testComp,
}

//@ts-ignore
window.testCustomApi = customApi

