<template>
  <div id="googleapp">
    <google-map />
  </div>
</template>

<script>
import GoogleMap from "./GoogleMap";

export default {
  name: "GoogleApp",
  components: {
    GoogleMap
  }
};
</script>