## A Cordova based enviroment for Android and IOS apps for TOFI trainer 

Built Using onsen UI framework and P5js


## How to install on osx

* Run `sudo npm install -g cordova`
* Run `cordova platform add browser`
* Run `cordova plugin add cordova-plugin-browsersync-gen2`
* Run `npm i cordova-plugin-webpack`

setup ssl proxy for testing BLE in browser
* Run `npm install -g local-ssl-proxy`

## How to test

* Run `cordova prepare -- --livereload`

In seperate termal window:

* Run `local-ssl-proxy --source 9000 --target 8080`

Open at https://localhost:9000/

## Production

* Run `cordova build`

## Updating github pages

* Run `cordova build browser`

## Emulation 

* Run `cordova emulate android`
* Run `cordova emulate IOS`

##  TODO

integrate with https://github.com/don/cordova-plugin-ble-central
integrate with https://www.npmjs.com/package/cordova-plugin-webpack

Modify status bar apearance on different platforms
https://cordova.apache.org/docs/en/10.x/reference/cordova-plugin-statusbar/

