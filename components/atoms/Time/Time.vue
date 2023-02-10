<template>
  <time v-if="check" :datetime="datetime">{{ formattedTime }} </time>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import moment from 'moment'

const MACHINE_READABLE_DATE_FORMAT = 'YYYY-MM-DDTHH:mm'

export default defineComponent({
  name: 'AtomsTime',
  props: {
    format: {
      type: String,
      default: 'YYYY年MM月DD日(ddd) HH:mm',
    },
    check: {
      type: Boolean,
      default: true,
    },
    unixTime: {
      type: Number,
      required: true,
      validator(value: number) {
        /**
         * NOTE: 1970年01月01日(木) 09:00 から 2200年01月01日(水) 00:00 を入力の境界値とする。
         * momentは極めて大きい・小さいUNIX時間（9999999999999など）を入力すると「Invalid date」を出力する。
         * つまり、validation errorが発生した場合は、このコンポーネントがHTMLの仕様に準拠しない可能性があることを意味する
         */
        if (value >= 0 && value <= 7258086000) {
          return true
        } else {
          return false
        }
      },
    },
  },
  computed: {
    datetime(): string {
      /**
       * NOTE: テキストノードで（曜日）などの日本文化圏独特の表記をするために、
       * datetime属性値はmachine-readableな形式で入力する
       */
      return moment.unix(this.unixTime).format(MACHINE_READABLE_DATE_FORMAT)
    },
    formattedTime(): string {
      return moment.unix(this.unixTime).format(this.format)
    },
  },
})
</script>
