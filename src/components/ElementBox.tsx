import * as React from 'react'
import clsx from 'clsx'

import ArrayElement from '../types/Element'
import { position, positionObj } from '../types/Shared'

import styles from '../styles/elementBox.module.css'

interface Props {
  value: number | string
  className?: string
  style?: React.CSSProperties
  indexPosition?: position | position[] | string[]
  showIndex?: boolean
  index?: number | string | positionObj
}

const ElementBox: React.FC<Props> = ({
  value,
  className,
  style,
  indexPosition = 'top',
  showIndex = false,
  index
}) => {
  let elementClassName = ''
  let arrayIndexPosition: position[]
  let indexObj: positionObj = {}

  if (showIndex) {
    if (typeof indexPosition === 'string') {
      arrayIndexPosition = [indexPosition]
      if (typeof index === 'number' || typeof index === 'string') {
        indexObj[indexPosition] = index
      }
    } else {
      arrayIndexPosition = indexPosition as position[]
      if (!(typeof index === 'number' || typeof index === 'string')) {
        indexObj = index
      }
    }

    arrayIndexPosition.forEach(
      (pos) => (elementClassName += ' ' + styles[`elementBoxShow--${pos}`])
    )
  }

  return (
    <div
      className={clsx(styles.elementBox, elementClassName, className)}
      style={style}
    >
      {showIndex &&
        arrayIndexPosition.map((pos, i) => (
          <span
            key={i}
            className={clsx(
              styles.elementBoxIndex,
              styles[`elementBoxIndex--${pos}`]
            )}
          >
            {indexObj[pos]}
          </span>
        ))}

      {value}
    </div>
  )
}

export default ElementBox
