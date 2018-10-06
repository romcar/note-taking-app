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
const openFile = () => {
  ipcRenderer.send('open-file', remote.currentWindow)
};

const readFile = (event, filePath) => {
  ipcRenderer.send('load-file', filePath);
};


module.exports = {
  createWindow,
  openFile,
  readFile,
};