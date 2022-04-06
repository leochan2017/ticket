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
  time: '15:55',
  depart: '宝安中心地铁站D口旁边公交站',
  destination: '车陂南地铁站(天河区)',

  // right
  time2: '19:10',
  depart2: '苏元地铁站B口出右后方30米路口边',
  destination2: '宝安中心地铁站(宝安区)'
}

export default defaultData