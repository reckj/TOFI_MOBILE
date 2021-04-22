## A Cordova based enviroment for Android and IOS apps for TOFI trainer 

Built Using onsen UI framework and P5js


## How to install on osx

* Run `sudo npm install -g cordova`
* Run `cordova platform add browser`
* Run `cordova plugin add cordova-plugin-browsersync-gen2`

setup ssl proxy for testing BLE in browser
* Run `npm install -g local-ssl-proxy`


## How to test

* Run `cordova run browser --live-reload`

In seperate termal window:
* Run `local-ssl-proxy --source 9000 --target 8080`

Open at https://localhost:9000/

## Production

* Run `cordova build`

## Emulation 

* Run `cordova emulate android`
* Run `cordova emulate IOS`

##  TODO

integrate with https://github.com/apache/cordova-js
integrate with https://github.com/don/cordova-plugin-ble-central
integrate with https://www.npmjs.com/package/cordova-plugin-webpack

replace onclick events

Switch to monaca for development workflow 
https://monaca.io/

