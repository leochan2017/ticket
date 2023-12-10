/**
 * dev: 1
 * online: 4
 */
const count = window.location.host.indexOf('localhost') !== -1 ? 1 : 4

const data = {
  count,
  
  adultPrice: 22,
  childrenPrice: 11,

  priceUnit: '元',
  
  adultCount: 2,
  childrenCount: 1,

  departTime1: '7:02',
  depart1: '幸福悦3/5期',
  destination1: '广州南站P8停车场',

  departTime2: '19:02',
  depart2: '广州南站P8停车场',
  destination2: '幸福悦3/5期',

  needHelp: '客服：13763305584(客服号),18664606665(小罗)(微信同号)',
  rule: '仅支持在发车前半小时以上退票'
}

let locData = localStorage.getItem('CLSHUTTLE')
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