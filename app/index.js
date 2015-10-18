import Menubar from 'menubar'
import Path from 'path';
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
  icon: Path.join(__dirname, 'static', 'images', 'icon.png'),
  preloadWindow: true
}

var menu = Menubar(opts)

menu.on('ready', function() {
  menu.tray.setToolTip('hatebu-menu')
});
