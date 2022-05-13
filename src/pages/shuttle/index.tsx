import { useEffect, useState } from 'react'
import defaultData from './data'
import './index.css'
import { EType } from '../hidden'
import moment from 'moment'
import { generateRandomNumber } from '../../utils'
const cls = 'shuttle-page'
const urlPre = 'http://gzjhqc.vip/'

interface IVerbData {
  depart: string
  destination: string
  price: number
  personCount: number
  seatStr: string
  departTime: string
}

enum EVerbForm {
  'depart' = 'depart',
  'destination' = 'destination',
  'date' = 'date',
  'personCount' = 'personCount',
  'seatStr' = 'seatStr',
  'departTime' = 'departTime'
}

export interface IProps {
  pageType: EType
}

const generateAdSrc = () => `${urlPre}/sell/img/guanggao${generateRandomNumber(1, 2)}.jpg`

const generateSeatStr = (personCount: number) => {
  const seatArr: string[] = []

  // 两个人的时候，生成联排座位吧，这样比较真实一点
  if (personCount === 2) {
    const row = generateRandomNumber(5, 12)
    const seat = generateRandomNumber(1, 3)
    seatArr.push(`${row}排${seat}座`)
    seatArr.push(`${row}排${seat + 1}座`)
  } else if (personCount === 3) { // 3人也生成联排+前面一位
    const row = generateRandomNumber(5, 12)
    const seat = generateRandomNumber(1, 3)
    seatArr.push(`${row}排${seat}座`)
    seatArr.push(`${row}排${seat + 1}座`)
    seatArr.push(`${row - 1}排${seat}座`)
  } else {
    // 其他普通情况
    for (let i = 0; i < personCount; i++) {
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

function ShuttlePage(props: IProps) {
  // console.log('ShuttlePage', props)
  document.title = '订单查看'
  const [showInput, setShowInput] = useState<EVerbForm | null>(null)
  const [verbData, setVerbData] = useState<IVerbData>(props.pageType === EType.leftBottom ? {
    depart: defaultData.address1,
    destination: defaultData.address2,
    price: defaultData.price,
    personCount: defaultData.personCount,
    seatStr: generateSeatStr(defaultData.personCount),
    departTime: defaultData.departTime1
  } : {
    depart: defaultData.address2,
    destination: defaultData.address3,
    price: defaultData.price,
    personCount: defaultData.personCount,
    seatStr: generateSeatStr(defaultData.personCount),
    departTime: defaultData.departTime2
  })

  const handleVerbFormClick = (key: EVerbForm) => {
    setShowInput(key)
  }

  const updateFormData = (key: EVerbForm, val: any) => {
    const d = JSON.parse(JSON.stringify(verbData))
    d[key] = val
    setVerbData(d)
    setShowInput(null)
  }

  useEffect(() => {
    updateFormData(EVerbForm.seatStr, generateSeatStr(verbData.personCount))
  }, [verbData.personCount])

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

        <div className="main_header2">
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
                <td>陈小姐</td>
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
              <tr>
                <td className="tableleft">预订时间：</td>
                <td>{moment(new Date().getTime() - 28888).format('YYYY-MM-DD HH:mm:ss')}</td>
              </tr>

              <tr onClick={() => updateFormData(EVerbForm.seatStr, generateSeatStr(verbData.personCount))}>
                <td className="tableleft">已选座位：</td>
                <td className="tableright">{verbData.seatStr}</td>
              </tr>

              <tr>
                <td className="tableleft">单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价：</td>
                <td>{verbData.price}RMB</td>
              </tr>

              <tr onClick={() => {
                let num = generateRandomNumber(1, 3)
                if (num === verbData.personCount) {
                  num = generateRandomNumber(1, 3)
                }
                updateFormData(EVerbForm.personCount, num)
              }}>
                <td className="tableleft">乘客人数：</td>
                <td className="tableright">{verbData.personCount}人</td>
              </tr>

              <tr>
                <td className="tableleft">应付金额：</td>
                <td>{verbData.price * verbData.personCount}RMB</td>
              </tr>
              <tr>
                <td className="tableleft">备&nbsp;&nbsp;&nbsp;注：</td>
                <td> 微信支付</td>
              </tr>
            </tbody>
          </table>
        </div>


        <div id="aaaa">
          <a href="http://gzjhqc.vip/sell/seatYudingOrder/yudingguize?uid=d9f2b50a518b4264ac8006f2a09f6b63">每天购票烦?试试自动出票</a>
        </div>


      </div>
    </div>
  </div>
}

export default ShuttlePage