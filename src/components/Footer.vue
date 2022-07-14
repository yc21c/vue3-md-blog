<template>
  <div class="text-center mt-5 py-2 border-t border-gray-200">
    <router-link :to="'/'" class="text-reset">
      <!--p class="m-0 p-0">vue3-md-blog v{{ version }}</p-->
    </router-link>
    <p class="m-0 p-0 text-xs">
      Copyright by
      <a href="https://github.com/yc21c/" target="_blank" class="text-reset"
        >APPRZ</a
      >
      © {{ new Date().toDateString().slice(-4) }}
    </p>
  </div>
</template>

<script language="ts">
import { defineComponent } from 'vue'
import { version } from '../../package.json'

export default defineComponent({
  data() {
    return {
      version,
    }
  },
})
</script>
