import { CSSProperties } from 'react'
import ArrayElement, { FormatedElement } from '../types/Element'
import Selection, {
  FormatedArray2DSelection,
  FormatedArraySelection,
  Selection2D
} from '../types/Selections'

import { defaultArraySelection } from './defaultValues'

export interface ElementSelected {
  value: number | string
  className?: String
  style?: CSSProperties
  id: number
}

function formatSelection(selection: Selection): FormatedArraySelection {
  if (typeof selection === 'number')
    return { ...defaultArraySelection, eval: (_, i) => i === selection }
  if ('index' in selection) {
    return { ...selection, eval: (_, i) => i === selection.index }
  }
  return selection
}
export default formatSelection

export const formatAllSelections = (
  selections: Selection | Selection[] | undefined
): FormatedArraySelection[] => {
  if (!selections) return []
  if (Array.isArray(selections)) return selections.map(formatSelection)
  return [formatSelection(selections)]
}

export const formatSelection2D = (
  selection: Selection2D
): FormatedArray2DSelection => {
  if (Array.isArray(selection)) {
    return {
      ...defaultArraySelection,
      eval: (_, i) => i[0] === selection[0] && i[1] === selection[1]
    }
  }
  if ('index' in selection) {
    return {
      ...defaultArraySelection,
      eval: (_, i) => i[0] === selection.index[0] && i[1] === selection.index[1]
    }
  }
  return selection
}

export const formatAllSelections2D = (
  selections: Selection2D | Selection2D[] | undefined
): FormatedArray2DSelection[] => {
  if (!selections) return []
  if (Array.isArray(selections)) {
    if (isNaN(+selections[0])) {
      return [formatSelection2D(selections as [number, number])]
    }
    return (selections as Selection2D[]).map(formatSelection2D)
  }
  return [formatSelection2D(selections)]
}
