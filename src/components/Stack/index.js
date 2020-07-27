import React, { useEffect, useState } from 'react'

import ElementBox from '../ElementBox'

import { getSelections1DFormated } from '../../common/selections'
import { defaultElementOptions } from '../../common/defaultValues'

import styles from './style.css'

const Stack = ({
  className = '',
  stack,
  elementsToShow = 1,
  showRear = false,
  elementOptions,
  select = null
}) => {
  const [elements, setElements] = useState([])

  useEffect(() => {
    const options = { ...defaultElementOptions, ...(elementOptions || {}) }
    const selections = select !== null ? getSelections1DFormated(select) : []

    const components = []
    const from = Math.max(0, stack.length - elementsToShow)

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
      components.push(createElement(0, stack[0], 'Rear'))
      components.push(<div key={-1} className={`${styles.stackDot}`} />)
      components.push(<div key={-2} className={`${styles.stackDot}`} />)
      components.push(<div key={-3} className={`${styles.stackDot}`} />)
    }
    for (let index = from; index < stack.length - 1; index++)
      components.push(createElement(index, stack[index], ' '))
    components.push(
      createElement(stack.length - 1, stack[stack.length - 1], 'Top')
    )

    setElements(components)
  }, [stack, elementsToShow, elementOptions, select, showRear])

  return (
    <div className={`${styles.stackStructure} ${className}`}>{elements}</div>
  )
}

export default Stack
