//import Game01 from './views/Game01.js'
//import Game02 from './views/Game02.js'
//import Game03 from './views/Game03.js'
//import Game04 from './views/Game04.js'
//import StatisticsOverview from './views/StatisticsOverview.js'
//import SpeedTest from './views/SpeedTest.js'
//import StrengthTest from './views/StrengthTest.js'
//import SensorHistogram from './views/SensorHistogram.js'
//import Calibration from './views/Calibration.js'
import {StatisticsOverview, Game01, Game02, Game03, Game04, SpeedTest, StrengthTest, SensorHistogram, Calibration, Game05} from './views/Views.js';
let viewNumber
let blehandler
let params
let debug
let View
let Tone
let WEGL3D
let removeSketch = false;
let Timer = {"event":null, "envelopes":[]} // timeout object for game timing
const Canvas = (p) => {
    let Views = [SensorHistogram, Calibration, Game01, Game02, SpeedTest, Game03, Game04, StrengthTest, StatisticsOverview, Game05]
    let myFont
    let sensorValues = []
    p.preload = function () {
        //todo: fix font load
        myFont = p.loadFont('./css/fonts/barlow_condensed.otf')
    }

    p.setup = function () {
        if (!WEGL3D) {
            p.createCanvas(document.documentElement.clientWidth, document.documentElement.clientHeight)
        } else {
            p.createCanvas(document.documentElement.clientWidth, document.documentElement.clientHeight, p.WEBGL)
        }
        p.windowWidth = document.documentElement.clientWidth
        p.windowHeight = document.documentElement.clientHeight
        p.width = p.windowWidth // correcting for bug in p5js
        p.height = p.windowHeight // correcting for bug in p5js
        p.textFont('system-ui')
        p.textSize(p.height / 100)
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
        p.textSize(p.height / 50)
        View.windowResized();
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
        // return new object
        params = options.params
        blehandler = options.blehandler
        Tone = options.tone
        WEGL3D = options.WEGL3D
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
        }
        // save data if the params object exists
        if (typeof params != "undefined") {
                params.saveLocal()
        }
        removeSketch = true
    }
}
export default defineSketch
