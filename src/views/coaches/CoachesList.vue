<template>
  <h1>CoachesList</h1>

  <base-card>
    <div class="controls">
      <base-button mode="outline">Refresh</base-button>
      <base-button link to="/register">Register as coach</base-button>
    </div>
    <ul v-if="hasCoaches">
      <coach-item
        v-for="coach in coaches"
        :key="coach.id"
        :id="coach.id"
        :firstName="coach.firstName"
        :lastName="coach.lastName"
        :rate="coach.hourlyRate"
        :areas="coach.areas"
      />
    </ul>
    <h3 v-else>No coaches found</h3>
  </base-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

import BaseButton from "@/components/ui/BaseButton.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import CoachItem from "@/components/coaches/CoachItem.vue";

export default defineComponent({
  name: "CoachesList",

  components: {
    BaseButton,
    BaseCard,
    CoachItem
  },

  computed: {
    ...mapGetters("coaches", ["coaches", "hasCoaches"])
  }
});
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
