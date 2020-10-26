import {
  ArrayElement,
  FormatedElement,
  KeyValueElement,
  FormatedKeyValueElement
} from '../types/Elements'
import { FormatedTreeNode, TreeNode } from '../types/Nodes'
import { ElementOptions } from '../types/Options'

import {
  defaultElement,
  defaultKeyValueElement,
  defaultTreeNode
} from './defaultValues'

export const formatElement = (
  element: ArrayElement,
  defaultOptions: ElementOptions
): FormatedElement => {
  let formatedElement: FormatedElement = {
    ...defaultElement,
    ...defaultOptions
  }
  if (typeof element === 'number' || typeof element === 'string') {
    formatedElement.value = element
  } else formatedElement = { ...formatedElement, ...element }
  return formatedElement
}

export const formatKeyValueElement = (
  element: KeyValueElement,
  defaultOptions: ElementOptions
): FormatedKeyValueElement => {
  let formatedElement: FormatedKeyValueElement = {
    ...defaultKeyValueElement,
    ...defaultOptions,
    ...element
  }
  return formatedElement
}

export const formateTreeNode = (
  root: TreeNode
): FormatedTreeNode & { children: TreeNode[] } => {
  let children = []

  if ('left' in root && root.left !== undefined) children.push(root.left)
  if ('right' in root && root.right !== undefined) children.push(root.right)

  return { ...defaultTreeNode, children, ...root }
}
