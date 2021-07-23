import Game_01_View from './Game_01_View.js'
import Game_02_View from './Game_02_View.js'
import Game_03_View from './Game_03_View.js'
import FitnesTest from './ExamView.js'
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
    let Views = [SensorHistogram, CalibrationView, Game_01_View, Game_02_View, FitnesTest, Game_03_View]
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
        params.newLogSession(viewNumber)
    }

    p.draw = function () {
        p.updateSensorValues()
        View.draw()
        if (removeSketch) {
            p.remove() // distroy sketch
        }
    }

    p.windowResized = function () {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
        p.width = p.windowWidth // correcting for bug in p5js
        p.height = p.windowHeight // correcting for bug in p5js
        console.log("resize")
    }

    p.updateSensorValues = function () {
        let  sensorValues = blehandler.getSensorValues()
        params.setSensorValues(sensorValues)
        // return sensorValues
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
        clearTimeout(Timer.event)
        // stop all sound oscilators and envelopes
        Timer.envelopes.forEach(
            item => item.dispose()
        );
        if (Tone !== undefined) {
            Tone.Transport.stop()
            removeSketch = true
             params.saveLocal()
        }
    }
}
export default defineSketch
