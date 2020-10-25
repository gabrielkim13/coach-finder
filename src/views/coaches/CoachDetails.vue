<template>
  <h1>CoachDetails</h1>
  <router-link to="/coaches/c1/contact">Contact</router-link>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CoachDetails"
});
</script>
