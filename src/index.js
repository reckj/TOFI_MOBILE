import P5 from 'p5'
import defineSketch from './views/Canvas.js'
import BLEhandler from './BLEhandler.js'
import Parameters from './Parameters'
import BleSimulator from './BleSimulator'
import CalibrationGUI from './CalibrationGUI'
import * as Tone from 'tone'
let ons = require('onsenui')
ons.disableIconAutoPrefix() // Disable adding fa- prefix automatically to ons-icon classes. Useful when including custom icon packs.

let blehandler
let currentView = 1
let calibrationGUI
let params
let PFIVE

class GUIInterface {
    constructor(object) {
        this.object = object;
    }
}
// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false)


function onDeviceReady() {

    // Cordova is now initialized. Have fun!
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version)
    // add gui
    createBLEDialog()
    params = Parameters // myBLE.id // handles storage for paremeters for interpreting sensor values
    blehandler = new BleSimulator(params)
    calibrationGUI = new CalibrationGUI(params)
    calibrationGUI.toggle(false)
    console.log('handling sounds')
    //document.addEventListener("mouseClick", RunToneConext, false);
    document.addEventListener("click", RunToneConext, false);
    // document.addEventListener("touchstart", RunToneConext, false);
}
// user keyboard for debuging when device not connected
document.addEventListener('keydown', function(event) {
    if (blehandler instanceof BleSimulator) {
        if (event.key == 1) {
            blehandler.setSensorFake(0)
        } else if (event.key == 2) {
            blehandler.setSensorFake(1)
        } else if (event.key == 3) {
            blehandler.setSensorFake(2)
        } else if (event.key == 4) {
            blehandler.setSensorFake(3)
        } else if (event.key == 5) {
            blehandler.setSensorFake(4)
        } else if (event.key == 6) {
            blehandler.setSensorFake(5)
        }else if (event.key == 7) {
            blehandler.setSensorFake(6)
        } else if (event.key == 8) {
            blehandler.setSensorFake(7)
        }
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////// Game /////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

//
document.addEventListener("init", DOMContentLoadedEvent, false)
function DOMContentLoadedEvent() {
    // check for p5-container after onsen UI dom change
    const containerElement = document.getElementById('p5-container')
    if (containerElement) {
        PFIVE = new P5(defineSketch({"viewNumber" : currentView, "blehandler":blehandler, "params" : params, "tone":Tone}), containerElement)
        if (currentView == 0) {
            calibrationGUI.toggle(true)
        }
    }
}
// sound
function RunToneConext() {
    if (Tone.context.state !== 'running') {
        Tone.context.resume()
        console.log("start sound")
    }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////// UI /////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// main application Onsen Segment

export function splash(time) {
    let t = time
    setTimeout(function () {
        document
            .getElementById('splashscreen')
            .hide()
     }, t)
}

document.addEventListener('postchange', function (event) {
    console.log('postchange event', event);
})

export function changeTab() {
    document.getElementById('tabbar').setActiveTab(1)
    console.log("change Tab")
}
export function hideAlertDialog() {
    document
        .getElementById('my-alert-dialog')
        .hide()
}
export function connectBLE() {
    setupBLE()
    hideAlertDialog()
}

export function pushPage(page, anim) {

    if (anim) {
        document.getElementById('myNavigator').pushPage(page.id, { data: { title: page.title }, animation: anim });
    } else {
        console.log(document.getElementById('myNavigator').pushPage(page.id, { data: { title: page.title } }));
    }
    currentView = page.view;
    console.log("set view" + page.title)
    console.log("set view" + page.view)
}
export function backButton() {
    document.querySelector('#myNavigator').popPage()
    calibrationGUI.toggle(false)
    defineSketch({"remove" : true})
}
export function changeButton() {
    document.getElementById('segment').setActiveButton(1)
}


export function createBLEDialog() {
    var dialog = document.getElementById('my-alert-dialog')

    if (dialog) {
        dialog.show();
    } else {
        ons.createElement('ble-alert-dialog.html', { append: true })
            .then(function(dialog) {
                dialog.show()
            })
    }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////// BLE /////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

let setupBLE = function() {
    //   - "Android"
    //   - "BlackBerry 10"
    //   - "browser"
    //   - "iOS"
    //   - "WinCE"
    //   - "Tizen"
    //   - "Mac OS X"
    let devicePlatform = cordova.platformId;
    console.log(devicePlatform);
    if (devicePlatform == "browser") {
        blehandler = new BLEhandler(params)
        blehandler.connectAndStartNotify()
    } else if (devicePlatform == "iOS") {

    } else if (devicePlatform == "Android") {

    }
}



/*
ble.scan([], 5, function(device) {
    console.log(JSON.stringify(device));
}, failure);
*/


//////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
let script   = document.createElement("script");
script.type  = "text/javascript";
script.src   = "js/game_01.js";
let element = document.getElementById("p5-container");
document.body.appendChild(script);

if(typeof(element) != 'undefined' && element != null){
    document.body.appendChild(script);
} else{
    alert('Element does not exist!');
}
*/