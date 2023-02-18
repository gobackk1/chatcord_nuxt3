import MolFieldEmail from './FieldEmail.vue'
import { ref } from 'vue'

export default {
  title: 'molecules/FieldEmail',
  component: MolFieldEmail,
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component:
          'v-text-fieldをメールアドレス入力用にラップしたコンポーネント。元バージョンのStorybookはVue3のv-modelに対応していない。',
      },
    },
  },
}

const Template = (args) => ({
  components: { MolFieldEmail },
  setup() {
    return { args }
  },
  // FIXME: v-modelを使っても、ViewとViewModelがバインドされない
  template: '<mol-field-email v-model="args.modelValue" />',
})

const defaultSource = {
  docs: {
    source: {
      code: '<mol-field-email v-model="value" />',
    },
  },
}

export const Default = Template.bind({})
Default.args = {
  modelValue: '',
}
Default.parameters = defaultSource

/**
 * NOTE:
 * バリデーションエラーを表示させるために、mountedフックでmodelを更新している
 */

export const ValidEmailAddress = () => ({
  components: { MolFieldEmail },
  setup() {
    const model = ref('a')
    const updateModel = (event) => (model.value = event)
    return { model, updateModel }
  },
  mounted() {
    this.model = 'this-is.valid@example.com'
  },
  template:
    '<mol-field-email :model-value="model" @update:model-value="updateModel" />',
})
ValidEmailAddress.parameters = defaultSource

export const WithEmptyValue = () => ({
  components: { MolFieldEmail },
  setup() {
    const model = ref('a')
    const updateModel = (event) => (model.value = event)
    return { model, updateModel }
  },
  mounted() {
    this.model = ''
  },
  template:
    '<mol-field-email :model-value="model" @update:model-value="updateModel" />',
})
WithEmptyValue.parameters = defaultSource

export const ExceededMaxLength = () => ({
  components: { MolFieldEmail },
  setup() {
    const model = ref('')
    const updateModel = (event) => (model.value = event)
    return { model, updateModel }
  },
  mounted() {
    this.model = 'too.loooooooooooong@example.com'
  },
  template:
    '<mol-field-email :model-value="model" @update:model-value="updateModel" />',
})
ExceededMaxLength.parameters = defaultSource

export const InvalidEmailAddress = () => ({
  components: { MolFieldEmail },
  setup() {
    const model = ref('')
    const updateModel = (event) => (model.value = event)
    return { model, updateModel }
  },
  mounted() {
    this.model = 'this is invalid mail address'
  },
  template:
    '<mol-field-email :model-value="model" @update:model-value="updateModel" />',
})
InvalidEmailAddress.parameters = defaultSource
