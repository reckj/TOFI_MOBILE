import Game_01_View from './Game_01_View.js'
import Game_02_View from './Game_02_View.js'
import SensorHistogram from './SensorHistogram.js'
import CalibrationView from './CalibrationView.js'
let viewNumber
let blehandler
let params
let debug
let View
let Tone
let removeSketch = false;
let Timer = {"event":null, "envelopes":[]} // timeout object for game timing
const Canvas = (p) => {
    let Views = [SensorHistogram, CalibrationView, Game_01_View, Game_02_View]
    let myFont
    let sensorValues = []
    p.preload = function () {
        //todo: fix font load
       // myFont = p.loadFont('../static/fonts/inconsolata.otf')
    }

    p.setup = function () {
        p.createCanvas(document.documentElement.clientWidth, document.documentElement.clientHeight)
        p.windowWidth = document.documentElement.clientWidth
        p.windowHeight = document.documentElement.clientHeight
        p.width = p.windowWidth // correcting for bug in p5js
        p.height = p.windowHeight // correcting for bug in p5js
        console.log(document.documentElement.clientWidth+"new view"+ p.windowWidth)
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
        View.draw()
        if (removeSketch) {
            p.remove() // distroy sketch
        }
    }

    p.windowResized = function () {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
        console.log("resize")
    }

    p.updateSensorValues = function () {
        let  sensorValues = blehandler.getSensorValues()
        return sensorValues
    }
}

function defineSketch(options) {
    removeSketch = false
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
        removeSketch = true
    }
}
export default defineSketch
