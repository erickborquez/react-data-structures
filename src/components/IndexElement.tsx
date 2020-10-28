import React from 'react'
import styled, { css } from 'styled-components'
import { position } from '../types/Shared'

const Span = styled.span<{ pos: position }>`
  color: rgb(116, 116, 116);
  font-weight: 700;
  position: absolute;
  font-size: 12px;
  ${(props) =>
    props.pos === 'top' &&
    css`
      top: 0;
      left: 50%;
      transform: translate(-50%, calc(-100% - 5px));
    `}
  ${(props) =>
    props.pos === 'right' &&
    css`
      top: 50%;
      left: 100%;
      transform: translate(calc(50% + 5px), -50%);
    `}
  ${(props) =>
    props.pos === 'bottom' &&
    css`
      top: 100%;
      left: 50%;
      transform: translate(-50%, 5px);
    `}
  ${(props) =>
    props.pos === 'left' &&
    css`
      top: 50%;
      left: 0%;
      transform: translate(calc(-100% - 10px), -50%);
    `}
`

interface Props {
  pos: position
  value: string | number
}
const Index: React.FC<Props> = ({ value, pos }) => {
  return <Span pos={pos}>{value}</Span>
}

export default Index
