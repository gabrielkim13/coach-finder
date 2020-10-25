<template>
  <h1>CoachesList</h1>

  <ul v-if="hasCoaches">
    <li v-for="coach in coaches" :key="coach.id">{{ coach }}</li>
  </ul>
  <h3 v-else>No coaches found</h3>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "CoachesList",

  computed: {
    ...mapGetters("coaches", ["coaches", "hasCoaches"])
  }
});
</script>
