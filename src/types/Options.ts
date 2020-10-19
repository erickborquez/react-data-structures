import { CSSProperties } from 'react'
import ArrayElement from './Element'

export interface ElementOptions {
  style?: CSSProperties
  className?: string
}

interface Options {
  idGetter?: (value: ArrayElement, index: number) => number | string
  element?: ElementOptions
}

export default Options
