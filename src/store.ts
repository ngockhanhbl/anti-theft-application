import { createStore } from 'vuex'

const store = createStore({
  state: {
    powerMode: false,
    headsetMode: false,
    locationMode: false,

    powerReady: false,
    headsetReady: false,
    locationReady: false,

    errorToggleCode: 0,
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
    }
  },
  mutations: {
    togglePowerMode (state) {
      state.powerMode = !state.powerMode;
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
    setErrorToggleCode(state, payload: number) {
      state.errorToggleCode = payload;
    }

  },
  actions: {
    togglePowerMode (context) {
      console.log("this.state.powerMode", this.state.powerMode);
      console.log("this.state.powerReady", this.state.powerReady);
      if(this.state.powerMode || this.state.powerReady) {
        context.commit('togglePowerMode')
      } else {
        context.commit('setErrorToggleCode', 1);
      }
    },
    toggleHeadsetMode (context) {
        if(this.state.headsetMode || this.state.headsetReady) {
            context.commit('toggleHeadsetMode')
        } else {
            context.commit('setErrorToggleCode', 2);
        }
    },
    toggleLocationMode (context) {
        if(this.state.locationMode || this.state.locationReady) {
            context.commit('toggleLocationMode')
        } else {
          context.commit('setErrorToggleCode', 3);
        }
    },
    resetToggleCode (context) {
      context.commit('setErrorToggleCode', 0);
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