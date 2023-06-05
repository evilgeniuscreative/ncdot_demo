import { ref } from 'vue'

export const allData = ref({
  all_data: null,
  setDataValue(value) {
    this.all_data = value
  }
})

export const selectedCity = ref({
  selected_city: null,
  setCityValue(value) {
    this.selected_city = value
  }
})

export const selectedLocation = ref({
  selected_location: null,
  setLocationValue(value) {
    this.selected_location = value
  }
})

export const selectedReason = ref({
  selected_reason: null,
  setReasonValue(value) {
    this.selected_reason = value
  }
})

export const selectedCondition = ref({
  selected_condition: null,
  setConditionValue(value) {
    this.selected_condition = value
  }
})

export const selectedType = ref({
  selected_type: null,
  setTypeValue(value) {
    this.selected_type = value
  }
})
