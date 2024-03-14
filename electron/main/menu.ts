// import { app, Menu } from 'electron';

// const isMac = process.platform === 'darwin'

// const template = [
//     // { role: 'appMenu' }
//     ...(isMac
//       ? [{
//           label: app.name,
//           submenu: [
//             { role: 'about' },
//             { type: 'separator' },
//             { role: 'services' },
//             { type: 'separator' },
//             { role: 'hide' },
//             { role: 'hideOthers' },
//             { role: 'unhide' },
//             { type: 'separator' },
//             { role: 'quit' }
//           ]
//         }]
//       : []),
//     // { role: 'fileMenu' }
//     {
//       label: 'File',
//       submenu: [
//         isMac ? { role: 'close' } : { role: 'quit' }
//       ]
//     },
    
//     // { role: 'viewMenu' }
//     {
//       label: 'View',
//       submenu: [
//         { role: 'reload' },
//         { role: 'forceReload' },
//         { role: 'toggleDevTools' },
//         { type: 'separator' },
//         { role: 'resetZoom' },
//         { role: 'zoomIn' },
//         { role: 'zoomOut' },
//         { type: 'separator' },
//         { role: 'togglefullscreen' }
//       ]
//     },
//     // { role: 'windowMenu' }
//     {
//       label: 'Window',
//       submenu: [
//         { role: 'minimize' },
//         { role: 'zoom' },
//         ...(isMac
//           ? [
//               { type: 'separator' },
//               { role: 'front' },
//               { type: 'separator' },
//               { role: 'window' }
//             ]
//           : [
//               { role: 'close' }
//             ])
//       ]
//     },
//     // { role: 'editMenu' }
//     {
//       label: 'Settings',
//       submenu: [
//         {
//           label: 'Change Password',
//           click: async () => {
//             const { shell } = require('electron')
//             await shell.openExternal('https://electronjs.org')
//           }
//         },
//         { role: 'undo' },
//         { role: 'redo' },
//         { type: 'separator' },
//         { role: 'cut' },
//         { role: 'copy' },
//         { role: 'paste' },
//         ...(isMac
//           ? [
//               { role: 'pasteAndMatchStyle' },
//               { role: 'delete' },
//               { role: 'selectAll' },
//               { type: 'separator' },
//               {
//                 label: 'Speech',
//                 submenu: [
//                   { role: 'startSpeaking' },
//                   { role: 'stopSpeaking' }
//                 ]
//               }
//             ]
//           : [
//               { role: 'delete' },
//               { type: 'separator' },
//               { role: 'selectAll' }
//             ])
//       ]
//     },
//     {
//       role: 'help',
//       submenu: [
//         {
//           label: 'Learn More',
//           click: async () => {
//             const { shell } = require('electron')
//             await shell.openExternal('https://electronjs.org')
//           }
//         }
//       ]
//     }
//   ] as Electron.MenuItemConstructorOptions[];

// const menu = Menu.buildFromTemplate(template)
// export { menu };
