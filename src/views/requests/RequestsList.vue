<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error has occurred!"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>

    <section>
      <base-card>
        <header>
          <h2>RequestsList</h2>
        </header>

        <base-spinner v-if="isLoading" />
        <ul v-else-if="hasRequests">
          <request-item
            v-for="request in requests"
            :email="request.userEmail"
            :message="request.message"
            :key="request.id"
          />
        </ul>
        <h3 v-else>You haven't received any requests yet.</h3>
      </base-card>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

import BaseCard from "@/components/ui/BaseCard.vue";
import BaseDialog from "@/components/ui/BaseDialog.vue";
import BaseSpinner from "@/components/ui/BaseSpinner.vue";
import RequestItem from "@/components/requests/RequestItem.vue";

export default defineComponent({
  name: "RequestsList",

  components: {
    BaseCard,
    BaseDialog,
    BaseSpinner,
    RequestItem
  },

  data: () => ({
    isLoading: true,
    error: ""
  }),

  computed: {
    ...mapGetters("requests", ["requests", "hasRequests"])
  },

  methods: {
    async loadRequests() {
      await this.$store.dispatch("requests/loadRequests");
    },
    handleError() {
      this.error = "";
    }
  },

  async created() {
    try {
      await this.loadRequests();
    } catch (err) {
      this.error = err.message || "Something went wrong!";
    }

    this.isLoading = false;

    console.log(this.requests);
  }
});
</script>

<style lang="scss" scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
