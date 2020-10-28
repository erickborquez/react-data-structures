import React, { useEffect, useState } from 'react'

import clsx from 'clsx'

import { defaultArrayOptions } from '../common/defaultValues'
import { formatAllSelectionsArray2D } from '../common/formatSelections'
import { formatElement } from '../common/formatElement'
import ElementBox from './ElementBox'

import { ArrayElement } from '../types/Elements'
import { ArrayOptions } from '../types/Options'
import { Selection2D } from '../types/Selections'

import { resizeArray } from '../common/utilities'

import styled, { CSSProperties } from 'styled-components'

const Container = styled.div`
  display: grid;
  grid-auto-columns: min-content;
  grid-template-rows: auto;
  justify-content: center;
`

interface Props {
  elements: ArrayElement[][]
  className?: string
  select?: Selection2D | Selection2D[]
  options?: ArrayOptions
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

    const defaultSelection = formatedOptions.selection.default as {
      style: CSSProperties
      className: string
    }

    const selections = formatAllSelectionsArray2D(select, defaultSelection)

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
          let selected = false
          selections.forEach((selection) => {
            if (selection.eval(element, [i, j], elementsResized)) {
              selected = true
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
    <Container
      className={className}
      style={{
        gridTemplateColumns: `repeat(${components[0].length}, min-content)`,
        gridTemplateRows: `repeat(${components.length}, min-content)`
      }}
    >
      {components}
    </Container>
  )
}

export default Array2D
