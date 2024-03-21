import store from "../store/store"

window.ipcRenderer.on('main-process-message', (_event, ...args) => {
  // console.log('[Receive Main-process message]:', ...args)
})

window.ipcRenderer.on('on-ac', (_event, ...args) => {
  // console.log('[Receive on-ac]:', ...args)
  store.commit("setPowerReady", ...args)
})

window.ipcRenderer.on('open-change-password-popup', (_event, ...args) => {
  // console.log('[Receive open-change-password-popup]:', ...args)
  store.dispatch('setChangePasswordModal', true)

  // store.dispatch('setChangePasswordModal', false);
  // setTimeout(() => {
  //   store.dispatch('setChangePasswordModal', true)
  // })
})
window.ipcRenderer.on('open-audio-popup', (_event, ...args) => {
  store.dispatch('setAudioModal', true);
})
window.ipcRenderer.on('open-history-popup', (_event, ...args) => {
  store.dispatch('setHistoryModal', true);
})
window.ipcRenderer.on('open-learn-alarm-popup', (_event, ...args) => {
  store.dispatch('setLearnAlarmModal', true);
})

window.ipcRenderer.on('audio-list', (_event, ...args) => {
  store.dispatch('setAudioList', ...args);
})
window.ipcRenderer.on('audio-volume', (_event, ...args) => {
  store.dispatch('setAudioVolume', ...args);
})
window.ipcRenderer.on('open-about-us', (_event, ...args) => {
  store.dispatch('setAboutUsModal', true);
})
window.ipcRenderer.on('app-version', (_event, ...args) => {
  store.dispatch('setAppVersion', ...args);
})


// window.ipcRenderer.on('default-audio', (_event, ...args) => {
//   console.log('Receive audio on',...args)
//   store.dispatch('setCurrentAudio', ...args);
// })


function file2Buffer (file: File) {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader()
    const readFile = function() {
      const buffer = reader.result
      resolve(buffer)
    }

    reader.addEventListener('load', readFile)
    reader.readAsArrayBuffer(file)
  })
}

export async function addFile(file: File, fileName: string) {
  let fileBuffer = await file2Buffer(file);
  return window.ipcRenderer.invoke("add-audio-file", {
    'buffer': fileBuffer,
    'fileName': fileName
  }).then((value: any) => {
    return value;
  })
}

export async function setAudioVolume(val: number) {
  return window.ipcRenderer.invoke("set-audio-volume", val).then((value: any) => {
    return value;
  })
}

export async function setLidDoNothing() {
  return window.ipcRenderer.invoke("set-lid-do-nothing").then((value: any) => {
    return value;
  })
}

