<template>
  <PatchMeta
    :title="section ? section : 'Minimal Vue3 + Markdown blog engine'"
  />
  <div class="max-w-5xl px-4 mx-auto sm:px-6 md:px-8">
    <div class="container px-4 mx-auto mt-8">
      <!-- HEADER -->
      <BlogHeader class="mb-5" />

      <hr v-if="section" />
      <p v-if="section" class="my-5 text-center display-4 text-capitalize">
        {{ section }}
      </p>

      <div
        v-for="entry in pageStatus.visiblePosts"
        :key="entry.id"
        class="w-full p-5 mb-6 bg-white border rounded-sm shadow-sm"
      >
        <div class="flex items-center justify-between w-full pb-1">
          <div class="flex items-center space-x-3">
            <div
              class="h-8 w-8 min-w-[32px] rounded-md bg-contain bg-center border-none"
              :style="{
                backgroundImage: `url('https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${entry.section}/${entry.section}-original.svg')`,
              }"
            ></div>
            <div class="text-sm font-normal sm:text-xl text-slate-700">
              <router-link
                :to="`/${entry.section}/${entry.id}`"
                class="text-reset"
              >
                {{ entry.title }}
              </router-link>
            </div>
          </div>
          <div class="flex items-center space-x-8">
            <router-link
              v-if="!section"
              :to="`/${entry.section}`"
              class="text-reset"
            >
              <button
                class="hidden px-3 py-1 text-xs font-semibold border rounded-2xl bg-neutral-100 sm:inline-block"
              >
                {{ entry.section }}
              </button>
            </router-link>
            <div class="text-xs text-neutral-500">{{ entry.date }}</div>
          </div>
        </div>

        <div class="mt-6 mb-2">
          <div class="text-sm text-neutral-600">
            {{ entry.description }}
          </div>
        </div>
      </div>

      <!-- PAGINATION -->
      <ul
        v-if="pageStatus.endPage > pageStatus.startPage"
        class="flex pl-0 my-2 list-none rounded pagination"
        style="cursor: pointer"
      >
        <li
          class="relative block px-3 py-2 ml-0 leading-tight text-gray-700 bg-white border border-r-0 border-gray-300 rounded-l hover:bg-gray-200"
          :class="currentPage == pageStatus.startPage ? 'active' : ''"
          @click="currentPage = pageStatus.startPage"
        >
          <a class="page-link">{{ pageStatus.startPage }}</a>
        </li>
        <li
          v-for="(page, index) in pageStatus.midPages"
          :key="index"
          class="relative block px-3 py-2 leading-tight text-gray-700 bg-white border border-r-0 border-gray-300 hover:bg-gray-200"
          :class="currentPage == page ? 'active' : ''"
          @click="currentPage = page"
        >
          <a class="page-link">{{ page }}</a>
        </li>
        <li
          class="relative block px-3 py-2 leading-tight text-gray-700 bg-white border border-gray-300 rounded-r hover:bg-gray-200"
          :class="currentPage == pageStatus.endPage ? 'active' : ''"
          @click="currentPage = pageStatus.endPage"
        >
          <a class="page-link" href="#">{{ pageStatus.endPage }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed, inject } from 'vue'
import BlogHeader from '../components/BlogHeader.vue'
import PatchMeta from '../components/PatchMeta.vue'
import paginate from '../utils/paginate'
import { PostIndex } from '../types/PostIndex'
import blogConfig from '../blog_config'

const { VUE_APP_POSTS_PER_PAGE, REPO_ASSET_URL } = blogConfig

export default defineComponent({
  components: {
    PatchMeta,
    BlogHeader,
  },
  props: {
    section: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const postsIndex: PostIndex[] = inject<PostIndex[]>('postsIndex', [])
    const state = reactive({
      currentPage: 1,
    })

    const pageStatus = computed(() => {
      const categoryPosts = props.section
        ? postsIndex.filter(({ section }) => section === props.section)
        : postsIndex
      const { startPage, endPage, startIndex, endIndex } = paginate(
        categoryPosts.length,
        state.currentPage,
        VUE_APP_POSTS_PER_PAGE
      )
      const prev =
        state.currentPage - 1 >= startPage ? state.currentPage - 1 : 0
      const next = state.currentPage + 1 <= endPage ? state.currentPage + 1 : 0
      const midPages = [prev, state.currentPage, next].filter(
        (p) => p > startPage && p < endPage
      )

      const visiblePosts = categoryPosts.slice(startIndex, endIndex + 1)

      return {
        startPage,
        midPages,
        endPage,
        visiblePosts,
      }
    })

    return {
      ...toRefs(state),
      pageStatus,
      REPO_ASSET_URL,
    }
  },
})
</script>
<style scoped>
.pagination .active {
  background-color: #f3f3f3;
}
</style>
