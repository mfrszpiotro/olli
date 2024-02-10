const information = document.getElementById('versions-information') as HTMLParagraphElement
const percentageBarDiv = document.getElementById('percentage-bars') as HTMLDivElement

// @ts-ignore
information.innerText = `This app is using (besides ${versions.test}): Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

const pingPongTest = async () => {
    console.log('Window (renderer) sends "ping" through exposed function ping()...')
    // @ts-ignore
    const response: string = await versions.ping()
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

pingPongTest()
appendPercentageCircle(percentageBarDiv)