import React, { useState, useEffect } from 'react'

import ElementBox from './ElementBox'

import { getSelections1DFormated } from '../common/selections'
import { defaultArrayOptions } from '../common/defaultValues'

import styles from '../styles/queue.module.css'

const Queue = ({
  className = '',
  elements,
  elementsToShow = 5,
  showBack = false,
  elementOptions,
  select = null
}) => {
  const [components, setComponents] = useState([])

  useEffect(() => {
    if (!elements) return
    const options = { ...defaultArrayOptions, ...(elementOptions || {}) }
    const selections = select !== null ? getSelections1DFormated(select) : []

    const components = []
    const to = Math.min(elements.length, elementsToShow)

    const createElement = (index, value, indexTop) => {
      let className = options.className || ''
      let style = options.style || {}

      selections.forEach((s) => {
        if (s.callback(index, value)) {
          className = `${className} ${s.className}`
          style = { ...style, ...s.style }
        }
      })
      return (
        <ElementBox
          showIndex={indexTop || false}
          index={indexTop}
          key={index}
          className={className}
          style={style}
          value={value}
        />
      )
    }

    components.push(createElement(0, elements[0], 'Front'))
    for (let index = 1; index < to; index++)
      components.push(createElement(index, elements[index], ' '))
    if (showBack && to !== elements.length) {
      components.push(<div key={-1} className={`${styles.queueDot}`} />)
      components.push(<div key={-2} className={`${styles.queueDot}`} />)
      components.push(<div key={-3} className={`${styles.queueDot}`} />)
      components.push(
        createElement(
          elements.length - 1,
          elements[elements.length - 1],
          'Back'
        )
      )
    }

    setComponents(components)
  }, [elements, elementsToShow, elementOptions, select, showBack])
  return (
    <div className={`${styles.queueStructure} ${className}`}>{components}</div>
  )
}

export default Queue
