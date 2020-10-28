<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !form.firstname.isValid }">
      <label for="firstname">First name</label>
      <input type="text" id="firstname" v-model.trim="form.firstname.value" />
      <p v-if="!form.firstname.isValid">First name must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !form.lastname.isValid }">
      <label for="lastname">Last name</label>
      <input type="text" id="lastname" v-model.trim="form.lastname.value" />
      <p v-if="!form.lastname.isValid">Last name must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !form.description.isValid }">
      <label for="description">Description</label>
      <input
        type="text"
        id="description"
        v-model.trim="form.description.value"
      />
      <p v-if="!form.description.isValid">Description must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !form.rate.isValid }">
      <label for="rate">Hourly rate</label>
      <input type="number" id="rate" v-model.number="form.rate.value" />
      <p v-if="!form.rate.isValid">Rate must not be greater than zero.</p>
    </div>

    <div class="form-control" :class="{ invalid: !form.areas.isValid }">
      <h3>Areas of expertise:</h3>

      <div>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="form.areas.value"
        />
        <label for="frontend">Frontend development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model="form.areas.value"
        />
        <label for="backend">Backend development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="career"
          value="career"
          v-model="form.areas.value"
        />
        <label for="career">Career advisory</label>
      </div>

      <p v-if="!form.areas.isValid">
        At least 1 are of expertise must be selected.
      </p>
    </div>

    <p v-if="!isFormValid" class="invalid">
      Please fix the errors and then try again.
    </p>

    <base-button type="submit">Register</base-button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BaseButton from "@/components/ui/BaseButton.vue";

export interface CoachFormData {
  first: string;
  last: string;
  desc: string;
  rate: number;
  areas: string[];
}

export default defineComponent({
  name: "CoachForm",

  components: {
    BaseButton
  },

  data: () => ({
    form: {
      firstname: { value: "", isValid: false },
      lastname: { value: "", isValid: false },
      description: { value: "", isValid: false },
      rate: { value: 0, isValid: false },
      areas: { value: [], isValid: false }
    },
    isFormValid: false
  }),

  watch: {
    form: {
      handler() {
        this.validateForm();
      },
      deep: true
    }
  },

  methods: {
    validateForm() {
      this.isFormValid = true;

      Object.values(this.form).forEach(field => {
        switch (typeof field.value) {
          case "number":
            field.isValid = !!field.value && field.value > 0;
            break;

          case "string":
            field.isValid = !!field.value && field.value !== "";
            break;

          case "object":
            field.isValid =
              Array.isArray(field.value) && field.value.length > 0;
            break;

          default:
            break;
        }

        this.isFormValid = this.isFormValid && field.isValid;
      });
    },
    submitForm() {
      if (!this.isFormValid) return;

      const formData = {
        first: this.form.firstname.value,
        last: this.form.lastname.value,
        desc: this.form.description.value,
        rate: this.form.rate.value,
        areas: this.form.areas.value
      };

      this.$emit("save-data", formData);
    }
  },

  emits: ["save-data"]
});
</script>

<style lang="scss" scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid,
.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
