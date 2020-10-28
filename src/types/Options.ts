import { CSSProperties } from 'react'
import { TreeDimensions } from '../../dist/types/Dimensions'
import { ArrayElement } from './Elements'

export interface Index {
  style?: CSSProperties
  className?: string
}

export interface SelectionOptions {
  default?: {
    className?: string
    style?: CSSProperties
  }
}

/// Single elements
export interface ElementOptions {
  style?: CSSProperties
  className?: string
}

export interface KeyElementOptions {
  style?: CSSProperties
  className?: string
  index?: Index
}
export interface NodeOptions {
  style?: {}
  className?: ''
  radius?: number
  margin?: number
  padding?: number
}

export interface EdgeOption {
  style?: {}
  className?: ''
}

//// Structures

export interface ArrayOptions {
  element?: ElementOptions
  selection?: SelectionOptions
}
export interface MapOptions {
  element?: ElementOptions
  keyElement?: KeyElementOptions
  selection?: SelectionOptions
}

export interface QueueOptions {
  element?: ElementOptions
  elementsToShow?: number
  frontIndexLabel?: string
  backIndexLabel?: string
  showBack?: boolean
  showBackIndex?: boolean
  showFrontIndex?: boolean
  selection?: SelectionOptions
}

export interface StackOptions {
  element?: ElementOptions
  elementsToShow?: number
  topIndexLabel?: string
  rearIndexLabel?: string
  showRear?: boolean
  showRearIndex?: boolean
  showTopIndex?: boolean
  selection?: SelectionOptions
}

export interface TreeOptions {
  width: number
  height: number
  orientation?: 'vertical' | 'horizontal'
  reversed?: boolean
  node?: NodeOptions
  edge?: EdgeOption
  padding?: number
  zoom?: boolean
  maxZoom?: number
  minZoom?: number
  selection?: SelectionOptions
}
