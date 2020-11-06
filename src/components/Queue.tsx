import React, { useState, useEffect, CSSProperties } from 'react'

import clsx from 'clsx'
import { defaultQueueOtions } from '../common/defaultValues'
import { formatAllSelectionsArray } from '../common/formatSelections'
import { formatElement } from '../common/formatElement'
import ElementBox from './ElementBox'
import Dot from './Dot'

import { ArrayElement } from '../types/Elements'
import { QueueOptions } from '../types/Options'
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
  options?: QueueOptions
}
const Queue: React.FC<Props> = ({
  elements,
  style,
  className,
  select,
  options
}) => {
  const [components, setComponents] = useState([])

  useEffect(() => {
    const formatedOptions = options
      ? { ...defaultQueueOtions, ...options }
      : { ...defaultQueueOtions }

    const elementOptions = {
      ...defaultQueueOtions.element,
      ...formatedOptions.element
    }

    const defaultSelection = formatedOptions.selection.default as {
      style: CSSProperties
      className: string
    }
    const selections = formatAllSelectionsArray(select, defaultSelection)
    const end = Math.min(elements.length, formatedOptions.elementsToShow)

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

        if (index < end)
          return (
            <ElementBox
              showIndex={index === 0 && formatedOptions.showFrontIndex}
              index={formatedOptions.frontIndexLabel}
              key={index}
              className={className}
              style={style}
              value={value}
            />
          )
        else if (formatedOptions.showBack && index === elements.length - 1) {
          return [
            <Dot key={-1} />,
            <Dot key={-2} />,
            <Dot key={-3} />,
            <ElementBox
              showIndex={formatedOptions.showBackIndex}
              index={formatedOptions.backIndexLabel}
              key={index}
              className={className}
              style={style}
              value={value}
            />
          ]
        }
      })

    setComponents(components)
  }, [elements, options, select])
  return (
    <Container style={style} className={className}>
      {components}
    </Container>
  )
}

export default Queue
