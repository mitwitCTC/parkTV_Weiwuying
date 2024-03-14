<template>
  <!-- App.vue -->
  <v-app id="app">
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  
};
</script>

<style>
#app {
  font-family: "Microsoft JhengHei", Helvetica, Arial, sans-serif;
  background-color: #2b2b2b;
  color: #efefef;
  text-transform: uppercase;
}
*::-webkit-scrollbar {
    display: none;
}
</style>