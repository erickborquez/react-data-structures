import React, { useEffect, useState } from 'react'

import ElementBox from '../ElementBox'

import { defaultElementOptions } from '../../common/defaultValues'
import { getSelections2DFormated } from '../../common/selections'

import { resizeArray } from '../../common/utilities'

import styles from './style.css'

const Array2D = ({
  className = '',
  select = null,
  elements = null,
  elementOptions = null
}) => {
  const [components, setComponents] = useState([[]])

  useEffect(() => {
    if (!elements) return
    const selections = select ? getSelections2DFormated(select) : []
    const options = { ...defaultElementOptions, ...(elementOptions || {}) }
    const maxElements = elements.reduce(
      (acc, array) => Math.max(acc, array.length),
      0
    )
    const elementsFormated = elements.map((arr) =>
      resizeArray(arr, maxElements, '')
    )
    const components = elementsFormated.map((arr, i) =>
      arr.map((value, j) => {
        let className = options.className || ''
        let style = options.style || {}
        selections.forEach((s) => {
          if (s.callback(i, j, value)) {
            className = `${className} ${s.className}`
            style = { ...style, ...s.style }
          }
        })
        return (
          <ElementBox
            onClick={(event) => options.onClick(i, j, value, event)}
            showIndexTop={i === 0}
            indexTop={j}
            showIndexLeft={j === 0}
            indexLeft={i}
            key={j}
            className={className}
            style={style}
            data={value}
          />
        )
      })
    )
    setComponents(components)
  }, [elements, elementOptions, select])

  return (
    <div
      className={`${styles.array2dContainer} ${className}`}
      style={{
        gridTemplateColumns: `repeat(${components[0].length},min-content)`,
        gridTemplateRows: `repeat(${components.length},min-content)`
      }}
    >
      {components}
    </div>
  )
}

export default Array2D
