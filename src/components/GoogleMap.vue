<template>
  <div ref="map" id="map" style="height: 100%; width: 100%"></div>
</template>
<script>
import { mapStores } from 'pinia'
import { useIncidentStore } from '../stores/IncidentStore'
import { lodash } from 'lodash'

export default {
  data() {
    return {
      labels: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      labelIndex: 0,
      map: {}
    }
  },
  mounted() {
    // Load the Maps JavaScript API script
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCfZ5c2pGbv9TMlKGXeDxwtPVIaEIvpj_4&callback=initMap`
    script.defer = true
    script.async = true
    window.initMap = this.initMap
    document.head.appendChild(script)

    console.log('Google Maps SELECTED_DATA', this.incidentDataStore.SELECTED_DATA)
  },
  computed: {
    ...mapStores(useIncidentStore)
  },
  watch: {
    incidentDataStore: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          if (!newValue.SELECTED_DATA) {
            return
          } else {
            console.log('data changed', this.incidentDataStore.SELECTED_DATA)
            if (this.incidentDataStore.SELECTED_DATA.length > 0) {
              this.createPins()
            }
          }
          this.$refs['IncidentStore-' + newValue.SELECTED_DATA]
        })
      }
    }
  },
  methods: {
    createPins: function () {
      console.log('createPins')
      for (let x = 0; x < this.incidentDataStore.SELECTED_DATA.length; x++) {
        console.log('x', x)
        const info = this.incidentDataStore.SELECTED_DATA[x]
        const tempTitle = info.city + '\n' + info.location + '\n' + info.incidentType
        let pinName = 'pin' + x

        pinName = new window.google.maps.Marker({
          position: { lat: info.latitude, lng: info.longitude },
          label: this.labels[this.labelIndex++ % this.labels.length],
          title: tempTitle,
          zoom: 12
        })
        if (x === 0) {
          this.map.setCenter({ lat: info.latitude, lng: info.longitude })
          this.map.setZoom(9)
        }
        pinName.setMap(this.map)
      }
    },
    initMap() {
      // Create the map
      this.map = new window.google.maps.Map(this.$refs.map, {
        center: { lat: 35.998336, lng: -78.905205 },
        zoom: 7
      })
    }
  }
}
</script>
