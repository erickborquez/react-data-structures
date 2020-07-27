import React, { useState, useEffect } from 'react'

import KeyValueElement from '../KeyValueElement'

import { getSelectionsKeyValue } from '../../common/selections'
import { defaultElementOptions } from '../../common/defaultValues'

import styles from './style.css'

const MapStructure = ({
  className = '',
  elements,
  elementOptions = null,
  select = null
}) => {
  const [components, setComponents] = useState([])

  useEffect(() => {
    let elementsCopy = elements || []
    const options = { ...defaultElementOptions, ...(elementOptions || {}) }
    const selections = select !== null ? getSelectionsKeyValue(select) : []
    const createElement = (data, i) => {
      const { key, value } = data
      let className = options.className || ''
      let style = options.style || {}
      selections.forEach((s) => {
        if (s.callback(key, value)) {
          className = `${className} ${s.className}`
          style = { ...style, ...s.style }
        }
      })
      return (
        <KeyValueElement
          onClick={(event) => options.onClick(key, value, event)}
          key={`${i}-${key}-${value}`}
          className={className}
          style={style}
          data={data}
        />
      )
    }
    setComponents(elementsCopy.map(createElement))
  }, [elements, elementOptions, select])

  return (
    <div className={`${styles.mapStructure} ${className}`}>{components}</div>
  )
}

export default MapStructure
