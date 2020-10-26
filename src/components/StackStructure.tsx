import React, { useState, useEffect, CSSProperties } from 'react'

import clsx from 'clsx'
import { defaultStackOptions } from '../common/defaultValues'
import { formatAllSelectionsArray } from '../common/formatSelections'
import { formatElement } from '../common/formatElement'
import ElementBox from './ElementBox'

import { ArrayElement } from '../types/Elements'
import { StackOptions } from '../types/Options'
import { Selection } from '../types/Selections'
import styles from './../styles/stackStructure.module.css'

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

    const selections = formatAllSelectionsArray(select)
    const start =
      elements.length -
      Math.min(elements.length, formatedOptions.elementsToShow)

    const components = elements
      .map((element) => formatElement(element, elementOptions))
      .map((element, index) => {
        let { className, style, value } = element
        selections.forEach((select) => {
          if (select.eval(element, index, elements)) {
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
            <div key={-1} className={styles.stackDot} />,
            <div key={-2} className={styles.stackDot} />,
            <div key={-3} className={styles.stackDot} />
          ]
        }
      })

    setComponents(components)
  }, [elements, options, select])

  return (
    <div className={clsx(styles.stackStructure, className)}>{components}</div>
  )
}

export default Stack
