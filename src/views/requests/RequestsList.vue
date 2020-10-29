<template>
  <section>
    <base-card>
      <header>
        <h2>RequestsList</h2>
      </header>

      <ul v-if="hasRequests">
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

import BaseCard from "@/components/ui/BaseCard.vue";
import RequestItem from "@/components/requests/RequestItem.vue";

export default defineComponent({
  name: "RequestsList",

  components: {
    BaseCard,
    RequestItem
  },

  computed: {
    ...mapGetters("requests", ["requests", "hasRequests"])
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
