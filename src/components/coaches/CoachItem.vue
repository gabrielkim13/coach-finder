<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ rate }}/hour</h4>
    <div>
      <base-badge
        v-for="area in areas"
        :key="area"
        :type="area"
        :title="area"
      />
    </div>
    <div class="actions">
      <base-button mode="outline" link :to="coachDetailsLink"
        >Details</base-button
      >
      <base-button link :to="coachContactLink">Contact</base-button>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import BaseBadge from "@/components/ui/BaseBadge.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

export default defineComponent({
  name: "CoachItem",

  components: {
    BaseBadge,
    BaseButton
  },

  props: {
    id: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    rate: {
      type: Number,
      required: true
    },
    areas: {
      type: Object as PropType<string[]>,
      required: true
    }
  },

  computed: {
    fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    },
    coachDetailsLink(): string {
      return `/coaches/${this.id}`;
    },
    coachContactLink(): string {
      return `/coaches/${this.id}/contact`;
    }
  }
});
</script>

<style lang="scss" scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
