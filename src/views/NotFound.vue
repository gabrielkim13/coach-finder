<template>
  <base-card>
    <h2>Page not found</h2>
    <p>
      This page could not be found - maybe check out our
      <router-link to="/coaches">coaches</router-link>.
    </p>
  </base-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BaseCard from "@/components/ui/BaseCard.vue";

export default defineComponent({
  name: "NotFound",

  components: {
    BaseCard
  }
});
</script>
