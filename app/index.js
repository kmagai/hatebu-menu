import Menubar from 'menubar'
var app = require('app');  // Module to control application life.
// var BrowserWindow = require('browser-window');  // Module to create native browser window.
// import BrowserWindow from 'browser-window'
import Config from './model/config'

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

const opts = {
  dir: __dirname,
  // icon: Path.join(__dirname, 'images', 'icon.png'),
  preloadWindow: true
}

var menu = Menubar(opts)
// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // if (process.platform != 'darwin')
    app.quit();
});

var mainWindow = null;

menu.on('ready', function() {
  menu.tray.setToolTip('hatebu-menu')
  
  // server.on('terminate', function (e) {
  //   server.destroy()
  //   menu.app.terminate()
  // })
  
  // server.on('open-url', function (req) {
  //   var url = _.trim(req.body.url, '#')
  //   Shell.openExternal(url)
  // })
  // 
  // server.on('update-weather', function (req, next) {
  //   weatherManager.fetch(app_config.cities, function (err, weathers) {
  //     if (err) {
  //       // TODO: need logger
  //       console.log(`weather-manager-fetch-error: ${err.message}`)
  //       return next(err, null)
  //     }
  //   })
  //   next(null, weathers)
  // })
  
});

