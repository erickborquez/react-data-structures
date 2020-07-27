import React, { useEffect, useState } from 'react'

import ElementBox from '../ElementBox'

import { getSelections1DFormated } from '../../common/selections'
import { defaultElementOptions } from '../../common/defaultValues'

import styles from './style.css'

const Stack = ({
  className = '',
  elements,
  elementsToShow = 5,
  showRear = false,
  elementOptions,
  select = null
}) => {
  const [components, setComponents] = useState([])

  useEffect(() => {
    if (!elements) return
    const options = { ...defaultElementOptions, ...(elementOptions || {}) }
    const selections = select !== null ? getSelections1DFormated(select) : []

    const components = []
    const from = Math.max(0, elements.length - elementsToShow)

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
          onClick={(event) => options.onClick(index, value, event)}
          showIndexTop={indexTop || false}
          indexTop={indexTop}
          key={index}
          className={className}
          style={style}
          data={value}
        />
      )
    }

    if (showRear && from !== 0) {
      components.push(createElement(0, elements[0], 'Rear'))
      components.push(<div key={-1} className={`${styles.stackDot}`} />)
      components.push(<div key={-2} className={`${styles.stackDot}`} />)
      components.push(<div key={-3} className={`${styles.stackDot}`} />)
    }
    for (let index = from; index < elements.length - 1; index++)
      components.push(createElement(index, elements[index], ' '))
    components.push(
      createElement(elements.length - 1, elements[elements.length - 1], 'Top')
    )

    setComponents(components)
  }, [elements, elementsToShow, elementOptions, select, showRear])

  return (
    <div className={`${styles.stackStructure} ${className}`}>{components}</div>
  )
}

export default Stack
