import React, { useEffect, useState } from 'react'

import clsx from 'clsx'

import { defaultArrayOptions } from '../common/defaultValues'
import { formatAllSelectionsArray2D } from '../common/formatSelections'
import { formatElement } from '../common/formatElement'
import ElementBox from './ElementBox'

import { ArrayElement } from '../types/Elements'
import { Options } from '../types/Options'
import { Selection2D } from '../types/Selections'

import { resizeArray } from '../common/utilities'

import styles from '../styles/array2d.module.css'

interface Props {
  elements: ArrayElement[][]
  className?: string
  select?: Selection2D | Selection2D[]
  options?: Options
}
const Array2D: React.FC<Props> = ({
  className = '',
  select,
  elements,
  options
}) => {
  const [components, setComponents] = useState([[]])

  useEffect(() => {
    if (!elements) return
    const formatedOptions = options
      ? { ...defaultArrayOptions, ...options }
      : { ...defaultArrayOptions }

    const elementOptions = {
      ...defaultArrayOptions.element,
      ...formatedOptions.element
    }

    const selections = formatAllSelectionsArray2D(select)

    const maxElements = elements.reduce(
      (acc, array) => Math.max(acc, array.length),
      0
    )

    const elementsResized: ArrayElement[][] = elements.map((arr) =>
      resizeArray(arr, maxElements, '')
    )

    const components = elementsResized.map((arr, i) =>
      arr
        .map((element) => formatElement(element, elementOptions))
        .map((element, j) => {
          let { className, style, value } = element
          selections.forEach((selection) => {
            if (selection.eval(element, [i, j], elementsResized)) {
              className = `${className} ${selection.className}`
              style = { ...style, ...selection.style }
            }
          })
          const indexPosition = []
          if (i === 0) indexPosition.push('top')
          if (j === 0) indexPosition.push('left')
          return (
            <ElementBox
              showIndex={true}
              indexPosition={indexPosition}
              index={{ top: j, left: i }}
              key={j}
              className={className}
              style={style}
              value={value}
            />
          )
        })
    )
    setComponents(components)
  }, [elements, options, select])

  return (
    <div
      className={clsx(styles.array2dContainer, className)}
      style={{
        gridTemplateColumns: `repeat(${components[0].length}, min-content)`,
        gridTemplateRows: `repeat(${components.length}, min-content)`
      }}
    >
      {components}
    </div>
  )
}

export default Array2D
