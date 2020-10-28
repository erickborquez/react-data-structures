import React, { CSSProperties } from 'react'
import clsx from 'clsx'

import { position } from '../types/Shared'
import { KeyValueElement } from '../types/Elements'

import styled, { css } from 'styled-components'

const StyledBox = styled.div<{ selected?: boolean }>`
  --element-color: #b9b4b0;
  border: 1.8px solid var(--element-color);
  color: var(--element-color);
  border-radius: 2px;
  box-sizing: border-box;
  padding: 0;
  margin: 2px 2px;
  min-height: 50px;
  min-width: 50px;
  display: inline-block;
  font-size: 20px;
  text-align: center;
  font-weight: 600;
  font-size: 1em;
  & > span {
    display: block;
  }
`

const StyledValue = styled.span<{ selected?: boolean }>`
  padding: 10px;
`

const StyledKey = styled.span<{ selected?: boolean }>`
  border-top: 1.8px solid var(--element-color);
  color: #f5d67b;
  font-size: 0.7em;
  padding: 3px 10px;
  background-color: red;
`

interface Props extends KeyValueElement {
  value: string | number
  keyValue: string | number
  className: string
  style: CSSProperties
  keyPosition?: position
  showKey?: boolean
  selected?: boolean
}

const KeyValueElementBox: React.FC<Props> = ({
  value,
  keyValue,
  className = '',
  style = {},
  keyPosition = 'bottom',
  showKey = true,
  selected
}) => {
  return (
    <StyledBox className={className} style={style} selected={selected}>
      <StyledValue selected={selected}>{value}</StyledValue>
      {showKey && <StyledKey selected={selected}>{keyValue}</StyledKey>}
    </StyledBox>
  )
}

export default KeyValueElementBox
