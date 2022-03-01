import { useState, useEffect } from 'react'
import defaultData from '../../data'
import './index.css'
const cls = 'hidden-page'

export interface IProps {
  onShowPage?: Function
}

export enum EType {
  'left' = 'left',
  'right' = 'right'
}

function HiddenPage(props: IProps) {
  const [leftCount, setLeftCount] = useState<number>(0)
  const [rightCount, setRightCount] = useState<number>(0)

  useEffect(() => {
    console.log('useEffect Count: ', leftCount, rightCount)
    if (leftCount >= defaultData.count) {
      props.onShowPage && props.onShowPage(EType.left)
    }
    if (rightCount >= defaultData.count) {
      props.onShowPage && props.onShowPage(EType.right)
    }
  })

  return <div className={cls}>
    <div className={`${cls}-button left`} onClick={() => setLeftCount(leftCount + 1)}></div>
    <div className={`${cls}-button right`} onClick={() => setRightCount(rightCount + 1)}></div>
  </div>
}

export default HiddenPage