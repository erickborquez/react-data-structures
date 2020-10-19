import ArrayElement, { FormatedElement } from '../types/Element'
import { ElementOptions } from '../types/Options'

export default (
  element: ArrayElement,
  defaultOptions: ElementOptions
): FormatedElement => {
  let formatedElement: FormatedElement = { value: '' }
  if (typeof element === 'number' || typeof element === 'string') {
    formatedElement = { ...defaultOptions, value: element }
  } else formatedElement = { ...defaultOptions, ...element }
  return formatedElement
}
