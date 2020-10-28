import React, { CSSProperties } from 'react'

import clsx from 'clsx'

import { position, positionObj } from '../types/Shared'
import Index from './IndexElement'

import styled, { css } from 'styled-components'

const StyledBox = styled.div<{
  selected?: boolean
  top?: boolean
  right?: boolean
  bottom?: boolean
  left?: boolean
}>`
  --color:#b9b4b0;
  box-sizing: border-box;
  border-radius: 2px;
  border: 1.8px solid var(--color);
  color: var(--color);
  padding: 10px 10px;
  margin: 2px 2px;
  min-height: 50px;
  min-width: 50px;
  position: relative;
  display: inline-block;
  font-size: 20px;
  text-align: center;
  font-weight: 600;
  ${(props) =>
    props.top &&
    css`
      margin-top: 20px;
    `}
  ${(props) =>
    props.right &&
    css`
      margin-right: 20px;
    `}
  ${(props) =>
    props.bottom &&
    css`
      margin-bottom: 20px;
    `}
  ${(props) =>
    props.left &&
    css`
      margin-left: 20px;
    `}
`

interface Props {
  value: number | string
  className: string
  style: CSSProperties
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
  }

  return (
    <StyledBox
      {...arrayIndexPosition}
      className={clsx(elementClassName, className)}
      style={style}
    >
      {showIndex &&
        arrayIndexPosition.map((pos, i) => (
          <Index key={i} value={indexObj[pos]} pos={pos} />
        ))}
      {value}
    </StyledBox>
  )
}

export default ElementBox
