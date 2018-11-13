<template>
  <div class="header-base" id="header">
    <v-layout row justify-end wrap>
      <v-layout row justify-start>
        <v-btn color='primary' dark @click='$router.push({ path: `/` })'>HOME</v-btn>
      </v-layout>
      <v-btn color='green' dark @click='$router.push({ path: `/profile` })'>PROFILE</v-btn>
      <v-btn color='red' dark @click='$router.push({ path: `/new` })'>SELL</v-btn>
      <v-btn color='blue' dark @click='$router.push({ path: `/search` })'>SEARCH</v-btn>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'header-base',
  data () {
    return {}
  },
  created () {
    // initialize global details (eg. authToken, username, etc.)
  }
}
</script>

<style>
#header {
  background-color: #f0f0f0;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-bottom: 10px;
}
</style>
