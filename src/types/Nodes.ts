import { CSSProperties } from 'react'

export type Node = {
  value: number | string
  id: string | number
  style?: CSSProperties
  className?: string
}

export type TreeNode =
  | (Node & {
      children?: TreeNode[]
    })
  | (Node & { left?: TreeNode | undefined; right?: TreeNode | undefined })

export interface FormatedTreeNode extends Node {
  children?: TreeNode[]
}

export interface TreeNodeLayout extends FormatedTreeNode {
  children?: TreeNodeLayout[]
  position: {
    x: number
    y: number
  }
  width: number
  height: number
}

export interface Edge {
  id: string | number
  from: string | number
  to: string | number
  value?: string | number
}

export interface EdgeLayout extends Edge {
  position: {
    from: {
      x: number
      y: number
    }
    to: {
      x: number
      y: number
    }
  }
}
