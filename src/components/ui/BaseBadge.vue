<template>
  <span class="badge" :class="type">
    {{ text }}
  </span>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "BaseBadge",

  props: {
    type: {
      type: String as PropType<"frontend" | "backend" | "career">,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },

  computed: {
    text(): string {
      return this.title.toUpperCase();
    }
  }
});
</script>

<style lang="scss" scoped>
.badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
}

.frontend {
  background-color: #3d008d;
  color: white;
}

.backend {
  background-color: #71008d;
  color: white;
}

.career {
  background-color: #8d006e;
  color: white;
}
</style>
