/**
 * dev: 1
 * online: 4
 */
const count = window.location.host.indexOf('localhost') !== -1 ? 1 : 4

const data = {
  count,
  price: 13,
  priceUnit: '元',
  personCount: 3,

  departTime1: '9:00',
  depart1: '幸福悦3/5期',
  destination1: '宏发',

  departTime2: '15:00',
  depart2: '宏发',
  destination2: '幸福悦3/5期',

  carno: '粤A21235D',
  needHelp: '客服：18664606665(小罗),13602227701(小陆)(微信同号)',
  rule: '仅支持在发车前半小时以上退票'
}

let locData = localStorage.getItem('SHUTTLE')
if (locData) {
  locData = JSON.parse(locData)
  console.log('locData SHUTTLE', locData)
  for (const key in locData) {
    // Those key is unnecessary if you want to set those values with automatic
    if (!['priceUnit', 'personCount'].includes(key)) {
      data[key] = locData[key]
    }
  }
}

export default data