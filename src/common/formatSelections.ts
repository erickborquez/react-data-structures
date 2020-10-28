import { CSSProperties } from 'react'

import {
  Selection,
  FormatedArray2DSelection,
  FormatedArraySelection,
  Selection2D,
  SelectionKeyValueElement,
  FormatedSelectionKeyValueElement,
  SelectionValue
} from '../types/Selections'

import { defaultSelection } from './defaultValues'

export interface ElementSelected {
  value: number | string
  className?: String
  style?: CSSProperties
  id: number
}

export const formatSelectionArray = (
  selection: Selection,
  defaultSelection: SelectionValue
): FormatedArraySelection => {
  if (typeof selection === 'number')
    return { ...defaultSelection, eval: (_, i) => i === selection }
  else if ('index' in selection) {
    return {
      ...defaultSelection,
      ...selection,
      eval: (_, i) => i === selection.index
    }
  }
  return { ...defaultSelection, ...selection }
}

export const formatAllSelectionsArray = (
  selections: Selection | Selection[] | undefined,
  defaultSelection: SelectionValue
): FormatedArraySelection[] => {
  if (selections === undefined) return []
  if (Array.isArray(selections))
    return selections.map((s) => formatSelectionArray(s, defaultSelection))
  return [formatSelectionArray(selections, defaultSelection)]
}

export const formatArraySelection2D = (
  selection: Selection2D,
  defaultSelection: SelectionValue
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
  return { ...defaultSelection, ...selection }
}

export const formatAllSelectionsArray2D = (
  selections: Selection2D | Selection2D[] | undefined,
  defaultSelection: SelectionValue
): FormatedArray2DSelection[] => {
  if (!selections) return []
  if (Array.isArray(selections)) {
    return selections.map((s) => formatArraySelection2D(s, defaultSelection))
  }
  return [formatArraySelection2D(selections, defaultSelection)]
}

export const formatSelectionKeyValue = (
  selection: SelectionKeyValueElement,
  defaultSelection: SelectionValue
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
    return { ...defaultSelection, ...selection }
  }
}

export const formatAllSelectionsKeyValue = (
  selections: SelectionKeyValueElement | SelectionKeyValueElement[] | undefined,
  defaultSelection: SelectionValue
): FormatedSelectionKeyValueElement[] => {
  if (!selections) return []
  if (Array.isArray(selections))
    return selections.map((s) => formatSelectionKeyValue(s, defaultSelection))
  return [formatSelectionKeyValue(selections, defaultSelection)]
}
