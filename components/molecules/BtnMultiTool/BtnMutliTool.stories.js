import MolBtnMultiTool from './BtnMultiTool.vue'
import MolAvatar from '../Avatar/Avatar.vue'

export default {
  title: 'molecules/BtnMultiTool',
  component: MolBtnMultiTool,
  argTypes: {
    menu: {
      description:
        'コンテクストメニューに表示するラベルとクリックハンドラの組み合わせの配列',
    },
    displayName: {
      description: 'ユーザーの表示名。',
    },
    photoUrl: {
      description: '表示するプロフィール画像',
    },
    tooltipAttrs: {
      description:
        'コンポーネント内部のv-tooltipのProps, Attributesを指定できます。',
    },
    tooltipText: {
      description:
        'ツールチップに表示するテキスト。こちらを指定しなかった場合はdisplayNameが表示されます。',
    },
    menuAttrs: {
      description:
        'コンポーネント内部のv-menuのProps, Attributesを指定できます。',
    },
    to: {
      description: 'ボタンを押したときの遷移先を設定します。',
    },
    active: {
      description: '準備中',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `<pre>狭いサイドナビゲーションに配置するために、ツールチップ・メニュー・アバターなど多機能を詰め込んだボタンコンポーネント。<br>マウスホバーでツールチップが表示されます。<br>マウスの右クリックでメニューが表示されます。<br>マウスの左クリックでナビゲーションします。</pre>`,
      },
    },
  },
}

const Template = (args) => ({
  components: { MolAvatar, MolBtnMultiTool },
  setup() {
    return { args }
  },
  template: `
    <mol-btn-multi-tool
      :menu="args.menu"
      :displayName="args.displayName"
      :photoUrl="args.photoUrl"
      :tooltipAttrs="args.tooltipAttrs"
      :tooltipText="args.tooltipText"
      :menuAttrs="args.menuAttrs"
      :to="args.to"
      :active="args.active"
    />`,
})

export const Default = Template.bind({})
Default.args = {
  menu: ['menu1'],
  displayName: 'test user',
  photoUrl: '/images/avatar.png',
  to: '/path/to/root',
}
Default.parameters = {
  docs: {
    source: {
      code: '<mol-btn-multi-tool />',
    },
  },
}
