cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-ble-central.ble",
      "file": "plugins/cordova-plugin-ble-central/www/ble.js",
      "pluginId": "cordova-plugin-ble-central",
      "clobbers": [
        "ble"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-ble-central": "1.3.1",
    "cordova-plugin-browsersync": "0.1.7",
    "cordova-plugin-webpack": "1.0.5"
  };
});