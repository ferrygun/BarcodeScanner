cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-firebase.FirebasePlugin",
    "file": "plugins/cordova-plugin-firebase/www/firebase.js",
    "pluginId": "cordova-plugin-firebase",
    "clobbers": [
      "FirebasePlugin"
    ]
  },
  {
    "id": "cordova-plugin-ml-text.gettext",
    "file": "plugins/cordova-plugin-ml-text/www/gettext.js",
    "pluginId": "cordova-plugin-ml-text",
    "clobbers": [
      "mltext"
    ]
  },
  {
    "id": "cordova-plugin-camera-preview.CameraPreview",
    "file": "plugins/cordova-plugin-camera-preview/www/CameraPreview.js",
    "pluginId": "cordova-plugin-camera-preview",
    "clobbers": [
      "CameraPreview"
    ]
  },
  {
    "id": "cordova-plugin-statusbar.statusbar",
    "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
    "pluginId": "cordova-plugin-statusbar",
    "clobbers": [
      "window.StatusBar"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.3",
  "cordova-plugin-firebase": "2.0.5",
  "cordova-plugin-ml-text": "1.0.1",
  "cordova-plugin-camera-preview": "0.10.0",
  "cordova-android-support-gradle-release": "2.0.1",
  "cordova-plugin-statusbar": "2.4.2"
};
// BOTTOM OF METADATA
});