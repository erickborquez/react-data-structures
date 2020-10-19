import Options from '../types/Options'
import { FormatedArraySelection } from '../types/Selections'

export const defaultArrayOptions: Options = {
  element: { className: '', style: {} }
}

export const defaultArraySelection: FormatedArraySelection = {
  eval: () => false,
  className: '',
  style: {}
}
