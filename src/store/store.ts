import { createStore } from 'vuex'
import {ErrorToggleCodeEnum, DetectTheftEnum} from '../utils/constants';
import {IInfoModal, ISnackbar} from '../utils/interface_type';
const store = createStore({
  state: {
    powerMode: false,
    headsetMode: false,
    locationMode: false,

    powerReady: false,
    headsetReady: false,
    locationReady: false,

    errorToggleCode: ErrorToggleCodeEnum.None,
    detectTheft: DetectTheftEnum.None,
    visibleConfirmPasswordModal: false,
    snackbar: null as ISnackbar | null,
    infoModal: null as IInfoModal | null,
    changePasswordModal: false,
    historyModal: false,
    audioModal: false,
    audioList: ['', ''] as Array<string>,
    currentAudio: '',
  },
  getters: {
    getPowerMode (state): boolean {
      return state.powerMode;
    },
    getHeadsetMode (state): boolean {
        return state.headsetMode;
    },
    getLocationMode (state): boolean {
        return state.locationMode;
    },

    getPowerReady (state): boolean {
        return state.powerReady;
    },
    getHeadsetReady (state): boolean {
        return state.headsetReady;
    },
    getLocationReady (state): boolean {
        return state.locationReady;
    },
    getErrorToggleCode (state): number {
        return state.errorToggleCode;
    },
    getDetectTheft (state): DetectTheftEnum {
      return state.detectTheft;
    },
    getVisibleConfirmPasswordModal (state): boolean {
      return state.visibleConfirmPasswordModal;
    },
    getSnackbar (state) {
      return state.snackbar;
    },
    getInfoModal (state) {
      return state.infoModal;
    },
    getChangePasswordModal(state) {
      return state.changePasswordModal;
    },
    getHistoryModal(state) {
      return state.historyModal;
    },
    getAudioModal(state) {
      return state.audioModal;
    },
    getAudioList(state) {
      return state.audioList;
    },
    getCurrentAudio(state) {
      return state.currentAudio;
    },
  },
  mutations: {
    togglePowerMode (state, payload) {
      if (payload == null) {
        state.powerMode = !state.powerMode;
      } else {
        state.powerMode = payload;
      }
    },
    toggleHeadsetMode (state, payload) {
      if (payload == null) {
        state.headsetMode = !state.headsetMode;
      } else {
        state.headsetMode = payload;
      }
    },
    toggleLocationMode (state) {
        state.locationMode = !state.locationMode;
    },

    toggleLocationReady (state) {
        state.locationReady = !state.locationReady;
    },
    setHeadsetReady (state, payload: boolean) {
        state.headsetReady = payload;
    },
    setErrorToggleCode(state, payload: ErrorToggleCodeEnum) {
      state.errorToggleCode = payload;
    },
    setPowerReady(state, payload: boolean) {
      state.powerReady = payload;
    },
    setDetectTheft(state, payload: DetectTheftEnum) {
      state.detectTheft = payload;
    },
    setVisibleConfirmPasswordModal(state, payload: boolean) {
      state.visibleConfirmPasswordModal = payload;
    },
    setSnackbar(state, payload) {
      state.snackbar = payload;
    },
    setInfoModal (state, payload) {
      state.infoModal = payload;
    },
    setChangePasswordModal (state, payload) {
      state.changePasswordModal = payload;
    },
    setHistoryModal (state, payload) {
      state.historyModal = payload;
    },
    setAudioModal (state, payload) {
      state.audioModal = payload;
    },
    setAudioList (state, payload: Array<string>) {
      if (!payload.find((x) => x === state.currentAudio)) {
        console.log("set Defaut");
        state.currentAudio = 'siren.mp3';
      }
      state.audioList = payload;
    },
    setCurrentAudio (state, payload) {
      state.currentAudio = payload;
    },
  },
  actions: {
    togglePowerMode (context, payload) {
      if(this.state.powerMode || this.state.powerReady) {
        context.commit('togglePowerMode', payload)
      } else {
        context.commit('setErrorToggleCode', ErrorToggleCodeEnum.PowerErr);
      }
    },
    toggleHeadsetMode (context, payload) {
        if(this.state.headsetMode || this.state.headsetReady) {
            context.commit('toggleHeadsetMode', payload)
        } else {
            context.commit('setErrorToggleCode', ErrorToggleCodeEnum.HeadsetErr);
        }
    },
    toggleLocationMode (context) {
        if(this.state.locationMode || this.state.locationReady) {
            context.commit('toggleLocationMode')
        } else {
          context.commit('setErrorToggleCode', ErrorToggleCodeEnum.LocationErr);
        }
    },

    resetToggleCode (context) {
      context.commit('setErrorToggleCode', ErrorToggleCodeEnum.None);
    },
    setPowerReady (context, payload: boolean) {
      context.commit('setPowerReady', payload);
    },
    setDetectTheft (context, payload: DetectTheftEnum) {
      context.commit('setDetectTheft', payload);
    },
    setVisibleConfirmPasswordModal (context, payload: boolean) {
      context.commit('setVisibleConfirmPasswordModal', payload);
    },

    setHeadsetReady (context, payload: boolean) {
        context.commit('setHeadsetReady', payload)
    },
    toggleLocationReady (context) {
        context.commit('toggleLocationReady')
    },
    setSnackbar (context, payload) {
      console.log("setSnackbar coomit");
        context.commit('setSnackbar', payload)
    },
    setInfoModal (context, payload) {
      context.commit('setInfoModal', payload)
    },
    setChangePasswordModal (context, payload) {
      console.log("setChangePasswordModal", payload);
      context.commit('setChangePasswordModal', payload)
    },
    setHistoryModal (context, payload) {
      context.commit('setHistoryModal', payload)
    },
    setAudioModal(context, payload) {
      context.commit('setAudioModal', payload)
    },
    setAudioList(context, payload) {
      context.commit('setAudioList', payload)
    },
    setCurrentAudio(context, payload) {
      context.commit('setCurrentAudio', payload)
    },
    
  }
})

export default store;