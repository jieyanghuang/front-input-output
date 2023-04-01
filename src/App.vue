<template>
  <div id="app">
    <index />
  </div>
</template>

<script>
import index from "./page/index.vue";

export default {
  name: "App",
  components: {
    index,
  },
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
