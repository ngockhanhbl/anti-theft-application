import store from "../store/store"

window.ipcRenderer.on('main-process-message', (_event, ...args) => {
  console.log('[Receive Main-process message]:', ...args)
})

window.ipcRenderer.on('on-ac', (_event, ...args) => {
  console.log('[Receive on-ac]:', ...args)
  store.commit("setPowerReady", ...args)
})

window.ipcRenderer.on('open-change-password-popup', (_event, ...args) => {
  console.log('[Receive open-change-password-popup]:', ...args)
})
window.ipcRenderer.on('open-audio-popup', (_event, ...args) => {
  console.log('[Receive open-change-password-popup]:', ...args)
})

window.ipcRenderer.on('open-learn-alarm-popup', (_event, ...args) => {
  console.log('[Receive open-learn-alarm-popup]:', ...args)
})


setTimeout(() => {
  // console.log(store);
  // store.commit("togglePowerMode")
  store.state.powerMode;
}, 5000)