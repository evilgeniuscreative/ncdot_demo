<template>
  <div ref="map" style="height: 100%"></div>
</template>
<script>
export default {
  mounted() {
    // Load the Maps JavaScript API script
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCfZ5c2pGbv9TMlKGXeDxwtPVIaEIvpj_4&callback=initMap`
    script.defer = true
    script.async = true
    window.initMap = this.initMap
    document.head.appendChild(script)
  },
  methods: {
    initMap() {
      // Create the map
      const map = new window.google.maps.Map(this.$refs.map, {
        center: { lat: 35.975714, lng: -78.783631 },
        zoom: 12
      })

      // Add pins
      const pin1 = new window.google.maps.Marker({
        position: { lat: 35.975714, lng: -78.783631 },
        map: map,
        title: 'Pin 1'
      })

      const pin2 = new window.google.maps.Marker({
        position: { lat: 35.975094, lng: -78.918934 },
        map: map,
        title: 'Pin 2'
      })
    }
  }
}
</script>
