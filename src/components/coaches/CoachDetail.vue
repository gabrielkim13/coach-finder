<template>
  <section>
    <base-card>
      <h2>{{ fullName }}</h2>
      <h3>${{ rate }}/hour</h3>
    </base-card>
  </section>

  <section>
    <base-card>
      <h2>Interested? Reach out now!</h2>
      <base-button link :to="contactLink">Contact</base-button>
    </base-card>
    <router-view />
  </section>

  <base-card>
    <base-badge v-for="area in areas" :key="area" :title="area" :type="area" />
    <p>{{ description }}</p>
  </base-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

import BaseBadge from "@/components/ui/BaseBadge.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseCard from "@/components/ui/BaseCard.vue";

import { Coach } from "@/store/modules/coaches";

export default defineComponent({
  name: "CoachDetail",

  components: {
    BaseBadge,
    BaseButton,
    BaseCard
  },

  props: ["id"],

  data: () => ({
    coach: {} as Coach | undefined
  }),

  computed: {
    ...mapGetters("coaches", ["coaches"]),

    fullName(): string {
      return `${this.coach?.firstName} ${this.coach?.lastName}`;
    },
    contactLink(): string {
      return `coaches/${this.id}/contact`;
    },
    areas(): string[] {
      return this.coach?.areas || [];
    },
    rate(): number {
      return this.coach?.hourlyRate || 0;
    }
  },

  created() {
    const coaches = this.coaches() as Coach[];

    this.coach = coaches.find(findCoach => findCoach.id === this.id);
  }
});
</script>
