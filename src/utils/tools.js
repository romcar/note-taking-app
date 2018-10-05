import { remote, ipcRenderer } from 'electron';

const mainProcess = remote.require('./background');

/**
 *
 * @param {*} view
 */
const createWindow = (view) => {
  if (typeof view !== 'string') throw new Error("View must be a string");
  return mainProcess.createWindow(view); // returns BrowserWindow
};

/**
 *
 * @param {*} view
 */
const openFile = (createNewWindow, view) => {
  console.log(createNewWindow, view)
  let currentWindow = remote.currentWindow;

  if (createNewWindow) {
    currentWindow = createWindow(view);
  }
  console.log(currentWindow)
  // ipcRenderer.send('open-file', currentWindow)
  setTimeout(() => { ipcRenderer.send('open-file', currentWindow) }, 1000);
};

const readFile = (filePath) => {
  ipcRenderer.send('load-file', filePath, remote.currentWindow);
};


module.exports = {
  createWindow,
  openFile,
  readFile,
};