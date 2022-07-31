<template>
  <PatchMeta />
  <NavBar :title="'YC DEVELOG'" :sections="blogSections" />
  <Suspense>
    <template #default>
      <router-view />
    </template>
    <template #fallback>
      <Loader />
    </template>
  </Suspense>
  <Footer />
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import PatchMeta from './components/PatchMeta.vue'
import Loader from './components/Loader.vue'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'

import 'github-markdown-css/github-markdown.css'

export default defineComponent({
  components: {
    PatchMeta,
    Loader,
    NavBar,
    Footer,
  },
  setup() {
    const blogSections = inject('blogSections', {})
    return { blogSections }
  },
})
</script>
<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/styles/monokai-sublime.min.css');
/* @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap'); */
body {
  line-height: 1;
  font-family: 'Noto Sans KR', sans-serif, ui-sans-serif, system-ui,
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
    Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol', 'Noto Color Emoji';
}
.markdown-body .highlight pre,
.markdown-body pre {
  background-color: #23241f;
}
</style>
