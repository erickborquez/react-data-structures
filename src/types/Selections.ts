import { CSSProperties } from 'react'
import { deflate } from 'zlib'
import { ArrayElement, KeyValueElement } from './Elements'

export type Selection =
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

export type SelectionKeyValueElement =
  | number
  | string
  | { keyValue: number | string; className?: string; style: CSSProperties }
  | {
      eval: (
        element?: KeyValueElement,
        index?: number,
        array?: KeyValueElement[]
      ) => boolean
      className?: string
      style: CSSProperties
    }

export interface FormatedSelectionKeyValueElement {
  className?: string
  style?: CSSProperties
  index?: number
  eval: (
    element?: KeyValueElement,
    index?: number,
    array?: KeyValueElement[]
  ) => boolean
}
