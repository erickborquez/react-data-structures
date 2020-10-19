import { CSSProperties } from 'react'
import { deflate } from 'zlib'
import ArrayElement from './Element'

type Selection =
  | number
  | { index: number; className?: string; style: CSSProperties }
  | {
      eval: (
        element?: ArrayElement,
        index?: number,
        array?: ArrayElement[]
      ) => boolean
      className?: string
      style: CSSProperties
    }

export default Selection

export type Selection2D =
  | [number, number]
  | { index: [number, number]; className?: string; style: CSSProperties }
  | {
      eval: (
        element?: ArrayElement,
        index?: [number, number],
        array?: ArrayElement[][]
      ) => boolean
      className?: string
      style: CSSProperties
    }

export interface FormatedArraySelection {
  className?: string
  style?: CSSProperties
  index?: number
  eval: (
    element?: ArrayElement,
    index?: number,
    array?: ArrayElement[]
  ) => boolean
}

export interface FormatedArray2DSelection {
  className?: string
  style?: CSSProperties
  index?: number
  eval: (
    element?: ArrayElement,
    index?: [number, number],
    array?: ArrayElement[][]
  ) => boolean
}
