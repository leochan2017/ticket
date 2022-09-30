/**
 * dev: 1
 * online: 4
 */
const count = window.location.host.indexOf('localhost') !== -1 ? 1 : 4

const data = {
  count,
  address1: '(A线)幸福悦3/5期',
  address2: '宏发',
  address3: '幸福悦3/5期',
  price: 10,
  priceUnit: '元',
  personCount: 3,
  departTime1: '10:00',
  departTime2: '14:00'
}

export default data