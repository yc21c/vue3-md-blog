<template>
  <PatchMeta
    :title="section ? section : 'Minimal Vue3 + Markdown blog engine'"
  />
  <div class="max-w-5xl px-4 mx-auto sm:px-6 md:px-8">
    <div class="container px-4 mx-auto mt-8">
      <!-- HEADER -->
      <BlogHeader class="mb-5" />

      <!-- Breadcrumb -->
      <nav v-if="section" class="flex mb-8" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 list-none md:space-x-3">
          <li class="inline-flex items-center">
            <router-link
              to="/"
              class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                class="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                ></path>
              </svg>
              all
            </router-link>
          </li>
          <li>
            <div class="flex items-center">
              <svg
                class="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <router-link
                :to="`/${section}`"
                class="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                >{{ section }}</router-link
              >
            </div>
          </li>
        </ol>
      </nav>

      <ol
        class="relative list-none border-l border-gray-200 dark:border-gray-700"
      >
        <li
          v-for="entry in pageStatus.visiblePosts"
          :key="entry.id"
          class="mb-10 ml-4"
        >
          <div
            class="absolute w-6 h-6 mt-0.5 bg-gray-200 border-white border-2 rounded-full -left-3 dark:border-gray-900 dark:bg-gray-700 bg-no-repeat"
            :style="{
              backgroundImage: `url('${REPO_ASSET_URL}${entry.section}-original.svg')`,
              backgroundSize: '100%',
              backgroundPosition: 'center',
              backgroundRepeat: 'none',
            }"
          ></div>
          <time
            class="mb-1 text-xs font-normal leading-none text-gray-400 dark:text-gray-500"
            >{{ entry.date }}</time
          >
          <h3 class="my-2 font-semibold text-black text-md dark:text-white">
            <router-link
              :to="`/${entry.section}/${entry.id}`"
              class="text-reset"
            >
              {{ entry.title }}
            </router-link>
          </h3>
          <p class="mb-2 text-sm font-normal text-gray-500 dark:text-gray-400">
            <router-link
              :to="`/${entry.section}/${entry.id}`"
              class="text-reset"
            >
              {{ entry.description }}
            </router-link>
          </p>
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
        </li>
      </ol>

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
