<template>
  <div>
    <base-dialog :show="!!error" title="An error ocurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>

    <section>
      <coach-filter @change-filters="setFilters" />
    </section>

    <section>
      <base-spinner v-if="isLoading" />
      <base-card v-else>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)"
            >Refresh</base-button
          >
          <base-button v-if="!isCoach" link to="/register">
            Register as coach
          </base-button>
        </div>

        <ul v-if="hasCoaches">
          <coach-item
            v-for="coach in filteredCoaches"
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
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

import BaseButton from "@/components/ui/BaseButton.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseDialog from "@/components/ui/BaseDialog.vue";
import BaseSpinner from "@/components/ui/BaseSpinner.vue";
import CoachFilter, {
  ChangeFiltersEvent
} from "@/components/coaches/CoachFilter.vue";
import CoachItem from "@/components/coaches/CoachItem.vue";

import { Coach } from "@/store/modules/coaches";

export default defineComponent({
  name: "CoachesList",

  components: {
    BaseButton,
    BaseCard,
    BaseDialog,
    BaseSpinner,
    CoachFilter,
    CoachItem
  },

  data: () => ({
    isLoading: true,
    error: "",
    activeFilters: {
      frontend: true,
      backend: true,
      career: true
    }
  }),

  computed: {
    ...mapGetters("coaches", ["hasCoaches", "isCoach"]),
    filteredCoaches(): Coach[] {
      const coaches = this.$store.getters["coaches/coaches"] as Coach[];

      return coaches.filter(coach =>
        coach.areas.some(area => this.activeFilters[area])
      );
    }
  },

  methods: {
    setFilters(updatedFilters: ChangeFiltersEvent) {
      this.activeFilters = updatedFilters;
    },
    async loadCoaches(forceUpdate = false) {
      try {
        await this.$store.dispatch("coaches/loadCoaches", { forceUpdate });
      } catch (err) {
        this.error = err.message || "Something went wrong!";
      }
    },
    handleError() {
      this.error = "";
    }
  },

  async created() {
    await this.loadCoaches();

    this.isLoading = false;
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
