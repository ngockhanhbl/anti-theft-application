import store from "../store"

window.ipcRenderer.on('main-process-message', (_event, ...args) => {
  console.log('[Receive Main-process message]:', ...args)
})

window.ipcRenderer.on('on-ac', (_event, ...args) => {
  console.log('[Receive on-ac]:', ...args)
})



setTimeout(() => {
  console.log(store);
  store.commit("togglePowerMode")
  store.state.powerMode;
}, 5000)