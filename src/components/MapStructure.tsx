import React, { CSSProperties } from 'react'

import KeyValueElementBox from './KeyValueElementBox'

import { defaultMapOptions } from '../common/defaultValues'

import { KeyValueElement } from '../types/Elements'
import { MapOptions } from '../types/Options'
import { SelectionKeyValueElement } from '../types/Selections'

import styles from '../styles/mapStructure.module.css'
import { formatAllSelectionsKeyValue } from '../common/formatSelections'
import { formatKeyValueElement } from '../common/formatElement'

interface Props {
  elements: KeyValueElement[]
  className: string
  style: CSSProperties
  options: MapOptions
  select?: SelectionKeyValueElement | SelectionKeyValueElement[]
}

const MapStructure: React.FC<Props> = ({
  className = '',
  elements,
  options,
  select
}) => {
  const [components, setComponents] = React.useState([])

  React.useEffect(() => {
    const formatedOptions = options
      ? { ...defaultMapOptions, ...options }
      : { ...defaultMapOptions }

    const elementOptions = {
      ...defaultMapOptions.element,
      ...formatedOptions.element
    }

    const defaultSelection = formatedOptions.selection.default as {
      style: CSSProperties
      className: string
    }
    const selections = formatAllSelectionsKeyValue(select, defaultSelection)

    const components = elements
      .map((element) => formatKeyValueElement(element, elementOptions))
      .map((element, i) => {
        let { value, keyValue, className, style } = element

        selections.forEach((select) => {
          if (select.eval(element, i, elements)) {
            className = `${className} ${select.className}`
            style = { ...style, ...select.style }
          }
        })
        return (
          <KeyValueElementBox
            key={i}
            className={className}
            style={style}
            value={value}
            keyValue={keyValue}
          />
        )
      })

    setComponents(components)
  }, [elements, options, select])

  return <div className={className}>{components}</div>
}

export default MapStructure
