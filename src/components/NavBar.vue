<template>
  <nav
    class="bg-white dark:bg-black dark:text-white flex flex-col md:flex-row items-center md:justify-between px-6 py-4 border-b border-b-gray-60 shadow-sm max-w-screen-full mx-auto"
  >
    <!-- Logo -->
    <div>
      <h2 class="text-3xl font-bold">
        <router-link class="navbar-brand" :to="'/'">
          <span class="text-gray-600">
            {{ title }}
          </span>
        </router-link>
      </h2>
    </div>
    <!-- /End Logo -->
    <div class="mt-5 md:mt-0">
      <ul
        class="flex flex-col md:flex-row md:space-x-5 w-full items-center text-sm"
      >
        <router-link
          v-for="(count, section) of sections"
          :key="section"
          :to="section === 'all' ? '/' : `/${section}`"
        >
          <a>{{ section }} ({{ count }}) </a>
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<script language="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '',
    },
    sections: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    const showDropdown = ref(false)
    return {
      showDropdown,
    }
  },
})
</script>
