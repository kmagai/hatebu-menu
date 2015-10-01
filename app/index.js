import Menubar from 'menubar'
import Server from 'electron-rpc/server'
import Path from 'path'
import Shell from 'shell'
import _ from 'lodash'
import BrowserWindow from 'browser-window'
import Config from './model/config'

// Should config be global variable?
var config = new Config(path.join(app.getPath('userConfig'), 'config.json'));
const app_config = config.load();

const opts = {
  dir: __dirname,
  icon: Path.join(__dirname, 'images', 'icon.png'),
  preloadWindow: true
}

var menu = Menubar(opts)
var server = new Server()

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

menu.on('ready', function() {
  menu.tray.setToolTip('Amery')
  
  server.on('terminate', function (e) {
    server.destroy()
    menu.app.terminate()
  })
  
  server.on('open-url', function (req) {
    var url = _.trim(req.body.url, '#')
    Shell.openExternal(url)
  })
  
  var weatherManager = new WeatherManager()
  server.on('update-weather', function (req, next) {
    weatherManager.fetch(app_config.cities, function (err, weathers) {
      if (err) {
        // TODO: need logger
        console.log(`weather-manager-fetch-error: ${err.message}`)
        return next(err, null)
      }
    })
    next(null, weathers)
  })
  
});