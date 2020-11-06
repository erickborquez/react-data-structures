import React, { useState, useEffect, CSSProperties } from 'react'

import clsx from 'clsx'
import { defaultStackOptions } from '../common/defaultValues'
import { formatAllSelectionsArray } from '../common/formatSelections'
import { formatElement } from '../common/formatElement'
import ElementBox from './ElementBox'
import Dot from './Dot'

import { ArrayElement } from '../types/Elements'
import { StackOptions } from '../types/Options'
import { Selection } from '../types/Selections'

import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
`

interface Props {
  elements: ArrayElement[]
  className?: string
  style?: CSSProperties
  select?: Selection | Selection[]
  options?: StackOptions
}
const Stack: React.FC<Props> = ({
  elements,
  style,
  className,
  select,
  options
}) => {
  const [components, setComponents] = useState([])

  useEffect(() => {
    const formatedOptions = options
      ? { ...defaultStackOptions, ...options }
      : { ...defaultStackOptions }

    const elementOptions = {
      ...defaultStackOptions.element,
      ...formatedOptions.element
    }

    const defaultSelection = formatedOptions.selection.default as {
      style: CSSProperties
      className: string
    }

    const selections = formatAllSelectionsArray(select, defaultSelection)
    const start =
      elements.length -
      Math.min(elements.length, formatedOptions.elementsToShow)

    const components = elements
      .map((element) => formatElement(element, elementOptions))
      .map((element, index) => {
        let { className, style, value } = element
        let selected = false
        selections.forEach((select) => {
          if (select.eval(element, index, elements)) {
            selected = true
            className = `${className} ${select.className}`
            style = { ...style, ...select.style }
          }
        })

        if (index >= start)
          return (
            <ElementBox
              showIndex={
                index === elements.length - 1 && formatedOptions.showTopIndex
              }
              index={formatedOptions.topIndexLabel}
              key={index}
              className={className}
              style={style}
              value={value}
            />
          )
        else if (formatedOptions.showRear && index === 0) {
          return [
            <ElementBox
              showIndex={formatedOptions.showRearIndex}
              index={formatedOptions.rearIndexLabel}
              key={index}
              className={className}
              style={style}
              value={value}
            />,
            <Dot key={-1} />,
            <Dot key={-2} />,
            <Dot key={-3} />
          ]
        }
      })

    setComponents(components)
  }, [elements, options, select])

  return <Container className={className}>{components}</Container>
}

export default Stack
