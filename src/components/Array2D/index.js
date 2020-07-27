import React, { useEffect, useState } from 'react'

import ElementBox from '../ElementBox'

import { defaultElementOptions } from '../../common/defaultValues'
import { getSelections2DFormated } from '../../common/selections'

import { resizeArray } from '../../common/utilities'

import styles from './style.css'

const Array2D = ({
  className = '',
  select = null,
  array2D,
  elementOptions = null
}) => {
  const [elements, setElement] = useState([[]])

  useEffect(() => {
    const selections = select ? getSelections2DFormated(select) : []
    console.log(selections)
    const options = { ...defaultElementOptions, ...(elementOptions || {}) }
    const maxElements = array2D.reduce(
      (acc, array) => Math.max(acc, array.length),
      0
    )
    const array2DFormated = array2D.map((arr) =>
      resizeArray(arr, maxElements, '😎')
    )
    const components = array2DFormated.map((arr, i) =>
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
    setElement(components)
  }, [array2D, elementOptions, select])

  return (
    <div
      className={`${styles.array2dContainer} ${className}`}
      style={{
        gridTemplateColumns: `repeat(${elements[0].length},min-content)`,
        gridTemplateRows: `repeat(${elements.length},min-content)`
      }}
    >
      {elements}
    </div>
  )
}

export default Array2D
