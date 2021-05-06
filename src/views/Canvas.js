import Game_01_View from './Game_01_View.js'
import Game_02_View from './Game_02_View.js'
import SensorView from './SensorView.js'
let viewNumber
let blehandler
let params
let debug
let View
let Tone
let Timer = {"event":null, "envelopes":[]} // timeout object for game timing
const Canvas = (p) => {
    let Views = [SensorView, Game_01_View, Game_02_View]
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
        View = new Views[viewNumber](p, Tone, Timer, params)
    }

    p.draw = function () {
        sensorValues = p.updateSensorValues()
        params.setSensorValues(sensorValues)
        View.draw(p, params)
    }

    p.windowResized = function () {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
    }

    p.updateSensorValues = function () {
        let  sensorValues = blehandler.getSensorValues()
        return sensorValues
    }
}

function defineSketch(options) {
    //blehandler
    if (options.remove == null) {
    params = options.params
    blehandler = options.blehandler
    Tone = options.tone
    if (blehandler.isConnected != null) {
        debug = false
    } else {
        debug = true
    }
    viewNumber = options.viewNumber
    return Canvas
    } else {
        console.log("remove timeout events")
        clearTimeout(Timer.event)
        // stop all sound oscilators and envelopes
        Timer.envelopes.forEach(
            item => item.dispose()
        );
        Tone.Transport.stop()
    }
}
export default defineSketch
