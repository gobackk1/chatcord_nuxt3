import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import Avatar from './Avatar.vue'

describe('UIコンポーネントのテスト', () => {
  let vuetify = createVuetify()
  beforeEach(() => {
    vuetify = createVuetify()
  })
  describe('ViewModelのテスト', () => {
    describe('ブラックボックステスト', () => {
      describe('同値・境界値テスト', () => {
        describe('displayName', () => {
          describe('有効同値', () => {
            describe('displayNameに「test user」と入力した場合', () => {
              it('デフォルトのアイコンを表示すること', () => {
                const wrapper = mount(Avatar, {
                  props: {
                    displayName: 'test user',
                  },
                  global: {
                    plugins: [vuetify],
                  },
                })
                expect(wrapper.find('i').classes()).toContain(
                  'mdi-account-circle'
                )
                expect(wrapper.html()).toMatchSnapshot()
              })
            })
          })
        })
        describe('photUrl, displayName', () => {
          describe('有効同値', () => {
            describe('photoUrlに「/path/to/photo.png」、displayNameに「test user」と入力した場合', () => {
              it('imgタグが描画されること', () => {
                const wrapper = mount(Avatar, {
                  props: {
                    displayName: 'test user',
                    photoUrl: '/path/to/photo.png',
                  },
                  global: {
                    plugins: [vuetify],
                  },
                })
                expect(wrapper.find('img').attributes().alt).toBe(
                  'test userのアバター画像'
                )
                expect(wrapper.find('img').attributes().src).toBe(
                  '/path/to/photo.png'
                )
                expect(wrapper.html()).toMatchSnapshot()
              })
            })
          })
        })
      })
    })
  })
})
