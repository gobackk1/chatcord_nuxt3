import { shallowMount } from '@vue/test-utils'
import Time from './Time.vue'

describe('_Cc_Timeコンポーネントのテスト', () => {
  beforeAll(() => {
    vi.mock('moment', async () => {
      const moment = await vi.importActual('moment')
      return moment
    })
  })
  describe('ViewModelのテスト', () => {
    describe('ブラックボックステスト', () => {
      describe('同値・境界値テスト', () => {
        describe('unixTime prop', () => {
          describe('有効同値', () => {
            it('1675177200を入力した場合「2023年02月01日(水) 00:00」と表示すること', async () => {
              const wrapper = shallowMount(Time, {
                props: {
                  unixTime: 1675177200,
                },
              })
              expect(wrapper.html()).toContain('2023年02月01日(水) 00:00')
              expect(wrapper.html()).toMatchSnapshot()
            })
          })
          describe.skip('無効同値', () => {
            // NOTE: 無効同値は境界値テストとTypescriptの静的解析で担保とする
          })
          describe('境界値のテスト', () => {
            it('0を入力した場合「1970年01月01日(木) 09:00」と表示すること', () => {
              const wrapper = shallowMount(Time, {
                props: {
                  unixTime: 0,
                },
              })
              expect(wrapper.html()).toContain('1970年01月01日(木) 09:00')
              expect(wrapper.html()).toMatchSnapshot()
            })
            it('-1を入力した場合、コンソールエラーが発生すること', () => {
              const consoleSpy = vi
                .spyOn(console, 'warn')
                .mockImplementation(() => ({}))
              shallowMount(Time, {
                props: {
                  unixTime: -1,
                },
              })
              expect(consoleSpy).toHaveBeenCalled()
            })
            it('7258086000を入力した場合「2200年01月01日(水) 00:00」と表示すること', () => {
              const wrapper = shallowMount(Time, {
                props: {
                  unixTime: 7258086000,
                },
              })
              expect(wrapper.html()).toContain('2200年01月01日(水) 00:00')
              expect(wrapper.html()).toMatchSnapshot()
            })
            it('7258086001を入力した場合コンソールエラーが発生すること', () => {
              const consoleSpy = vi
                .spyOn(console, 'warn')
                .mockImplementation(() => ({}))
              shallowMount(Time, {
                props: {
                  unixTime: 7258086001,
                },
              })
              expect(consoleSpy).toHaveBeenCalled()
            })
          })
        })
        describe('formattedTime prop', () => {
          describe('有効同値', () => {
            // NOTE: 有効同値をうまく整理できないかつAPIはライブラリ側でテストすると考えられるので
            // プロダクト側で良く使うフォーマットを有効同値としてテストする
            it('MM月DD日(ddd) HH:mm を入力した場合「02月01日(水) 00:00」と表示すること', () => {
              const wrapper = shallowMount(Time, {
                props: {
                  unixTime: 1675177200,
                  format: 'MM月DD日(ddd) HH:mm',
                },
              })
              expect(wrapper.html()).toContain('02月01日(水) 00:00')
              expect(wrapper.html()).toMatchSnapshot()
            })
          })
          describe.skip('無効同値', () => {
            // NOTE: 無効同値はライブラリ側テストとTypescriptの静的解析で担保とする
          })
        })
      })
      describe.skip('組み合わせテスト', () => {
        // NOTE: propsの組み合わせが少なく、最低限の組み合わせは同値・境界値でテストしているので、組み合わせテストはしない
      })
    })
  })
  describe('Viewのテスト', () => {
    describe.skip('UIインタラクションテスト', () => {
      // NOTE: このコンポーネントはUIインタラクションを持たないのでテストしない
    })
    describe.skip('探索的テスト', () => {
      // TODO: 探索的テスト方針を定める
    })
  })
})
