import AtomImg from './Img.vue'

export default {
  /* ð The title prop is optional.
   * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'atoms/Img',
  component: AtomImg,
  argTypes: {
    src: {
      description: '<img />è¦ç´ ã®srcã¨åã',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '<img />è¦ç´ ã®ã©ããã¼ã³ã³ãã¼ãã³ããéä¿¡ç»åæé©åã®ã­ã¸ãã¯ã¯ãã®ã³ã³ãã¼ãã³ãã«å®è£ããã',
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
