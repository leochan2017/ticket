/**
 * dev: 1
 * online: 4
 */
const count = window.location.host.indexOf('localhost') !== -1 ? 1 : 4

const data = {
  count,
  address1: '(A线)幸福誉3期,幸福誉1期,绿地',
  address2: '宏发',
  address3: '幸福誉',
  price: 13,
  personCount: 2,
  departTime1: '10:00',
  departTime2: '13:00'
}

export default data