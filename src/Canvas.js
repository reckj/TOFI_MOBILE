import Game_01_View from './Game_01_View.js'
import SensorView from './SensorView.js'
let viewNumber
let blehandler
let params
let debug
let Tone
const Canvas = (p) => {
    let View
    let Views = [SensorView, Game_01_View]
    let myFont
    let sensorValues = []
    p.preload = function () {
        //todo: fix font load
       // myFont = p.loadFont('../static/fonts/inconsolata.otf')
        console.log()
    }

    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight)
       // p.textFont(myFont)
        p.textSize(p.width / 100)
        p.fill(255)
        p.noStroke()
        p.textAlign(p.CENTER, p.CENTER)
        View = new Views[viewNumber](p, Tone)
    }

    p.draw = function () {
        sensorValues = p.updateSensorValues()
        View.draw(p, sensorValues, params)
    }

    p.windowResized = function () {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
    }

    p.updateSensorValues = function () {
        let sensorValues = []
            for (let i = 0; i < blehandler.sensorValues.length; i++) {
                sensorValues.push(blehandler.sensorValues[i])
            }
            blehandler.updateFilters(params.getFilters())
        return sensorValues
    }
}
function defineSketch(_viewNumber, _blehandler, _params, _tone){
    //blehandler
    params = _params
    blehandler = _blehandler
    Tone = _tone
    if (blehandler.isConnected != null) {
        debug = false
    } else {
        debug = true
    }
    viewNumber = _viewNumber
    return Canvas
}

export default defineSketch