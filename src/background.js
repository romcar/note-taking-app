'use strict'

// Import parts of electron to use
const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const path = require('path')
// const url = require('url')
const fs = require('fs');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let allWindows = new Set();

// Keep a reference for dev mode
let dev = false

if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath)) {
  dev = true
}

// Temporary fix broken high-dpi scale factor on Windows (125% scaling)
// info: https://github.com/electron/electron/issues/9691
if (process.platform === 'win32') {
  app.commandLine.appendSwitch('high-dpi-support', 'true')
  app.commandLine.appendSwitch('force-device-scale-factor', '1')
}

const createWindow = exports.createWindow = (view) => {
  // Create the browser window.
  let newWindow = new BrowserWindow({
    width: 400,
    height: 600,
    show: false,
    // frame: false
  })

  allWindows.add(newWindow);
  // and load the index.html of the app.
  let indexPath;

  if (dev && process.argv.indexOf('--noDevServer') === -1) {
    indexPath = `http://localhost:8081?${view}`
  } else {
    indexPath = `file://${path.join(__dirname, `index.html?${view}`)}`
  }

  newWindow.loadURL(indexPath)

  // Don't show until we are ready and loaded
  newWindow.once('ready-to-show', () => {
    newWindow.show()

    // Open the DevTools automatically if developing
    if (dev) {
      newWindow.webContents.openDevTools({ detach: true })
    }
  })

  // Emitted when the window is closed.
  newWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    allWindows.delete(newWindow);
    newWindow = null
  })
}

const getUserSelectedFilePath = () => {

}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow("Home");
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (newWindow === null) {
    createWindow()
  }
})
