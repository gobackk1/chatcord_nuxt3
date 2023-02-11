import moment from 'moment'

export const setup = (): void => {
  moment.locale('ja', {
    weekdays: [
      '日曜日',
      '月曜日',
      '火曜日',
      '水曜日',
      '木曜日',
      '金曜日',
      '土曜日',
    ],
    weekdaysShort: ['日', '月', '火', '水', '木', '金', '土'],
  })
}
