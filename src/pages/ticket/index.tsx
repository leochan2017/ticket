import { useState } from 'react'
import defaultData from '../../data'
import moment from 'moment'
import './index.css'
import { EType } from '../hidden'
const cls = 'ticket-page'
const today = new Date()

interface IVerbData {
  time?: string;
  depart?: string;
  destination?: string
}

enum EVerbForm {
  'time' = 'time',
  'depart' = 'depart',
  'destination' = 'destination'
}

export interface IProps {
  pageType: EType
}

const generateVerifyCode = () => {
  return (today.getTime() * today.getDay() * today.getMonth()).toString().substring(0, 4)
}

function TicketPage(props: IProps) {
  // console.log('TicketPage', props)
  const [count, setCount] = useState<number>(0)
  const [showInput, setShowInput] = useState<EVerbForm | null>(null)
  const [verbData, setVerbData] = useState<IVerbData>(props.pageType === EType.left ? {
    time: defaultData.time,
    depart: defaultData.depart,
    destination: defaultData.destination
  } : {
    time: defaultData.time2,
    depart: defaultData.depart2,
    destination: defaultData.destination2
  })

  const handleVerbFormClick = (key: EVerbForm) => {
    if (count < defaultData.count) return
    setShowInput(key)
  }

  const handleVerbFormBlur = (key: EVerbForm, val: string) => {
    const d = JSON.parse(JSON.stringify(verbData))
    d[key] = val
    setVerbData(d)
    setShowInput(null)
  }

  return <div className={cls}>
    <div className="ticket-page-content">
      <div className="ticket-page-content-header">
        {defaultData.title}
      </div>

      <div className="ticket-page-content-top">
        <div className="ticket-page-content-top-datetime">
          {moment().format('YYYY年MM月DD日') + ' '}
          {showInput === EVerbForm.time ?
            <input
              type="text"
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

      <div className="ticket-page-content-verifycode">
        {generateVerifyCode()}
      </div>

      <div className="ticket-page-content-contact" onClick={() => setCount(count + 1)}>
        {defaultData.contact}
      </div>
    </div>
  </div>
}

export default TicketPage