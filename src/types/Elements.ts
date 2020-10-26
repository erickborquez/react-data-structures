import { CSSProperties } from 'react'

export type ArrayElement =
  | number
  | string
  | { value: number | string; className: string; style: CSSProperties }

export type FormatedElement = {
  value: number | string
  className: string
  style: CSSProperties
}

export type KeyValueElement = {
  keyValue: number | string
  value: number | string
  className?: string
  style?: CSSProperties
}

export type FormatedKeyValueElement = {
  keyValue: number | string
  value: number | string
  className: string
  style: CSSProperties
}
