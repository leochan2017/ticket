/**
 * dev: 1
 * online: 4
 */
const count = window.location.host.indexOf('localhost') !== -1 ? 1 : 4

const data = {
  count,
  
  adultPrice: 999,
  childrenPrice: 888,

  priceUnit: '元',
  
  adultCount: 2,
  childrenCount: 1,

  departTime1: '7:02',
  depart1: '123',
  destination1: '321',

  departTime2: '19:02',
  depart2: '123',
  destination2: '321',

  needHelp: '客服：88888888',
  rule: '仅支持在发车前半小时以上退票',

  carno: '京8888'
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