import { useState } from 'react'
import defaultData from '../../data'
import moment from 'moment'
import './index.css'
import { EType } from '../hidden'
const cls = 'ticket-page'

const today = new Date()
const todayStr = moment().format('YYYY年MM月DD日')

interface IVerbData {
  date?: string;
  time?: string;
  depart?: string;
  destination?: string;
  verifycode?: string;
}

enum EVerbForm {
  'date' = 'date',
  'time' = 'time',
  'depart' = 'depart',
  'destination' = 'destination',
  'verifycode' = 'verifycode'
}

export interface IProps {
  pageType: EType
}

const generateVerifyCode = () => {
  const str = parseInt(today.getDate() * today.getMonth() * today.getFullYear() + '', 16) + ''
  return str.substring(str.length - 4)
}

function TicketPage(props: IProps) {
  // console.log('defaultData', defaultData)

  document.title = defaultData.title
  // console.log('TicketPage', props)
  const defaultVerifyCode = generateVerifyCode()

  const [count, setCount] = useState<number>(0)
  const [showInput, setShowInput] = useState<EVerbForm | null>(null)
  const [verbData, setVerbData] = useState<IVerbData>(props.pageType === EType.left ? {
    date: todayStr,
    time: defaultData.time,
    depart: defaultData.depart,
    destination: defaultData.destination,
    verifycode: defaultVerifyCode
  } : {
    date: todayStr,
    time: defaultData.time2,
    depart: defaultData.depart2,
    destination: defaultData.destination2,
    verifycode: defaultVerifyCode
  })

  const handleVerbFormClick = (key: EVerbForm) => {
    if (count < defaultData.count) return
    setShowInput(key)
  }

  const handleVerbFormBlur = (key: EVerbForm, val: string) => {
    const d = JSON.parse(JSON.stringify(verbData))
    if (!d) return
    d[key] = val
    setVerbData(d)
    setShowInput(null)


    let locDataObj: any = {}
    const locDataStr = localStorage.getItem('CHUANG_XIANG')
    if (locDataStr) locDataObj = JSON.parse(locDataStr)
    if (props.pageType === EType.left) {
      for (const key in d) {
        locDataObj[key] = d[key]
      }
    } else if (props.pageType === EType.right) {
      locDataObj.time2 = d.time
      locDataObj.depart2 = d.depart
      locDataObj.destination2 = d.destination
    }
    if (JSON.stringify(locDataObj) !== '{}') {
      localStorage.setItem('CHUANG_XIANG', JSON.stringify(locDataObj))
    }
  }

  return <div className={cls}>
    <div className="ticket-page-content">
      <div className="ticket-page-content-header">
        {defaultData.title}
      </div>

      <div className="ticket-page-content-top">
        <div className="ticket-page-content-top-datetime">
          {showInput === EVerbForm.date ?
            <input
              type="text"
              defaultValue={verbData.date}
              onBlur={e => handleVerbFormBlur(EVerbForm.date, e.target.value)}
            /> :
            <span onClick={() => handleVerbFormClick(EVerbForm.date)}>
              {verbData.date + ' '}
            </span>
          }

          {showInput === EVerbForm.time ?
            <input
              type="text"
              defaultValue={verbData.time}
              onBlur={e => {
                // console.log('blur time e', e)
                const { value } = e.target
                handleVerbFormBlur(EVerbForm.time, value)
              }}
            /> :
            <span onClick={() => handleVerbFormClick(EVerbForm.time)}>
              {verbData.time}
            </span>
          }
        </div>

        <div className="ticket-page-content-top-address">
          <div className="ticket-page-content-top-lefticon">上</div>
          <div onClick={() => handleVerbFormClick(EVerbForm.depart)}>
            {showInput === EVerbForm.depart ?
              <input
                type="text"
                defaultValue={verbData.depart}
                onBlur={e => {
                  // console.log('blur depart e', e)
                  const { value } = e.target
                  handleVerbFormBlur(EVerbForm.depart, value)
                }}
              /> :
              <span onClick={() => handleVerbFormClick(EVerbForm.depart)}>
                {verbData.depart}
              </span>
            }
          </div>
        </div>

        <div className="ticket-page-content-top-address">
          <div className="ticket-page-content-top-lefticon">下</div>
          <div onClick={() => handleVerbFormClick(EVerbForm.destination)}>
            {showInput === EVerbForm.destination ?
              <input
                type="text"
                defaultValue={verbData.destination}
                onBlur={e => {
                  // console.log('blur destination e', e)
                  const { value } = e.target
                  handleVerbFormBlur(EVerbForm.destination, value)
                }}
              /> :
              <span onClick={() => handleVerbFormClick(EVerbForm.destination)}>
                {verbData.destination}
              </span>
            }
          </div>
        </div>
      </div>

      <div className="ticket-page-content-verifycode" onClick={() => handleVerbFormClick(EVerbForm.verifycode)}>
        {showInput === EVerbForm.verifycode ?
          <input
            type="text"
            defaultValue={verbData.verifycode}
            onBlur={e => handleVerbFormBlur(EVerbForm.verifycode, e.target.value)}
          /> : verbData.verifycode
        }
      </div>

      <div className="ticket-page-content-contact" onClick={() => setCount(count + 1)}>
        {defaultData.contact}
      </div>
    </div>
  </div>
}

export default TicketPage