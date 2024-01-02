// console.log('location.host', window.location.host)

/**
 * dev: 1
 * online: 4
 */
const count = window.location.host.indexOf('localhost') !== -1 ? 1 : 4

const defaultData = {
  count,
  title: '电子票',
  contact: '乘车联系人：13333333333',

  // left
  time: '16:45',
  depart: '123',
  destination: '321',

  // right
  time2: '20:45',
  depart2: '123',
  destination2: '321'
}

let locData = localStorage.getItem('CHUANG_XIANG')
if (locData) {
  locData = JSON.parse(locData)
  console.log('locData CHUANG_XIANG', locData)
  for (const key in locData) {
    // Date is unnecessary if you want to set today for value with automatic
    if (key !== 'date') {
      defaultData[key] = locData[key]
    }
  }
}

export default defaultData