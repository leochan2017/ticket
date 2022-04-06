import { useState, useEffect } from 'react'
import defaultData from '../../data'
import './index.css'
const cls = 'hidden-page'

export interface IProps {
  onShowPage?: Function
}

export enum EType {
  'left' = 'left',
  'right' = 'right',
  'leftBottom' = 'leftBottom',
  'rightBottom' = 'rightBottom'
}

function HiddenPage(props: IProps) {
  const [leftCount, setLeftCount] = useState<number>(0)
  const [rightCount, setRightCount] = useState<number>(0)
  const [leftBottomCount, setLeftBottomCount] = useState<number>(0)
  const [rightBottomCount, setRightBottomCount] = useState<number>(0)

  useEffect(() => {
    console.log('useEffect Count: ', leftCount, rightCount)

    if (typeof props.onShowPage === 'function') {
      if (leftCount >= defaultData.count) {
        props.onShowPage(EType.left)
      }
      if (rightCount >= defaultData.count) {
        props.onShowPage(EType.right)
      }
      if (leftBottomCount >= defaultData.count) {
        props.onShowPage(EType.leftBottom)
      }
      if (rightBottomCount >= defaultData.count) {
        props.onShowPage(EType.rightBottom)
      }
    }
  })

  return <div className={cls}>
    <div className={`${cls}-button left`} onClick={() => setLeftCount(leftCount + 1)}></div>
    <div className={`${cls}-button right`} onClick={() => setRightCount(rightCount + 1)}></div>
    <div className={`${cls}-button left bottom`} onClick={() => setLeftBottomCount(leftBottomCount + 1)}></div>
    <div className={`${cls}-button right bottom`} onClick={() => setRightBottomCount(rightBottomCount + 1)}></div>
  </div>
}

export default HiddenPage