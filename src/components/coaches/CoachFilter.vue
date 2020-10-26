<template>
  <base-card>
    <h2>Find your Coach</h2>

    <span class="filter-option">
      <input
        id="frontend"
        name="frontend"
        type="checkbox"
        checked
        @change="setFilters"
      />
      <label for="frontend">Frontend</label>
    </span>
    <span class="filter-option">
      <input
        id="backend"
        name="backend"
        type="checkbox"
        checked
        @change="setFilters"
      />
      <label for="backend">Backend</label>
    </span>
    <span class="filter-option">
      <input
        id="career"
        name="career"
        type="checkbox"
        checked
        @change="setFilters"
      />
      <label for="career">Career</label>
    </span>
  </base-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BaseCard from "@/components/ui/BaseCard.vue";

export interface ChangeFiltersEvent {
  frontend: boolean;
  backend: boolean;
  career: boolean;
}

export default defineComponent({
  name: "CoachFilter",

  components: {
    BaseCard
  },

  data: () => ({
    filters: {
      frontend: true,
      backend: true,
      career: true
    }
  }),

  methods: {
    setFilters(event: Event): void {
      if (!event.target) return;

      const target = event.target as HTMLInputElement;
      const { id, checked } = target;

      this.filters = {
        ...this.filters,
        [id]: checked
      };

      this.$emit("change-filters", this.filters as ChangeFiltersEvent);
    }
  },

  emits: ["change-filters"]
});
</script>

<style lang="scss" scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
