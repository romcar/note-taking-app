import { remote, ipcRenderer } from 'electron';
import { removeStopWordsAndPunctuation } from './removeStopWordsAndPunctuation';

const mainProcess = remote.require('./background');

console.log(Promise);

const removeUnimportantCharactersAndSymbols = (string) => {
  // console.log(string);
  return new Promise(function (resolve, reject) {
    resolve(removeStopWordsAndPunctuation(string));
  });
};

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
  return removeUnimportantCharactersAndSymbols(note.note.content)
    .then((tagArr) => {
      note.meta.tags = tagArr;
      ipcRenderer.send('save-file', note);
    })
    .catch(err => console.error(err));
}

const countWords = (content) => {
  return content.length > 0 ? content.match(/\b\w+\b/gim).length : 0;
}

module.exports = {
  createWindow,
  countWords,
  openFile,
  readFile,
  saveFile,
};