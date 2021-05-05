import P5 from 'p5'
import defineSketch from './Canvas.js'
import BLEhandler from './BLEhandler.js'
import BLEParameters from './BLEParameters'
import BleSimulator from './BleSimulator'
import CalibrationGUI from './CalibrationGUI'
import * as Tone from 'tone'

let blehandler
let currentView = 0
let calibrationGUI
let params =
// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false)


function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version)
    // add gui
    createBLEDialog()
    params = new BLEParameters(6) // myBLE.id // handles storage for paremeters for interpreting sensor values
    blehandler = new BleSimulator()
    calibrationGUI = new CalibrationGUI(params)
    calibrationGUI.toggle(false)
    console.log('handling sounds')
    //document.addEventListener("mouseClick", RunToneConext, false);
    document.addEventListener("click", RunToneConext, false);
    // document.addEventListener("touchstart", RunToneConext, false);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////// Game /////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

//
document.addEventListener("init", DOMContentLoadedEvent, false)

function DOMContentLoadedEvent() {
    // check for p5-container after onsen UI dom change
    const containerElement = document.getElementById('p5-container')
    if (containerElement) {
        let PFIVE = new P5(defineSketch(currentView, blehandler, params, Tone), containerElement)
    }
    // GUI
}

// sound
function RunToneConext() {
    if (Tone.context.state !== 'running') {
        Tone.context.resume()
        console.log("start sound")

        const envelope = new Tone.AmplitudeEnvelope({
            attack: 0.11,
            decay: 0.21,
            sustain: 0.5,
            release: 1.2
        }).toDestination()

        const oscillator = new Tone.Oscillator({
            partials: [3, 2, 1],
            type: "custom",
            frequency: "C#4",
            volume: -8,
        }).connect(envelope).start();
        envelope.triggerAttack()
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////// UI /////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// main application Onsen Segment
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
    document.getElementById('my-alert-dialog').hide()
}

export function pushPage(page, anim) {

    if (anim) {
        document.getElementById('myNavigator').pushPage(page.id, { data: { title: page.title }, animation: anim });
    } else {
        console.log(document.getElementById('myNavigator').pushPage(page.id, { data: { title: page.title } }));
    }
    currentView = page.view;
    if (currentView == 0) {
        calibrationGUI.toggle(true)
    } else {
        calibrationGUI.toggle(false)
    }
    console.log("set view" + page.title)
    console.log("set view" + page.view)
}
export function backButton() {
    document.querySelector('#myNavigator').popPage()
}
export function changeButton() {
    document.getElementById('segment').setActiveButton(1)
}


let createBLEDialog = function() {
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
        blehandler = new BLEhandler()
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