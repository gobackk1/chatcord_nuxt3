import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import BtnMultiTool from './BtnMultiTool.vue'
import ResizeObserver from 'resize-observer-polyfill'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: { template: 'test template' } },
  { path: '/path/to/root', component: { template: 'test template' } },
]

describe('UIコンポーネントのテスト', () => {
  let vuetify = createVuetify()
  let router = createRouter({
    history: createWebHistory(),
    routes,
  })
  beforeAll(() => {
    vi.stubGlobal('ResizeObserver', ResizeObserver)
  })
  beforeEach(() => {
    vuetify = createVuetify()
    router = createRouter({
      history: createWebHistory(),
      routes,
    })
  })
  describe('ViewModelのテスト', () => {
    describe('ブラックボックステスト', () => {
      describe('同値・境界値テスト', () => {
        describe('menu', () => {
          it.concurrent('メニューに３つのタイトルが表示されること', () => {
            const wrapper = mount(BtnMultiTool, {
              props: {
                menu: ['title1', 'title2', 'title3'],
                displayName: 'test user',
              },
              global: {
                plugins: [vuetify],
              },
              attachTo: document.body,
            })
            expect(wrapper.element.parentElement?.innerHTML).toContain('title1')
            expect(wrapper.element.parentElement?.innerHTML).toContain('title2')
            expect(wrapper.element.parentElement?.innerHTML).toContain('title3')
            expect(wrapper.element.parentElement).toMatchSnapshot()
            wrapper.unmount()
          })
        })
        describe('displayName', () => {
          it.concurrent(
            'test userを指定した場合、ツールチップテキストに「test user」が表示されること',
            () => {
              const wrapper = mount(BtnMultiTool, {
                props: {
                  menu: ['title1', 'title2', 'title3'],
                  displayName: 'test user',
                },
                global: {
                  plugins: [vuetify],
                },
                attachTo: document.body,
              })
              const body = wrapper.element.parentElement
              expect(body?.querySelector('.v-tooltip')?.textContent).toBe(
                'test user'
              )
              expect(wrapper.element.parentElement).toMatchSnapshot()
              wrapper.unmount()
            }
          )
        })
        describe('photoUrl', () => {
          // NOTE: outlinedのデザインは検討中なのでテストしない
          describe('「/path/to/image.png」を指定した場合', () => {
            const wrapper = mount(BtnMultiTool, {
              props: {
                menu: ['title1', 'title2', 'title3'],
                displayName: 'test user',
                photoUrl: '/path/to/image.png',
              },
              global: {
                plugins: [vuetify],
              },
              attachTo: document.body,
            })
            it.concurrent(
              'imgタグのsrcに「/path/to/image.png」が表示されること',
              () => {
                expect(wrapper.find('img').attributes().src).toBe(
                  '/path/to/image.png'
                )
                expect(wrapper.element.parentElement).toMatchSnapshot()
                wrapper.unmount()
              }
            )
          })
        })
        describe.skip('tooltipAttrs', () => {
          // NOTE: tooltipAttrsはpropsをバケツリレーしているだけなので、TSの型チェックで担保する
        })
        describe.skip('menuAttrs', () => {
          // NOTE: menuAttrsははpropsをバケツリレーしているだけなので、TSの型チェックで担保する
        })
        describe('tooltipText', () => {
          // NOTE: outlinedのデザインは検討中なのでテストしない
          describe('「test text」を指定した場合', () => {
            const wrapper = mount(BtnMultiTool, {
              props: {
                menu: ['title1', 'title2', 'title3'],
                displayName: 'test user',
                tooltipText: 'test text',
              },
              global: {
                plugins: [vuetify],
              },
              attachTo: document.body,
            })
            it.concurrent(
              'ツールチップテキストに「test text」が表示されること',
              () => {
                const body = wrapper.element.parentElement
                expect(body?.querySelector('.v-tooltip')?.textContent).toBe(
                  'test text'
                )
                expect(wrapper.element.parentElement).toMatchSnapshot()
                wrapper.unmount()
              }
            )
          })
        })
        describe('to', () => {
          // NOTE: outlinedのデザインは検討中なのでテストしない
          describe('「/path/to/root」を指定した場合', () => {
            const wrapper = mount(BtnMultiTool, {
              props: {
                menu: ['title1', 'title2', 'title3'],
                displayName: 'test user',
                to: '/path/to/root',
              },
              global: {
                plugins: [vuetify, router],
              },
              attachTo: document.body,
            })
            it.concurrent(
              'ツールチップテキストに「test text」が表示されること',
              () => {
                expect(wrapper.find('a').attributes().href).toBe(
                  '/path/to/root'
                )
                expect(wrapper.element.parentElement).toMatchSnapshot()
                wrapper.unmount()
              }
            )
          })
        })
        describe.skip('active', () => {
          // TODO: activeのテスト
        })
      })
      describe('組み合わせテスト', () => {
        describe('displayNameとtooltipText', () => {
          it.concurrent(
            'tooltipTextを渡されたとき、displayNameでなくtooltipTextをツールチップに表示すること',
            () => {
              const wrapper = mount(BtnMultiTool, {
                props: {
                  menu: ['title1', 'title2', 'title3'],
                  displayName: 'test user',
                  tooltipText: 'test text',
                },
                global: {
                  plugins: [vuetify],
                },
                attachTo: document.body,
              })
              const body = wrapper.element.parentElement
              expect(body?.querySelector('.v-tooltip')?.textContent).toBe(
                'test text'
              )
              expect(wrapper.element.parentElement).toMatchSnapshot()
              wrapper.unmount()
            }
          )
          it.concurrent(
            'tooltipTextを渡されなかったとき、displayNameをツールチップに表示すること',
            () => {
              const wrapper = mount(BtnMultiTool, {
                props: {
                  menu: ['title1', 'title2', 'title3'],
                  displayName: 'test user',
                },
                global: {
                  plugins: [vuetify],
                },
                attachTo: document.body,
              })
              const body = wrapper.element.parentElement
              expect(body?.querySelector('.v-tooltip')?.textContent).toBe(
                'test user'
              )
              expect(wrapper.element.parentElement).toMatchSnapshot()
              wrapper.unmount()
            }
          )
        })
        // TODO: describe('画面上にBtnMultiToolが２つ存在するときのメニューの制御')
      })
      describe('イベント', () => {
        describe('clickMenuItem', () => {
          it.concurrent(
            'メニューをクリックしたときに、イベントをemitすること',
            () => {
              const wrapper = mount(BtnMultiTool, {
                props: {
                  menu: ['title1', 'title2', 'title3'],
                  displayName: 'test user',
                },
                global: {
                  plugins: [vuetify],
                },
                attachTo: document.body,
              })
              const menuItems =
                wrapper.element.parentElement?.querySelectorAll<HTMLElement>(
                  '.v-list-item--link'
                )
              menuItems![0]?.click()
              menuItems![1]?.click()
              menuItems![2]?.click()
              expect(wrapper.emitted().clickMenuItem![0]).toStrictEqual([
                'title1',
                0,
              ])
              expect(wrapper.emitted().clickMenuItem![1]).toStrictEqual([
                'title2',
                1,
              ])
              expect(wrapper.emitted().clickMenuItem![2]).toStrictEqual([
                'title3',
                2,
              ])
              wrapper.unmount()
            }
          )
        })
      })
    })
  })
})
