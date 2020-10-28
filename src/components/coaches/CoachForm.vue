<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="firstname">First name</label>
      <input type="text" id="firstname" v-model.trim="firstname" />
    </div>
    <div class="form-control">
      <label for="lastname">Last name</label>
      <input type="text" id="lastname" v-model.trim="lastname" />
    </div>
    <div class="form-control">
      <label for="description">Description</label>
      <input type="text" id="description" v-model.trim="description" />
    </div>
    <div class="form-control">
      <label for="rate">Hourly rate</label>
      <input type="number" id="rate" v-model.number="rate" />
    </div>

    <div class="form-control">
      <h3>Areas of expertise:</h3>

      <div>
        <input type="checkbox" id="frontend" value="frontend" v-model="areas" />
        <label for="frontend">Frontend development</label>
      </div>
      <div>
        <input type="checkbox" id="backend" value="backend" v-model="areas" />
        <label for="backend">Backend development</label>
      </div>
      <div>
        <input type="checkbox" id="career" value="career" v-model="areas" />
        <label for="career">Career advisory</label>
      </div>
    </div>

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
    firstname: "",
    lastname: "",
    description: "",
    rate: 0,
    areas: []
  }),

  methods: {
    submitForm() {
      const formData = {
        first: this.firstname,
        last: this.lastname,
        desc: this.description,
        rate: this.rate,
        areas: this.areas
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

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
