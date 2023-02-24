import { shallowMount } from '@vue/test-utils'
import AtomImg from './Img.vue'

describe('UIコンポーネントのテスト', () => {
  describe('Viewのテスト', () => {
    describe('回帰テスト', () => {
      it('スナップショットテスト', () => {
        const wrapper = shallowMount(AtomImg, {
          props: {
            src: '/sample.jpg',
          },
        })
        expect(wrapper.element).toMatchSnapshot()
      })
    })
  })
})
