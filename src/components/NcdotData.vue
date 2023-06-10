<!-- 
  Dropdown selects to determine parameters for incident search
  Value is set in state at incidentDataStore at /src/stores/incidentStore.js
  List of values are stored in, for example, citiesArray with other relevant
    information in the array of objects
-->
<template>
  <div class="title-text-wrap">
    <h1>NC Incident Locator</h1>
    <p>
      Select any combination of the three dropdowns and click the 'Get Data' button. Results are
      additive.
    </p>
    <p>
      The map will be repositioned to the first Marker and zoomed in, and all incidents that are
      current will be shown and labeled, with a hover text label with more information.
    </p>
    <p class="smaller">
      NOTE: This is currently a work in progress. Still TODO: (1) Responsive media queries or figure
      out why Boostrap is failing to work as expected dropdowns on mobile; opened a ticket and SO
      question. (2) Better formatted Map Pin hover content.
    </p>
  </div>
  <form>
    <div class="form-group">
      <label for="i_city">City</label>
      <select
        v-model="city"
        class="form-control"
        id="i_city"
        @change="this.incidentDataStore.setCity(city)"
      >
        <option v-for="y in dropdownData.cities" :value="y">
          {{ y }}
        </option>
      </select>
    </div>
    <!-- <div class="form-group">
      <label for="i_reason">Location</label>
      <select
        v-model="location"
        class="form-control"
        id="i_location"
        @change="this.incidentDataStore.setLocation(location)"
      >
        <option v-for="l in dropdownData.locations" :value="l">{{ l }}</option>
      </select>
    </div> -->
    <!-- <div class="form-group">
      <label for="i_reason">Reason</label>
      <select
        v-model="reason"
        class="form-control"
        id="i_reason"
        @change="this.incidentDataStore.setReason(reason)"
      >
        <option v-for="r in dropdownData.reasons" :value="r">{{ r }}</option>
      </select>
    </div> -->
    <div class="form-group">
      <label for="i_condition">Condition</label>
      <select
        v-model="condition"
        class="form-control"
        id="i_condition"
        @change="this.incidentDataStore.setCondition(condition)"
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
        @change="this.incidentDataStore.setType('incidentType')"
      >
        <option v-for="itype in dropdownData.incidentTypes" :value="itype">
          {{ itype }}
        </option>
      </select>
    </div>

    <button @click="getData" type="button" class="btn btn-primary mt-5 w-100">Get Data</button>
  </form>
</template>

<script>
import { mapStores } from 'pinia'
import { useIncidentStore } from '../stores/IncidentStore'
import { lodash } from 'lodash'

export default {
  computed: {
    ...mapStores(useIncidentStore)
  },
  data() {
    return {
      city: null,
      location: null,
      reason: null,
      condition: null,
      incidentType: null,
      citiesArray: [],
      incidentsArray: [],
      conditionsArray: [],
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
    cleanText(text) {
      text = text.replaceAll('*', '')
      text = text.replace(/<\/?[^>]+(>|$)/g, '')
      return text.trim().substring(0, 65)
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
          // add to store
          this.incidentDataStore.setData(data)

          this.dropdownData = {
            cities: new Set(data.map((el) => this.cleanText(el.city)).sort()),
            locations: new Set(
              data.map((el) => this.cleanText(el.location).replace(re, '')).sort()
            ),
            reasons: new Set(data.map((el) => this.cleanText(el.reason)).sort()),
            conditions: new Set(data.map((el) => this.cleanText(el.condition)).sort()),
            incidentTypes: new Set(data.map((el) => this.cleanText(el.incidentType)).sort())
          }
          console.log('this.dropDownData', this.dropdownData)
        })
        .catch((error) => {
          // Handle error
          console.error('Error:', error)
        })
    },
    getData() {
      const DATASET = this.incidentDataStore.ALL_DATA
      console.log('DATASET', DATASET.length, DATASET)

      // cities
      if (this.incidentDataStore.selectedCity.length) {
        for (let i = 0; i < DATASET.length; i++) {
          if (DATASET[i].city === this.incidentDataStore.selectedCity) {
            console.log('cities match', this.incidentDataStore.selectedCity)
            this.citiesArray.push({
              id: DATASET[i].id,
              city: DATASET[i].city,
              latitude: DATASET[i].latitude,
              longitude: DATASET[i].longitude,
              incidentType: DATASET[i].incidentType,
              location: DATASET[i].location,
              reason: DATASET[i].reason,
              condition: DATASET[i].condition,
              type: DATASET[i].type,
              zindex: i + 666
            })
          }
        }
        console.log('citiesArray', this.citiesArray)
        this.incidentDataStore.setSelectedData(this.citiesArray)
      }

      // Conditions
      if (this.incidentDataStore.selectedCondition.length) {
        for (let i = 0; i < DATASET.length; i++) {
          if (DATASET[i].condition === this.incidentDataStore.selectedCondition) {
            console.log('cities match', this.incidentDataStore.selectedCondition)
            this.conditionsArray.push({
              id: DATASET[i].id,
              city: DATASET[i].city,
              latitude: DATASET[i].latitude,
              longitude: DATASET[i].longitude,
              incidentType: DATASET[i].incidentType,
              location: DATASET[i].location,
              reason: DATASET[i].reason,
              condition: DATASET[i].condition,
              type: DATASET[i].type,
              zindex: i + 666
            })
          }
        }
        console.log('conditionsArray', this.conditionsArray)
        this.incidentDataStore.setSelectedData(this.conditionsArray)
      }

      // Incident Types
      if (this.incidentDataStore.selectedType.length) {
        for (let i = 0; i < DATASET.length; i++) {
          if (DATASET[i].city === this.incidentDataStore.selectedType) {
            console.log('cities match', this.incidentDataStore.selectedType)
            this.incidentsArray.push({
              id: DATASET[i].id,
              city: DATASET[i].city,
              latitude: DATASET[i].latitude,
              longitude: DATASET[i].longitude,
              incidentType: DATASET[i].incidentType,
              location: DATASET[i].location,
              reason: DATASET[i].reason,
              condition: DATASET[i].condition,
              type: DATASET[i].type,
              zindex: i + 666
            })
          }
        }
        console.log('incidentsArray', this.incidentsArray)
        this.incidentDataStore.setSelectedData(this.citiesArray)
      }
    }
    // TODO: Change SELECTED_DATA to the three types
    // TODO: Merge search when more than one type is selected
    // end of getData()
  }
}
</script>
