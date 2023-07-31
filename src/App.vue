<template>
  <the-header></the-header>
  <router-view></router-view>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
export default {
  components: {
    TheHeader,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'IBM Plex Sans', sans-serif;
}

body {
  margin: 0;
}
</style>