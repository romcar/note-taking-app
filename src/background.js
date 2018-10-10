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

/**
 * Creates a window of type view, the view gets added to the url we load. From
 * there inside of the ViewManager component we then make use of this variable as
 * a search query.
 *
 * @param {string} view type of component you want displayed.
 */
const createWindow = exports.createWindow = (view) => {
  // Create the browser window.
  let mainWindow = new BrowserWindow({
    width: 600,
    height: 800,
    show: false,
    // frame: false
  })

  allWindows.add(mainWindow);
  // and load the index.html of the app.
  let indexPath;

  if (dev && process.argv.indexOf('--noDevServer') === -1) {
    indexPath = `http://localhost:8081`
  } else {
    indexPath = `file://${path.join(__dirname, `index.html?`)}`
  }

  mainWindow.loadURL(indexPath);

  // Don't show until we are ready and loaded
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()

    // Open the DevTools automatically if developing
    if (dev) {
      mainWindow.webContents.openDevTools({ detach: true })
    }
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    allWindows.delete(mainWindow);
    mainWindow = null
  })
}

/**
 * Uses the native showOpenDialog to ask the user for a file.@abstract
 *
 * @param {BrowserWindow} triggeringWindow The window that invoked the function.
 * @returns {string} String with selected file path
 */
const getUserSelectedFilePath = exports.getUserSelectedFilePath = (triggeringWindow) => {
  const files = dialog.showOpenDialog(triggeringWindow, {
    properties: ['openFile'],
    filters: [
      { name: "All Files", extensions: ["*"] },
      { name: "Markdown", extensions: ['md', 'markdown'] },
      { name: "Text", extensions: ['txt', 'text'] },
    ]
  });

  if (!files) return;

  const file = files[0];
  triggeringWindow.sender.send('open-file-reply', file);
};
/**
 * TODO Fill this in
 * @param {event} event
 * @param {string} filePath
 */
const getFileContents = exports.getFileContents = (event, filePath) => {
  let content = fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      dialog.showMessageBox({
        type: "error",
        title: "Something happened",
        message: `Something went wrong and this is what we found: ${err}`
      });
    }
    event.sender.send('load-file-reply', data);
  })
}

const saveFileChanges = (event, note) => {
  console.log(arguments[2])
  let tempNote = note;
  let filePath = tempNote.note.filePath;
  let fileLocation = null;
  /* NOTE if the path is set to the default then save it in the local documents director under a new directory named notes. */
  if (filePath.substr(1) === 'notes') {
    filePath = app.getPath('documents') + filePath + '/';

    if (tempNote.meta.fileName === 'note') {
      fileLocation = filePath + tempNote.meta.fileName + `-${tempNote.meta.count}${tempNote.meta.extension}`;
      tempNote.meta.fileName = tempNote.meta.fileName + `-${tempNote.meta.count}`;
    } else {
      fileLocation = filePath + tempNote.meta.fileName + tempNote.meta.extension;
    }
  }

  /* If the file already exists */
  if (fs.existsSync(fileLocation)) {
    console.log('found the file');
    /* TODO Write file */
    fs.writeFile(fileLocation, tempNote.note.content, (err) => {
      if (err) console.log(err);
      console.log(`File written: ${fileLocation}`);
      /* ANCHOR update-note */
      console.log('BEFORE SENDING OVER IPC', tempNote);
      console.log(tempNote.meta.fileName)
      event.sender.send('save-file-reply', tempNote, false);
    });
  } else {
    console.log(`Did not find file: ${fileLocation}`);
    /* if the file does NOT exist */
    fs.mkdir(filePath, (err) => {
      if (err.code === "EEXIST") {
        console.log(`Directory already exists: ${filePath}`);
      } else {
        /* TODO Error log this error if any */
        dialog.showMessageBox({
          type: 'error',
          title: 'Oops, something went wrong!',
          message: `
          Oops something happened.
          ${err.code}

          ${err}`,
          buttons: [
            'Ok'
          ],
          defaultId: 0
        })
      }
      fs.writeFile(fileLocation, tempNote.note.content, (err) => {
        if (err) {
          dialog.showMessageBox({
            type: 'error',
            title: 'Oops, something went wrong!',
            message: `
            Oops something happened.
            ${err.code}

            ${err}`,
            buttons: [
              'Ok'
            ],
            defaultId: 0
          })
        }
        console.log(`File written: ${fileLocation}`);
        /* ANCHOR update-note update-counter */
        event.sender.send('save-file-reply', tempNote, true);
      });
    });
  }
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
  if (mainWindow === null) {
    createWindow()
  }
})


/*===============================================================================*/
ipcMain.on('load-file', getFileContents);
ipcMain.on('open-file', getUserSelectedFilePath);
ipcMain.on('save-file', saveFileChanges);
/*===============================================================================*/
