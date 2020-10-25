<template>
  <the-header />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import TheHeader from "@/components/layout/TheHeader.vue";

export default defineComponent({
  name: "App",

  components: {
    TheHeader
  }
});
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}
</style>
