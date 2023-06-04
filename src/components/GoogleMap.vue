<template>
  <GMapMap :center="center" :zoom="7" map-type-id="terrain" style="width: 500px; height: 300px">
    <GMapCluster>
      <GMapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center = m.position"
      />
    </GMapCluster>
  </GMapMap>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      center: { lat: 35.836933, lng: -80 },
      markers: [
        {
          position: {
            lat: 35.836933,
            lng: -80
          }
        } // Along list of clusters
      ]
    }
  }
}
</script>
<style scoped></style>
