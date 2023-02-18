<template>
  <nuxt-layout name="setting-view">
    <template #toolbar>
      <v-btn icon @click="clickClose">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </template>
    <template #side>
      <v-list :selected="[pointer]" nav mandatory>
        <v-list-item
          v-for="page in pagesData"
          :key="page.label"
          :value="page.label"
          @click="pointer = page.label"
        >
          {{ page.label }}
        </v-list-item>
      </v-list>
    </template>
    <template #main>
      <keep-alive v-if="dataId">
        <component
          :is="currentPage"
          :data-id="dataId"
          @close="$emit('close')"
        />
      </keep-alive>
      <!-- <cc-full-page-loading-indicator v-else /> -->
    </template>
  </nuxt-layout>
</template>

<script lang="ts">
import { defineComponent, PropType, Component } from 'vue'

type PageData = {
  label: string
  page: Component
}

export default defineComponent({
  props: {
    pagesData: {
      type: Array as PropType<PageData[]>,
      required: true,
      validator: (pagesData: PageData[]) => typeof pagesData[0] === 'undefined',
    },
    dataId: {
      type: String as PropType<string | undefined>,
      default: () => undefined,
    },
    title: {
      type: String,
      required: true,
    },
  },
  emits: ['close'],
  data() {
    return {
      pointer: this.pagesData[0]!.label,
    }
  },
  computed: {
    currentPage() {
      console.log(this.pagesData)
      return this.pagesData.find((page) => page.label === this.pointer)!.page
    },
  },
  watch: {
    dataId(value) {
      if (!value) {
        // NOTE: 設定ページを開いているときに、元のデータが削除された場合はフレンド一覧へ遷移させておく
        this.$emit('close')
        if (this.$route.path !== '/chat/me/friends/list') {
          this.$router.push('/chat/me/friends/list')
        }
      }
    },
  },
  methods: {
    clickClose() {
      this.$emit('close')
      this.pointer = this.pagesData[0]!.label
    },
  },
})
</script>
