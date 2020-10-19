import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { defaultArrayOptions } from '../common/defaultValues'
import { formatAllSelections } from '../common/formatSelections'
import formatElement from '../common/formatElement'
import ElementBox from './ElementBox'

import ArrayElement from '../types/Element'
import Options from '../types/Options'
import Selection, { FormatedArraySelection } from '../types/Selections'

import styles from '../styles/array1d.module.css'

interface Props {
  elements: ArrayElement[]
  className?: string
  style?: React.CSSProperties
  select?: Selection | Selection[]
  options?: Options
}
const Array1D: React.FC<Props> = ({
  className = '',
  select,
  elements,
  options,
  style
}) => {
  const [components, setComponents] = useState([])

  useEffect(() => {
    let elementOptions = { ...defaultArrayOptions.element }
    if (options && options.element)
      elementOptions = {
        ...elementOptions,
        ...options.element
      }
    const selections = formatAllSelections(select)

    const components = elements
      .map((element) => formatElement(element, elementOptions))
      .map((element, index) => {
        let { className, style, value } = element
        selections.forEach((select) => {
          if (select.eval(element, index, elements)) {
            className = `${className} ${select.className}`
            style = { ...style, ...select.style }
          }
        })

        return (
          <ElementBox
            key={index}
            showIndex
            indexPosition='top'
            index={index}
            className={className}
            style={style}
            value={value}
          />
        )
      })
    setComponents(components)
  }, [select, elements, options])

  return (
    <div className={clsx(styles.array1dContainer, className)} style={style}>
      {components}
    </div>
  )
}

export default Array1D
