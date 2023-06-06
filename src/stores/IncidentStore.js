import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useIncidentStore = defineStore('incidentData', {
  state: () => ({
    ALL_DATA: {},
    SELECTED_DATA: [],
    selectedCity: '',
    selectedLocation: '',
    selectedReason: '',
    selectedCondition: '',
    selectedType: ''
  }),
  getters: {
    getData(state) {
      return state.ALL_DATA
    },
    getCity(state) {
      return state.selectedCity
    },
    getSelectedData(state) {
      return state.SELECTED_DATA
    }
  },
  actions: {
    setData(data) {
      this.ALL_DATA = data
    },
    setSelectedData(selData) {
      this.SELECTED_DATA = selData
    },
    setCity(city) {
      this.selectedCity = city
      console.log('setCity', city, this.selectedCity)
    },
    setLocation(location) {
      this.selectedLocation = location
    },
    setReason(reason) {
      this.selectedReason = reason
    },
    setCondition(condition) {
      this.selectedCondition = condition
    },
    setType(type) {
      this.selectedType = type
    },
    setPin(lat, lon) {
      this.selectedPins.push({ lat, lon })
    }
  }
})
