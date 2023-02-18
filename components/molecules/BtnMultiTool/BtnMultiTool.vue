<template>
  <v-menu v-model="showContextMenu" v-bind="menuAttrs">
    <template #activator="{ props: menuProps }">
      <v-tooltip v-bind="tooltipAttrs">
        <template #activator="{ props: tooltipProps }">
          <v-btn
            icon
            elevation="0"
            :to="to"
            v-bind="{ ...menuProps, ...tooltipProps, onClick: null }"
            @contextmenu.prevent="
              handleContextMenu($event), menuProps.onClick?.($event)
            "
          >
            <mol-avatar
              size="large"
              :photo-url="photoUrl"
              :display-name="displayName"
            />
          </v-btn>
        </template>
        <span>{{ tooltipText || displayName }}</span>
      </v-tooltip>
    </template>
    <v-list bg-color="#fff" nav min-width="250">
      <v-list-item
        v-for="(item, index) in menu"
        :key="index"
        @click="item.click"
      >
        <v-list-item-title>{{ item.label }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type { VTooltip, VMenu } from 'vuetify/components'
import MolAvatar from '../Avatar/Avatar.vue'

export default defineComponent({
  components: { MolAvatar },
  props: {
    menu: {
      type: Array as PropType<{ label: string; click: () => void }[]>,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      default: undefined,
    },
    tooltipAttrs: {
      type: Object as PropType<VTooltip['$props'] & VTooltip['$attrs']>,
      default: () => ({}),
    },
    tooltipText: {
      type: String,
      default: () => '',
    },
    menuAttrs: {
      type: Object as PropType<VMenu['$props'] & VMenu['$attrs']>,
      default: () => ({}),
    },
    to: {
      type: String,
      default: () => '',
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showContextMenu: false,
    }
  },
  computed: {
    btnAttrs(): any {
      return this.photoUrl !== undefined
        ? {
            variant: 'outlined',
          }
        : {}
    },
  },
  mounted() {
    window.addEventListener('cc-close-contextmenu', this.closeContextMenu)
  },
  beforeUnmount() {
    window.removeEventListener('cc-close-contextmenu', this.closeContextMenu)
  },
  methods: {
    closeContextMenu(event: CustomEvent) {
      if (this.$el.contains(event.detail.target as HTMLElement)) return
      this.showContextMenu = false
    },
    handleContextMenu(event: MouseEvent) {
      /**
       * FIXME:
       * tooltipとmenuを組み合わせると、右クリック時にcontextmenuイベントが発火しなくなった。
       * 代替策としてカスタムイベントを用いてMenuを閉じる実装にした。
       */
      const customEvent = new CustomEvent('cc-close-contextmenu', {
        detail: { target: event.target },
      })
      window.dispatchEvent(customEvent)
    },
  },
})
</script>

<style lang="scss" module>
.active {
  border: 3px solid #888;
}
</style>
