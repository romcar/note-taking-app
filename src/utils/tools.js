import { remote, ipcRenderer } from 'electron';

const defaultPathForNotes = '../../Notes';
const mainProcess = remote.require('./background');

/**
 * TODO Fill this in
 *
 * @param {*} view
 */
const createWindow = (view) => {
  if (typeof view !== 'string') throw new Error("View must be a string");
  return mainProcess.createWindow(view); // returns BrowserWindow
};

/**
 * TODO Fill this in
 *
 * @param {*} view
 */
const openFile = () => {
  ipcRenderer.send('open-file', remote.currentWindow)
};

const readFile = (event, filePath) => {
  ipcRenderer.send('load-file', filePath);
};

const saveFile = (note, cb) => {
  // function updateCount(shouldUpdateCount, updatedNote) {
  //   if (shouldUpdateCount) {

  //   };

  //   cb(updatedNote);
  // };
  ipcRenderer.send('save-file', note);

}

module.exports = {
  createWindow,
  openFile,
  readFile,
  saveFile
};