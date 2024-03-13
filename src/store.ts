import { createStore } from 'vuex'
import {ErrorToggleCodeEnum, DetectTheftEnum} from '../src/utils/constants';
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
  },
  mutations: {
    togglePowerMode (state, payload) {
      if (payload == null) {
        state.powerMode = !state.powerMode;
      } else {
        state.powerMode = payload;
      }
    },
    toggleHeadsetMode (state) {
        state.headsetMode = !state.headsetMode;
    },
    toggleLocationMode (state) {
        state.locationMode = !state.locationMode;
    },

    toggleLocationReady (state) {
        state.locationReady = !state.locationReady;
    },
    toggleHeadsetReady (state) {
        state.headsetReady = !state.headsetReady;
    },
    togglePowerReady (state) {
        state.powerReady = !state.powerReady;
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

  },
  actions: {
    togglePowerMode (context, payload) {
      if(this.state.powerMode || this.state.powerReady) {
        context.commit('togglePowerMode', payload)
      } else {
        context.commit('setErrorToggleCode', ErrorToggleCodeEnum.PowerErr);
      }
    },
    toggleHeadsetMode (context) {
        if(this.state.headsetMode || this.state.headsetReady) {
            context.commit('toggleHeadsetMode')
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

    togglePowerReady (context) {
      context.commit('togglePowerReady')
    },
    toggleHeadsetReady (context) {
        console.log("toggleHeadsetReady ne");
        context.commit('toggleHeadsetReady')
    },
    toggleLocationReady (context) {
        context.commit('toggleLocationReady')
    }
  }
})

export default store;