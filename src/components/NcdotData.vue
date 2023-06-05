<template>
  <form>
    <div class="form-group">
      <label for="i_city">City</label>
      <select v-model="city" class="form-control" id="i_city" @change="onchange('city')">
        <option v-for="y in dropdownData.cities" :value="y">
          {{ y }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="i_reason">Location</label>
      <select
        v-model="location"
        class="form-control"
        id="i_location"
        @change="onchange('location')"
      >
        <option v-for="l in dropdownData.locations" :value="l">{{ l }}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="i_reason">Reason</label>
      <select v-model="reason" class="form-control" id="i_reason" @change="onchange('reason')">
        <option v-for="r in dropdownData.reasons" :value="r">{{ r }}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="i_condition">Condition</label>
      <select
        v-model="condition"
        class="form-control"
        id="i_condition"
        @change="onchange('condition')"
      >
        <option v-for="c in dropdownData.conditions" :value="c">{{ c }}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="i_incident_type">Incident Type</label>
      <select
        v-model="incidentType"
        class="form-control"
        id="i_incident_type"
        @change="onchange('incident_type')"
      >
        <option v-for="itype in dropdownData.incidentTypes" :value="itype">
          {{ itype }}
        </option>
      </select>
    </div>

    <button @click="getData" type="button" class="btn btn-primary mt-5">Get Data</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import {
  allData,
  selectedCity,
  selectedLocation,
  selectedReason,
  selectedCondition,
  selectedType
} from '../js/data_changes.js'
export default {
  data() {
    return {
      city: null,
      location: null,
      reason: null,
      condition: null,
      incidentType: null,
      dropdownData: {
        cities: [],
        locations: [],
        reasons: [],
        conditions: [],
        incidentTypes: []
      }
    }
  },
  mounted() {
    this.fetchDropdownData()
  },
  methods: {
    onchange: function (x) {
      console.log(x, this[x])
    },
    fetchDropdownData() {
      const re =
        /\bIn|East of|West of|South of|North of|North West of|South West of|North East of|South East of|Near/gi
      fetch(`${import.meta.env.VITE_API_VERBOSE}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((data) => {
          // Create a new reactive object using Vue.set or spread operator
          this.dropdownData = {
            cities: new Set(data.map((el) => el.city.substring(0, 50)).sort()),
            locations: new Set(
              data.map((el) => el.location.trim().replace(re, '').substring(0, 50)).sort()
            ),
            reasons: new Set(data.map((el) => el.reason.trim().substring(0, 50)).sort()),
            conditions: new Set(data.map((el) => el.condition.trim().substring(0, 50)).sort()),
            incidentTypes: new Set(data.map((el) => el.incidentType.trim().substring(0, 50)).sort())
          }
          console.log('this.dropDownData', this.dropdownData)
        })
        .catch((error) => {
          // Handle error
          console.error('Error:', error)
        })
    },
    getData() {
      // Make use of the selected values: this.reason, this.condition, this.incidentType
      // Perform further operations or API calls based on the selected values
      console.log('selected_city', selectedCity.selected_city)
    }
  }
}
</script>
