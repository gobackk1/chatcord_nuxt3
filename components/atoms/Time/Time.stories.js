import AtomTime from './Time.vue'

export default {
  title: 'atoms/Time',
  component: AtomTime,
  argTypes: {
    unixTime: {
      description:
        '表示する日時のUNIX時間。0未満、7258086000より大きい入力値の動作は保証しない。',
    },
    format: {
      description:
        '日時のフォーマットを指定する。https://momentjs.com/docs/#/parsing/string-format/',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'UNIX時間をヒューマンリーダブルな時間形式へ変換するコンポーネント。\nMoment.jsを利用している。https://momentjs.com/',
      },
    },
  },
}

const Template = (args) => ({
  components: { AtomTime },
  setup() {
    return { args }
  },
  template: '<atom-time :unix-time="args.unixTime" :format="args.format" />',
})

export const Default = Template.bind({})
Default.args = {
  unixTime: 1675177200,
}
Default.parameters = {
  docs: {
    source: {
      code: '<atom-time :unix-time="1675177200" />',
    },
  },
}

export const WithFormat = Template.bind({})
WithFormat.args = {
  unixTime: 1675177200,
  format: 'MM月DD日(ddd) HH:mm',
}
WithFormat.parameters = {
  docs: {
    source: {
      code: '<atom-time :unix-time="1675177200" format="MM月DD日(ddd) HH:mm" />',
    },
  },
}

export const WithValidationError = Template.bind({})
WithValidationError.args = {
  unixTime: 999999999999999,
}
WithValidationError.parameters = {
  docs: {
    description: {
      story:
        '大きすぎる値を入力すると、invalid dateと表示される。props validatorの返り値によってはコンソールにエラーが表示される。',
    },
    source: {
      code: '<cc-time :unix-time="999999999999999" />',
    },
  },
}
