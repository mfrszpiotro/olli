import { TimeTwoEventsComparison } from "./data_interfaces/time_two_events_comparison"
import { CustomApi } from "./preload"

const information = document.getElementById('versions-information') as HTMLParagraphElement

// @ts-ignore
let preloadedApi = testCustomApi as CustomApi

information.innerText = `This app is using (besides ${preloadedApi.test}): Chrome (v${preloadedApi.chrome()}), Node.js (v${preloadedApi.node()}), and Electron (v${preloadedApi.electron()})`

const pingPongTest = async () => {
    console.log('Window (renderer) sends "ping" through exposed function ping()...')
    const response: string = await preloadedApi.ping()
    console.log(`And window (renderer) receives "${response}" from the main process which handles the "ping" IPC message.`)
}


function createPercentageCircle(percentage: number): HTMLDivElement {
    const percentageCircle = document.createElement('div')
    percentageCircle.classList.add('c100', 'p50', 'big')

    const percentageValue = `${percentage.toString()}%`
    const percentageValueSpan = document.createElement('span')
    percentageValueSpan.textContent = percentageValue
    percentageCircle.appendChild(percentageValueSpan)

    const sliceDiv = document.createElement('div')
    sliceDiv.classList.add('slice')
    const barDiv = document.createElement('div')
    barDiv.classList.add('bar')
    sliceDiv.appendChild(barDiv)
    const fillDiv = document.createElement('div')
    fillDiv.classList.add('fill')
    sliceDiv.appendChild(fillDiv)
    percentageCircle.appendChild(sliceDiv)

    return percentageCircle
}

function appendPercentageCircle(targetDiv: HTMLDivElement) {
    const circle = createPercentageCircle(67)
    targetDiv.appendChild(circle)
}

function insertHtmlPlotIntoElement(elementId: string, filepath: string) {
    document.getElementById(elementId)!.innerHTML =
        `<object class="plot" type="text/html" data="${filepath}"></object>`
}

const appendTestComparisonTable = async () => {
    const comparison: TimeTwoEventsComparison = preloadedApi.testComparison
    const table = document.createElement('table')
    const row = document.createElement('tr')
    const dataLeft = document.createElement('td')
    dataLeft.innerText = comparison.event_a_name
    row.appendChild(dataLeft)
    const dataRight = document.createElement('td')
    dataRight.innerText = comparison.event_b_name
    row.appendChild(dataRight)
    table.appendChild(row)
    comparisonTablesDiv.appendChild(table)
}

const percentageBarsDiv = document.getElementById('percentage-bars') as HTMLDivElement
const comparisonTablesDiv = document.getElementById("comparison-tables") as HTMLDivElement

pingPongTest()
appendPercentageCircle(percentageBarsDiv)
insertHtmlPlotIntoElement("rising-plot", "./process_ollie/DynamicTimeWarp_Rising_crotch_angle_smooth.html")
insertHtmlPlotIntoElement("falling-plot", "./process_ollie/DynamicTimeWarp_Falling_crotch_angle_smooth.html")
appendTestComparisonTable()