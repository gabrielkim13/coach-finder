<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>

      <coach-form @save-data="saveData" />
    </base-card>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BaseCard from "@/components/ui/BaseCard.vue";
import CoachForm, { CoachFormData } from "@/components/coaches/CoachForm.vue";

export default defineComponent({
  name: "CoachContact",

  components: {
    BaseCard,
    CoachForm
  },

  methods: {
    saveData(formData: CoachFormData) {
      this.$store.dispatch("coaches/registerCoach", formData);

      this.$router.replace("/coaches");
    }
  }
});
</script>
