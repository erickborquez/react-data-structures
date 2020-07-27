import React, { useEffect, useState } from 'react'

import { getSelections1DFormated } from '../../common/selections'
import { defaultElementOptions } from '../../common/defaultValues'

import styles from './style.css'
import ElementBox from '../ElementBox'

const Array1D = ({ className = '', select = null, array, elementOptions }) => {
  const [elements, setElements] = useState([])

  useEffect(() => {
    const arrayCopy = array || []
    const options = { ...defaultElementOptions, ...(elementOptions || {}) }

    /// An array describing the selections
    const selections = select !== null ? getSelections1DFormated(select) : []

    const components = arrayCopy.map((element, index) => {
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
    setElements(components)
  }, [select, array, elementOptions])

  return (
    <div className={`${styles.array1dContainer} ${className}`}>{elements}</div>
  )
}

export default Array1D
