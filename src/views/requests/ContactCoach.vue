<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="email">E-mail</label>
      <input id="email" type="email" v-model.trim="email" />
    </div>
    <div class="form-control">
      <label for="message">E-mail</label>
      <textarea id="message" rows="5" v-model.trim="message" />
    </div>

    <p class="errors" v-if="!isFormValid">
      Please enter a valid e-mail and your message.
    </p>

    <div class="actions">
      <base-button>Send message</base-button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BaseButton from "@/components/ui/BaseButton.vue";

export default defineComponent({
  name: "ContactCoach",

  components: {
    BaseButton
  },

  data: () => ({
    email: "",
    message: "",
    isFormValid: false
  }),

  methods: {
    submitForm() {
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.message === ""
      ) {
        this.isFormValid = false;

        return;
      }

      console.log({ email: this.email, message: this.message });
    }
  }
});
</script>

<style lang="scss" scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
