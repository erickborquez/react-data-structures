import React from 'react'

export type FormatedElement = {
  value: number | string
  className?: string
  style?: React.CSSProperties
  id?: number | string
}
type ArrayElement = number | string | FormatedElement

export default ArrayElement
