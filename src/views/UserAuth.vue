<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
    >
      <p>{{ errorText }}</p>
    </base-dialog>

    <base-card>
      <base-spinner v-if="isLoading" />
      <form @submit.prevent="submitForm" v-else>
        <div class="form-control">
          <label for="email">E-mail</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="!isFormValid">
          Please enter a valid e-mail and a password with at least 6 characters.
        </p>
        <base-button>{{ submitButtonText }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">
          {{ switchModeButtonText }} instead
        </base-button>
      </form>
    </base-card>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";
import { mapActions } from "vuex";

import BaseButton from "@/components/ui/BaseButton.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseSpinner from "@/components/ui/BaseSpinner.vue";

export default defineComponent({
  name: "UserAuth",

  components: {
    BaseButton,
    BaseCard,
    BaseDialog: defineAsyncComponent(() =>
      import("@/components/ui/BaseDialog.vue")
    ),
    BaseSpinner
  },

  data: () => ({
    email: "",
    password: "",
    isFormValid: false,
    mode: "login",
    isLoading: false,
    error: ""
  }),

  computed: {
    submitButtonText(): string {
      return this.mode === "login" ? "Login" : "Signup";
    },
    switchModeButtonText(): string {
      return `${this.mode === "login" ? "Signup" : "Login"} instead`;
    },
    errorText(): string {
      return `There was an error ${
        this.mode === "login" ? "logging in" : "signing up"
      }.`;
    }
  },

  methods: {
    ...mapActions("auth", ["login", "signup"]),
    async submitForm() {
      this.isFormValid = true;

      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.isFormValid = false;

        return;
      }

      this.isLoading = true;

      try {
        switch (this.mode) {
          case "login":
            await this.login({ email: this.email, password: this.password });

            this.$router.replace("/coaches");

            return;

          case "signup":
            await this.signup({ email: this.email, password: this.password });
            break;

          default:
            break;
        }
      } catch (err) {
        this.error = err.message || "Something went wrong!";
      } finally {
        this.isLoading = false;
      }
    },
    switchAuthMode() {
      this.mode = this.mode === "login" ? "signup" : "login";
    },
    handleError() {
      this.error = "";
    }
  }
});
</script>

<style lang="scss" scoped>
form {
  margin: 1rem;
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
