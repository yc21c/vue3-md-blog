<template>
  <PatchMeta :title="title" />
  <div class="max-w-5xl px-4 py-12 mx-auto sm:px-6 md:px-8">
    <div class="container mx-auto my-4 list-disc my-md-5">
      <span class="markdown-body" v-html="postHtml" />
      <button
        class="px-4 py-2 mt-4 text-sm font-medium text-gray-600 transition border border-gray-600 rounded-md focus:outline-none focus:ring hover:text-white hover:bg-gray-600 active:bg-gray-700 focus:ring-gray-300"
        type="button"
        @click="hasHistory() ? router.go(-1) : router.push('/')"
      >
        &laquo; Back
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import router from '../router'
import axios from 'redaxios'
import MarkdownIt from 'markdown-it'
import emoji from 'markdown-it-emoji'
import highlightjs from 'markdown-it-highlightjs'
import { PostIndex } from '../types/PostIndex'
import PatchMeta from '../components/PatchMeta.vue'
import blogConfig from '../blog_config'

const markDownIt = new MarkdownIt({ html: true }).use(highlightjs).use(emoji)

export default defineComponent({
  components: {
    PatchMeta,
  },
  props: {
    section: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
  },
  async setup(props) {
    /* Hacky navigation when a href link is clicked within the compiled html Post */
    onBeforeRouteUpdate(() => {
      location.reload()
    })

    // Fetch Post markdown and compile it to html
    const postsIndex: PostIndex[] = inject<PostIndex[]>('postsIndex', [])
    const { url = '' } = postsIndex.find(({ id }) => id === props.id) || {}
    const { data: markDownSource } = await axios.get(url)
    const postHtml = markDownIt.render(markDownSource)

    // Patch page title
    const [, title] = markDownSource.split('#')

    // Back button helper
    const hasHistory = () => window.history?.length > 2

    return {
      hasHistory,
      postHtml,
      router,
      title,
    }
  },
})
</script>
