import React, { useEffect, useState, CSSProperties } from 'react'
import styled from 'styled-components'

import { defaultArrayOptions } from '../common/defaultValues'
import { formatAllSelectionsArray } from '../common/formatSelections'
import { formatElement } from '../common/formatElement'
import ElementBox from './ElementBox'

import { ArrayElement } from '../types/Elements'
import { ArrayOptions } from '../types/Options'
import { Selection } from '../types/Selections'

const Container = styled.div`
  display: flex;
`

interface Props {
  elements: ArrayElement[]
  className?: string
  style?: CSSProperties
  select?: Selection | Selection[]
  options?: ArrayOptions
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

    const selections = formatAllSelectionsArray(select, defaultSelection)

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
    <Container className={className} style={style}>
      {components}
    </Container>
  )
}

export default Array1D
