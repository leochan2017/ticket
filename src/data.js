// console.log('location.host', window.location.host)

/**
 * dev: 1
 * online: 4
 */
const count = window.location.host.indexOf('localhost') !== -1 ? 1 : 4

const defaultData = {
  count,
  title: '电子票',
  contact: '乘车联系人：13892648765',

  // left
  time: '16:45',
  depart: '宝安中心地铁站D口旁边公交站',
  destination: '双岗地铁站(黄埔区)',

  // right
  time2: '20:45',
  depart2: '黄村地铁站D口出来马路边',
  destination2: '宝安中心地铁站(宝安区)'
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