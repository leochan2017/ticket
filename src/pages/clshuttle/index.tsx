import { useEffect, useState } from 'react'
import defaultData from './data'
import '../shuttle/index.css'
import { EType } from '../hidden'
import moment from 'moment'
import { generateRandomNumber } from '../../utils'
const cls = 'shuttle-page'
const urlPre = 'http://gzjhqc.vip/'

interface IVerbData {
  depart: string
  destination: string
  adultPrice: number
  childrenPrice: number
  priceUnit: string
  adultCount: number
  childrenCount: number
  seatStr: string
  departTime: string
  needHelp: string
  rule: string
  carno: string
}

enum EVerbForm {
  'depart' = 'depart',
  'destination' = 'destination',
  'date' = 'date',
  'adultCount' = 'adultCount',
  'childrenCount' = 'childrenCount',
  'seatStr' = 'seatStr',
  'departTime' = 'departTime',
  'adultPrice' = 'adultPrice',
  'childrenPrice' = 'childrenPrice',
  'needHelp' = 'needHelp',
  'rule' = 'rule',
  'carno' = 'carno'
}

export interface IProps {
  pageType: EType
}

const generateAdSrc = () => `${urlPre}/sell/img/guanggao${generateRandomNumber(1, 2)}.jpg`

const generateSeatStr = (count: number) => {
  const seatArr: string[] = []

  // 两个人的时候，生成联排座位吧，这样比较真实一点
  if (count === 2) {
    const row = generateRandomNumber(5, 12)
    const seat = generateRandomNumber(1, 3)
    seatArr.push(`${row}排${seat}座`)
    seatArr.push(`${row}排${seat + 1}座`)
  } else if (count === 3) { // 3人也生成联排+前面一位
    const row = generateRandomNumber(5, 12)
    const seat = generateRandomNumber(1, 3)
    seatArr.push(`${row}排${seat}座`)
    seatArr.push(`${row}排${seat + 1}座`)
    seatArr.push(`${row - 1}排${seat}座`)
  } else {
    // 其他普通情况
    for (let i = 0; i < count; i++) {
      let str = `${generateRandomNumber(5, 12)}排${generateRandomNumber(1, 4)}座`

      // 如果座位已经有了, 再生成一次吧，总不会再重复一次吧
      if (seatArr.includes(str)) {
        str = `${generateRandomNumber(5, 12)}排${generateRandomNumber(1, 4)}座`
      }

      seatArr.push(str)
    }
  }

  return seatArr.join(',')
}

function CLshuttlePage(props: IProps) {
  // console.log('CLshuttlePage', props)
  document.title = '订单查看'
  setTimeout(() => {
    document.title = '订单查看'
  }, 3000)

  const [showInput, setShowInput] = useState<EVerbForm | null>(null)
  const [verbData, setVerbData] = useState<IVerbData>(props.pageType === EType.leftCenter ? {
    departTime: defaultData.departTime1,
    depart: defaultData.depart1,
    destination: defaultData.destination1,
    adultPrice: defaultData.adultPrice,
    childrenPrice: defaultData.childrenPrice,
    priceUnit: defaultData.priceUnit,
    adultCount: defaultData.adultCount,
    childrenCount: defaultData.childrenCount,
    seatStr: generateSeatStr(defaultData.adultCount),
    needHelp: defaultData.needHelp,
    rule: defaultData.rule,
    carno: defaultData.carno
  } : {
    departTime: defaultData.departTime2,
    depart: defaultData.depart2,
    destination: defaultData.destination2,
    adultPrice: defaultData.adultPrice,
    childrenPrice: defaultData.childrenPrice,
    priceUnit: defaultData.priceUnit,
    adultCount: defaultData.adultCount,
    childrenCount: defaultData.childrenCount,
    seatStr: generateSeatStr(defaultData.adultCount),
    needHelp: defaultData.needHelp,
    rule: defaultData.rule,
    carno: defaultData.carno
  })
  
  const [carLocationDisplay, setCarLocationDisplay] = useState<Boolean>(true)
  const changeCarLocationDisplay = () => {
    setCarLocationDisplay(!carLocationDisplay)
  }

  const handleVerbFormClick = (key: EVerbForm) => {
    setShowInput(key)
  }

  const updateFormData = (key: EVerbForm, val: any) => {
    const d = JSON.parse(JSON.stringify(verbData))
    d[key] = val
    setVerbData(d)
    setShowInput(null)

    let locDataObj: any = {}
    const locDataStr = localStorage.getItem('CLSHUTTLE')
    if (locDataStr) locDataObj = JSON.parse(locDataStr)
    if (props.pageType === EType.leftCenter) {
      locDataObj.departTime1 = d.departTime
      locDataObj.depart1 = d.depart
      locDataObj.destination1 = d.destination
      locDataObj.price = d.price
      locDataObj.carno = d.carno
      locDataObj.needHelp = d.needHelp
      locDataObj.rule = d.rule
    } else if (props.pageType === EType.rightCenter) {
      locDataObj.departTime2 = d.departTime
      locDataObj.depart2 = d.depart
      locDataObj.destination2 = d.destination
      locDataObj.price = d.price
      locDataObj.carno = d.carno
      locDataObj.needHelp = d.needHelp
      locDataObj.rule = d.rule
    }

    if (JSON.stringify(locDataObj) !== '{}') {
      localStorage.setItem('CLSHUTTLE', JSON.stringify(locDataObj))
    }
  }

  useEffect(() => {
    updateFormData(EVerbForm.seatStr, generateSeatStr(verbData.adultCount + verbData.childrenCount))
  }, [verbData.adultCount, verbData.childrenCount])

  return <div className={cls}>
    <div className="content">
      <div className="main">

        {/* 广告 */}
        <div style={{ width: '100%', height: '20em', marginBottom: '20px', textAlign: 'center' }} onClick={() => setShowInput(null)}>
          <img id="imageId" alt="" src={generateAdSrc()} style={{ height: '20em' }} />
        </div>

        {/* 出发地 */}
        <div className="main_header" onClick={() => handleVerbFormClick(EVerbForm.depart)}>
          <span style={{ float: 'left', marginLeft: '10px', fontSize: '26px' }}>
            {showInput === EVerbForm.depart ?
              <input
                type="text"
                defaultValue={verbData.depart}
                onBlur={e => updateFormData(EVerbForm.depart, e.target.value)}
              /> : verbData.depart
            }
          </span>
        </div>

        <div className="main_header2" onClick={() => changeCarLocationDisplay()}>
          <img alt="" src={`${urlPre}/sell/img/carlogo.png`} />
        </div>

        {/* 目的地 */}
        <div className="main_header2" onClick={() => handleVerbFormClick(EVerbForm.destination)}>
          <span style={{ float: 'right', marginRight: '10px', fontSize: '26px' }}>
            {showInput === EVerbForm.destination ?
              <input
                type="text"
                defaultValue={verbData.destination}
                onBlur={e => updateFormData(EVerbForm.destination, e.target.value)}
              /> : verbData.destination
            }
          </span>
        </div>

        <div className="main_info">
          <table>
            <tbody>
              <tr>
                <td className="tableleft">乘客姓名：</td>
                <td>金先生</td>
              </tr>
              <tr>
                <td className="tableleft">手&nbsp;&nbsp;机&nbsp;&nbsp;号：</td>
                <td>139****5293</td>
              </tr>
              <tr>
                <td className="tableleft">乘车日期：</td>
                <td className="tableright">
                  {moment().format('YYYY-MM-DD')}&nbsp;
                  <span onClick={() => handleVerbFormClick(EVerbForm.departTime)}>
                    {showInput === EVerbForm.departTime ?
                      <input
                        type="text"
                        defaultValue={verbData.departTime}
                        onBlur={e => updateFormData(EVerbForm.departTime, e.target.value)}
                      /> : verbData.departTime
                    }
                  </span>
                </td>
              </tr>

              {carLocationDisplay && <>
                <tr onClick={() => handleVerbFormClick(EVerbForm.carno)}>
                  <td className="tableleft">车牌号码：</td>
                  <td>
                    {showInput === EVerbForm.carno ?
                      <input
                        type="text"
                        defaultValue={verbData.carno}
                        onBlur={e => updateFormData(EVerbForm.carno, e.target.value)}
                      /> : <span className="fontblue">{verbData.carno}</span>
                    }
                  </td>
                </tr>

                <tr>
                  <td className="tableleft">车辆位置：</td>
                  <td>
                    <span className="fontblue" style={{ fontSize: 16, fontWeight: 'bold' }}>点击查看车定位</span>
                  </td>
                </tr>
              </>}

              <tr>
                <td className="tableleft">预订时间：</td>
                <td>{moment(new Date().getTime() - 2333333).format('YYYY-MM-DD HH:mm:ss')}</td>
              </tr>

              {/* 点击"乘客人数"，切换儿童1或者0
              点击"人数"，随机成人数量
              点击"儿童数量"，随机儿童数量 */}
              <tr>
                <td className="tableleft" onClick={() => {
                  const num = verbData.childrenCount > 0 ? 0 : 1
                  updateFormData(EVerbForm.childrenCount, num)
                }}>乘客人数：</td>

                <td className="tableright">
                  <span onClick={() => {
                    let num = generateRandomNumber(1, 3)
                    if (num === verbData.adultCount) {
                      num = generateRandomNumber(1, 3)
                    }
                    updateFormData(EVerbForm.adultCount, num)
                  }}>{verbData.childrenCount > 0 ? verbData.adultCount + verbData.childrenCount : verbData.adultCount}人</span>

                  {verbData.childrenCount > 0 &&
                    <>
                      &nbsp;&nbsp;<span onClick={() => {
                        let num = generateRandomNumber(1, 3)
                        if (num === verbData.childrenCount) {
                          num = generateRandomNumber(1, 3)
                        }
                        updateFormData(EVerbForm.childrenCount, num)
                      }}>{verbData.childrenCount && `(儿童${verbData.childrenCount}人)`}</span>
                    </>
                  }
                </td>
              </tr>

              <tr onClick={() => handleVerbFormClick(EVerbForm.adultPrice)}>
                <td className="tableleft">{verbData.childrenCount > 0 ? '成人票价：' : '单价：'}</td>
                <td>
                  {showInput === EVerbForm.adultPrice ?
                    <input
                      type="text"
                      defaultValue={verbData.adultPrice}
                      onBlur={e => updateFormData(EVerbForm.adultPrice, e.target.value)}
                    /> : verbData.adultPrice
                  }
                  {verbData.childrenCount > 0 ? <>
                    {verbData.priceUnit} * {verbData.adultCount}
                  </> : <>
                    {verbData.priceUnit}
                  </>}
                </td>
              </tr>

              {verbData.childrenCount > 0 &&
                <tr onClick={() => handleVerbFormClick(EVerbForm.childrenPrice)}>
                  <td className="tableleft">儿童票价：</td>
                  <td>
                    {showInput === EVerbForm.childrenPrice ?
                      <input
                        type="text"
                        defaultValue={verbData.childrenPrice}
                        onBlur={e => updateFormData(EVerbForm.childrenPrice, e.target.value)}
                      /> : verbData.childrenPrice
                    }
                    {verbData.priceUnit} * {verbData.childrenCount}
                  </td>
                </tr>
              }

              <tr>
                <td className="tableleft">{verbData.childrenCount > 0 ? '合计金额：' : '金额：'}</td>
                <td>{verbData.adultPrice * verbData.adultCount + (verbData.childrenPrice * verbData.childrenCount)}{verbData.priceUnit}</td>
              </tr>

              <tr onClick={() => updateFormData(EVerbForm.seatStr, generateSeatStr(verbData.adultCount + verbData.childrenCount))}>
                <td className="tableleft">已选座位：</td>
                <td className="tableright">{verbData.seatStr}</td>
              </tr>

              <tr>
                <td className="tableleft">备&nbsp;&nbsp;&nbsp;注：</td>
                <td> 微信支付</td>
              </tr>

              <tr onClick={() => handleVerbFormClick(EVerbForm.rule)}>
                <td className="tableleft">退改规则：</td>
                <td>
                  {showInput === EVerbForm.rule ?
                    <input
                      type="text"
                      defaultValue={verbData.rule}
                      onBlur={e => updateFormData(EVerbForm.rule, e.target.value)}
                    /> : verbData.rule
                  }
                </td>
              </tr>

              <tr onClick={() => handleVerbFormClick(EVerbForm.needHelp)}>
                <td className="tableleft">如需帮助：</td>
                <td>
                  {showInput === EVerbForm.needHelp ?
                    <input
                      type="text"
                      defaultValue={verbData.needHelp}
                      onBlur={e => updateFormData(EVerbForm.needHelp, e.target.value)}
                    /> : verbData.needHelp
                  }
                </td>
              </tr>

            </tbody>
          </table>
        </div>



      </div>
    </div>
  </div>
}

export default CLshuttlePage