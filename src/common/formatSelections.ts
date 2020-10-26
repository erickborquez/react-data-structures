import { CSSProperties } from 'react'

import {
  Selection,
  FormatedArray2DSelection,
  FormatedArraySelection,
  Selection2D,
  SelectionKeyValueElement,
  FormatedSelectionKeyValueElement
} from '../types/Selections'

import { defaultSelection } from './defaultValues'

export interface ElementSelected {
  value: number | string
  className?: String
  style?: CSSProperties
  id: number
}

export const formatSelectionArray = (
  selection: Selection
): FormatedArraySelection => {
  if (typeof selection === 'number')
    return { ...defaultSelection, eval: (_, i) => i === selection }
  if ('index' in selection) {
    return {
      ...defaultSelection,
      ...selection,
      eval: (_, i) => i === selection.index
    }
  }
  return selection
}

export const formatAllSelectionsArray = (
  selections: Selection | Selection[] | undefined
): FormatedArraySelection[] => {
  if (!selections) return []
  if (Array.isArray(selections)) return selections.map(formatSelectionArray)
  return [formatSelectionArray(selections)]
}

export const formatArraySelection2D = (
  selection: Selection2D
): FormatedArray2DSelection => {
  if (Array.isArray(selection)) {
    return {
      ...defaultSelection,
      eval: (_, i) => i[0] === selection[0] && i[1] === selection[1]
    }
  }
  if ('index' in selection) {
    return {
      ...defaultSelection,
      className: selection.className,
      style: selection.style,
      eval: (_, i) => i[0] === selection.index[0] && i[1] === selection.index[1]
    }
  }
  return selection
}

export const formatAllSelectionsArray2D = (
  selections: Selection2D | Selection2D[] | undefined
): FormatedArray2DSelection[] => {
  if (!selections) return []
  if (Array.isArray(selections)) {
    if (isNaN(+selections[0])) {
      return [formatArraySelection2D(selections as [number, number])]
    }
    return (selections as Selection2D[]).map(formatArraySelection2D)
  }
  return [formatArraySelection2D(selections)]
}

export const formatSelectionKeyValue = (
  selection: SelectionKeyValueElement
): FormatedSelectionKeyValueElement => {
  if (typeof selection === 'number' || typeof selection === 'string') {
    return {
      ...defaultSelection,
      eval: (element) => element.keyValue === selection
    }
  } else if ('keyValue' in selection) {
    return {
      ...defaultSelection,
      ...selection,
      eval: (element) => element.keyValue === selection.keyValue
    }
  } else {
    return selection
  }
}

export const formatAllSelectionsKeyValue = (
  selections: SelectionKeyValueElement | SelectionKeyValueElement[] | undefined
): FormatedSelectionKeyValueElement[] => {
  if (!selections) return []
  if (Array.isArray(selections)) return selections.map(formatSelectionKeyValue)
  return [formatSelectionKeyValue(selections)]
}
