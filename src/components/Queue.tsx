import React, { useState, useEffect, CSSProperties } from 'react'

import clsx from 'clsx'
import { defaultQueueOtions } from '../common/defaultValues'
import { formatAllSelectionsArray } from '../common/formatSelections'
import { formatElement } from '../common/formatElement'
import ElementBox from './ElementBox'

import { ArrayElement } from '../types/Elements'
import { QueueOptions } from '../types/Options'
import { Selection } from '../types/Selections'

import styles from '../styles/queue.module.css'

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
    const selections = formatAllSelectionsArray(select)
    const end = Math.min(elements.length, formatedOptions.elementsToShow)

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
            <div key={-1} className={styles.queueDot} />,
            <div key={-2} className={styles.queueDot} />,
            <div key={-3} className={styles.queueDot} />,
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
    <div style={style} className={clsx(styles.queueStructure, className)}>
      {components}
    </div>
  )
}

export default Queue
