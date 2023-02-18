import AtomImg from './Img.vue'

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'atoms/Img',
  component: AtomImg,
  argTypes: {
    src: {
      description: '<img />要素のsrcと同じ',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '<img />要素のラッパーコンポーネント。配信画像最適化のロジックはこのコンポーネントに実装する。',
      },
    },
  },
}

const Template = (args) => ({
  components: { AtomImg },
  setup() {
    return { args }
  },
  template: '<atom-img :src="args.src" />',
})

export const Default = Template.bind({})
Default.args = {
  src: '/images/bg.jpg',
}
Default.parameters = {
  docs: {
    source: {
      code: '<atom-img src="/images/bg.jpg" />',
    },
  },
}
