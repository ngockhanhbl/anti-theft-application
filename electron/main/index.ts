import { app, BrowserWindow, shell, ipcMain, powerMonitor, Menu, Tray } from 'electron'
import { release } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { watch, readdirSync, writeFileSync, writeFile } from 'node:fs'

import { exec } from 'node:child_process'

// import {menu} from './menu';
import * as loud from 'loudness';

// import * as koffi from 'koffi';


globalThis.__filename = fileURLToPath(import.meta.url)
globalThis.__dirname = dirname(__filename)



// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.mjs    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.mjs')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')

async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    width: 1000,
    height: 750,
    icon: join(__dirname, '../../public/logo.ico'),
    //icon: join(process.env.VITE_PUBLIC, ''),
    // resizable: false,
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      nodeIntegration: true,

      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      // contextIsolation: false,
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) { // electron-vite-vue#298
    win.loadURL(url)
    // Open devTool if the app is not packaged
    win.webContents.openDevTools()
  } else {
    // win.webContents.openDevTools()
    win.loadFile(indexHtml)
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
    win?.webContents.send('on-ac', !powerMonitor.isOnBatteryPower())
    win?.webContents.send('app-version', app.getVersion())
    handleSendAudioFiles(getAudioFiles(), true);
    sendAudioVolume()
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
  // win.webContents.on('will-navigate', (event, url) => { }) #344
}


function setLidOnACDoNothing() {
  return new Promise(function (resolve, reject) {
    exec("powercfg /setacvalueindex scheme_current sub_buttons lidaction 0", (error, stdout, stderr) => {
      if (error || stderr) {
        resolve(false)
      } else {
        resolve(true);
      }
    });
  })
}
function setLidOnDCDoNothing() {
  return new Promise(function (resolve, reject) {
    exec("powercfg /setdcvalueindex scheme_current sub_buttons lidaction 0", (error, stdout, stderr) => {
      if (error || stderr) {
        resolve(false)
      } else {
        resolve(true);
      }
    });
  })
}

async function setlidDoNothing() {
  if (!isMac) {
    let ac = await setLidOnACDoNothing();
    let dc = await setLidOnDCDoNothing();
    return ac && dc;
  } else {
    return false;
  }
}



function getLoudnessInstance() {
  if (loud.default) {
    return loud.default;
  } else {
    return loud;
  }
}

async function sendAudioVolume() {
  let val = await getAudioVolume();
  win?.webContents.send('audio-volume', val)
}

function getAudioDir() {
  return join(__dirname, '../../public/audio');
}

async function getAudioVolume() {
  let val = await getLoudnessInstance().getVolume();
  return val;
}

async function setAudioVolume(value) {
  await getLoudnessInstance().setVolume(value);
}

var audioFiles = []

function getAudioFiles(): string[] {
  return readdirSync(getAudioDir());
}

watch(getAudioDir(), (eventType, filename) => {
  audioFiles = getAudioFiles();
  handleSendAudioFiles(audioFiles)
})

 function handleSendAudioFiles(list: string[], sendDefault = false) {
  if (sendDefault) {
    // win?.webContents.send('default-audio', list.find((x) => x === 'siren.mp3') ?? list[0])
  }
  win?.webContents.send('audio-list', list);
}



const isMac = process.platform === 'darwin'
const template = [
    // { role: 'appMenu' }
    ...(isMac
      ? [{
          label: app.name,
          submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideOthers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
          ]
        }]
      : []),
    // { role: 'fileMenu' }
    {
      label: 'File',
      submenu: [
        isMac ? { role: 'close' } : { role: 'quit' }
      ]
    },
    
    // { role: 'viewMenu' }
    {
      label: 'View',
      submenu: [
        // { role: 'reload' },
        // { role: 'forceReload' },
        // { role: 'toggleDevTools' },
        // { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    // { role: 'windowMenu' }
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        ...(isMac
          ? [
              { type: 'separator' },
              { role: 'front' },
              { type: 'separator' },
              { role: 'window' }
            ]
          : [
              { role: 'close' }
            ])
      ]
    },
    // { role: 'editMenu' }
    {
      label: 'Settings',
      submenu: [
        {
          label: 'Change Password',
          click: async () => {
            win?.webContents.send('open-change-password-popup');
          }
        },
        {
          label: 'Change Audio',
          click: async () => {
            win?.webContents.send('open-audio-popup');
          }
        },
        { type: 'separator' },
        {
          // label: 'How to play an alarm sound when the Laptop is in sleep mode',
          label: 'Alarm sound in sleep mode',
          click: async () => {
            win?.webContents.send('open-learn-alarm-popup', isMac ? 'mac' : 'windows');
          }
        }
      ]
    },
    {
      role: 'help',
      submenu: [
        // {
        //   label: 'Visit Site',
        //   click: async () => {
        //     const { shell } = require('electron')
        //     await shell.openExternal('https://ryantechlabs.com/products/anti-theft')
        //   }
        // },
        {
          label: 'About Us',
          click: async () => {
            win?.webContents.send('open-about-us');
          }
        },
        {
          label: 'History',
          click: async () => {
            win?.webContents.send('open-history-popup', isMac ? 'mac' : 'windows');
          }
        },
        
      ]
    }
  ] as Electron.MenuItemConstructorOptions[];

const menu = Menu.buildFromTemplate(template)

Menu.setApplicationMenu(menu);

app.on('ready', () => {
  createWindow()

  // powerMonitor.on('suspend', () => {
  //   // console.log('The system is going to sleep')
  // })
  // powerMonitor.on('resume', () => { 
  //   // console.log('The system is resuming'); 
  // }); 

  powerMonitor.on('on-ac', () => { 
      // console.log('The system is on AC Power (charging)'); 
      win?.webContents.send('on-ac', true)
  }); 
  
  powerMonitor.on('on-battery', () => { 
      // console.log('The system is on Battery Power');
      win?.webContents.send('on-ac', false)
  }); 
    
  // powerMonitor.on('shutdown', () => { 
  //     // console.log('The system is Shutting Down'); 
  // }); 
    
  // powerMonitor.on('lock-screen', () => { 
  //     // console.log('The system is about to be locked'); 
  // }); 
    
  // powerMonitor.on('unlock-screen', () => { 
  //     // console.log('The system is unlocked'); 
  // });


})

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

ipcMain.handle('add-audio-file', (_, arg) => {
  let buffer = arg.buffer;
  let fileName = arg.fileName
  if (!(buffer instanceof ArrayBuffer)) return false;

  return new Promise(function (resolve, reject) {
    return writeFile(join(getAudioDir(), `${fileName}`), Buffer.from(buffer), err => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  })
})

ipcMain.handle('set-audio-volume', (_, arg) => {
  return new Promise(function (resolve, reject) {
    try {
      resolve(setAudioVolume(arg));
    } catch (e) {
      resolve(false);
    }
  })
})

ipcMain.handle('set-lid-do-nothing', (_, arg) => {
  return setlidDoNothing();
})


// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}#${arg}`)
  } else {
    childWindow.loadFile(indexHtml, { hash: arg })
  }
})
