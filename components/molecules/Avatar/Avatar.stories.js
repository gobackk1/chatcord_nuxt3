import MolAvatar from './Avatar.vue'
import AtomImg from '../../atoms/Img/Img.vue'

export default {
  title: 'molecules/Avatar',
  component: MolAvatar,
  argTypes: {
    photoUrl: {
      description: '表示するプロフィール画像',
    },
    displayName: {
      description: 'ユーザーの表示名。alt属性値などに用いる',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'v-avatarのラッパーコンポーネント。ユーザーがプロフィール画像を使用していない場合、プレースホルダーアイコンを表示する。',
      },
    },
  },
}

const Template = (args) => ({
  components: { MolAvatar, AtomImg },
  setup() {
    return { args }
  },
  template:
    '<mol-avatar :photo-url="args.photoUrl" :display-name="args.displayName" />',
})

export const Default = Template.bind({})
Default.args = {
  photoUrl: '',
  displayName: 'test user',
}
Default.parameters = {
  docs: {
    source: {
      code: '<mol-avatar :photo-url="null" display-name="test user" />',
    },
  },
}

export const WithPhotoURL = Template.bind({})
WithPhotoURL.args = {
  photoUrl: '/images/avatar.png',
  displayName: 'test user',
}
WithPhotoURL.parameters = {
  docs: {
    source: {
      code: '<mol-avatar photo-url="/images/avatar.png" display-name="test user" />',
    },
  },
}
