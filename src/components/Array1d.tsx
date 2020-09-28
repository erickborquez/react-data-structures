import React, { useEffect, useState } from 'react'

import { getSelections1DFormated } from '../common/selections'
import { defaultElementOptions } from '../common/defaultValues'

import ElementBox from './ElementBox'

import styles from '../styles/array1d.module.css'

const Array1D = ({
  className = '',
  select = null,
  elements = null,
  elementOptions
}) => {
  const [components, setComponents] = useState([])

  useEffect(() => {
    const elementsCopy = elements || []
    const options = { ...defaultElementOptions, ...(elementOptions || {}) }

    /// An array describing the selections
    const selections = select !== null ? getSelections1DFormated(select) : []

    const components = elementsCopy.map((element, index) => {
      let className = options.className || ''
      let style = options.style || {}
      selections.forEach((s) => {
        if (s.callback(index, element)) {
          className = `${className} ${s.className}`
          style = { ...style, ...s.style }
        }
      })

      return (
        <ElementBox
          onClick={(event) => options.onClick(index, element, event)}
          showIndexTop
          indexTop={index}
          key={index}
          className={className}
          style={style}
          data={element}
        />
      )
    })
    setComponents(components)
  }, [select, elements, elementOptions])

  return (
    <div className={`${styles.array1dContainer} ${className}`}>
      {components}
    </div>
  )
}

export default Array1D
