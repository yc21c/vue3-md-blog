<template>
  <PatchMeta :title="section ? section : 'Minimal Vue3 + Markdown blog engine'" />
  <main class="max-w-[48rem] mx-auto px-4 pb-28 sm:px-6 md:px-8 xl:px-12 lg:max-w-4xl">
    <!-- HEADER -->
    <BlogHeader v-if="!section" class="mb-5" />
    <!-- Breadcrumb -->
    <nav v-if="section" class="flex mt-8 mb-8" aria-label="Breadcrumb">
      <ol class="inline-flex items-center pl-10 space-x-1 list-none md:space-x-3">
        <li class="inline-flex items-center">
          <router-link
            to="/"
            class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
              ></path>
            </svg>
            all
          </router-link>
        </li>
        <li>
          <div class="flex items-center">
            <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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
    <div class="relative sm:pb-12 sm:ml-[calc(2rem+1px)] md:ml-[calc(3.5rem+1px)] lg:ml-[max(calc(14.5rem+1px),calc(100%-48rem))]">
      <div class="hidden absolute top-3 bottom-0 right-full mr-7 md:mr-[3.25rem] w-px bg-slate-200 dark:bg-slate-800 sm:block"></div>
      <div class="space-y-16">
        <article v-for="entry in pageStatus.visiblePosts" :key="entry.id" class="relative group">
          <div
            class="absolute -inset-y-2.5 -inset-x-4 md:-inset-y-4 md:-inset-x-6 sm:rounded-2xl group-hover:bg-slate-50/70 dark:group-hover:bg-slate-800/50"
          ></div>
          <svg
            viewBox="0 0 9 9"
            class="hidden absolute right-full mr-6 top-2 text-slate-200 dark:text-slate-600 md:mr-12 w-[calc(0.5rem+1px)] h-[calc(0.5rem+1px)] overflow-visible sm:block"
          >
            <circle cx="4.5" cy="4.5" r="6.5" stroke="currentColor" class="fill-white dark:fill-slate-900" stroke-width="2"></circle>
          </svg>
          <div class="relative flex w-full">
            <div class="relative flex-none sm:self-start lg:self-auto xl:self-start">
              <div
                class="relative z-20 overflow-hidden flex-none"
                style="
                  width: 50px;
                  height: 48px;
                  border: none;
                  border-radius: 4.16659% 0% 0% 4.16659% / 2.62297% 0% 0% 2.62297%;
                  transform-origin: 0% 50% 0px;
                "
              >
                <img
                  :src="`${REPO_ASSET_URL}${entry.section}-original.svg`"
                  alt=""
                  loading="lazy"
                  class="absolute max-w-none"
                  style="width: 48px; height: 48px; left: 0px; top: 0px; opacity: 1; z-index: 2; transform-origin: 50% 50% 0px"
                />
              </div>
            </div>
            <div class="self-start flex-auto flex flex-wrap items-baseline p-5 pt-0 pr-0">
              <h3 class="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-200 pt-1 lg:pt-0">
                {{ entry.title }}
              </h3>
              <div class="mt-2 mb-4 prose prose-slate prose-a:relative prose-a:z-10 dark:prose-dark line-clamp-2 text-xs text-gray-500">
                <p>
                  {{ entry.description }}
                </p>
              </div>
              <router-link class="flex items-center text-sm text-sky-500 font-medium" :to="`/${entry.section}/${entry.id}`"
                ><span class="absolute -inset-y-2.5 -inset-x-4 md:-inset-y-4 md:-inset-x-6 sm:rounded-2xl"></span
                ><span class="relative">Read more<span class="sr-only">, Tailwind UI: Site templates and all-access</span></span
                ><svg
                  class="relative mt-px overflow-visible ml-2.5 text-sky-300 dark:text-sky-700"
                  width="3"
                  height="6"
                  viewBox="0 0 3 6"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M0 0L3 3L0 6"></path></svg
              ></router-link>
            </div>

            <dl class="absolute left-0 top-0 lg:left-auto lg:right-full lg:mr-[calc(6.5rem+1px)]">
              <dt class="sr-only">Date</dt>
              <dd class="whitespace-nowrap text-sm leading-6 dark:text-slate-400">
                <time datetime="2022-06-23T19:40:00.000Z">{{ entry.date }}</time>
              </dd>
            </dl>
          </div>
        </article>
      </div>
    </div>
    <!-- PAGINATION -->
    <ul
      v-if="pageStatus.endPage > pageStatus.startPage"
      class="flex pl-0 my-2 list-none rounded pagination text-right justify-end"
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
  </main>
  <div class="max-w-5xl px-4 mx-auto sm:px-6 md:px-8">
    <div class="container px-4 mx-auto mt-8"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed, inject } from "vue";
import BlogHeader from "../components/BlogHeader.vue";
import PatchMeta from "../components/PatchMeta.vue";
import paginate from "../utils/paginate";
import { PostIndex } from "../types/PostIndex";
import blogConfig from "../blog_config";

const { VUE_APP_POSTS_PER_PAGE, REPO_ASSET_URL } = blogConfig;

export default defineComponent({
  components: {
    PatchMeta,
    BlogHeader,
  },
  props: {
    section: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const postsIndex: PostIndex[] = inject<PostIndex[]>("postsIndex", []);
    const state = reactive({
      currentPage: 1,
    });

    const pageStatus = computed(() => {
      const categoryPosts = props.section ? postsIndex.filter(({ section }) => section === props.section) : postsIndex;
      const { startPage, endPage, startIndex, endIndex } = paginate(categoryPosts.length, state.currentPage, VUE_APP_POSTS_PER_PAGE);
      const prev = state.currentPage - 1 >= startPage ? state.currentPage - 1 : 0;
      const next = state.currentPage + 1 <= endPage ? state.currentPage + 1 : 0;
      const midPages = [prev, state.currentPage, next].filter((p) => p > startPage && p < endPage);

      const visiblePosts = categoryPosts.slice(startIndex, endIndex + 1);

      return {
        startPage,
        midPages,
        endPage,
        visiblePosts,
      };
    });

    return {
      ...toRefs(state),
      pageStatus,
      REPO_ASSET_URL,
    };
  },
});
</script>
<style scoped>
.pagination .active {
  background-color: #f3f3f3;
}
</style>
