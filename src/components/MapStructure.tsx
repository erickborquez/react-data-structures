import * as React from 'react'

import KeyValueElement from './KeyValueElement'

import { getSelectionsKeyValue } from '../common/selections'
import { defaultArrayOptions } from '../common/defaultValues'

import styles from '../styles/mapStructure.module.css'

const MapStructure = ({
  className = '',
  elements,
  elementOptions = null,
  select = null
}) => {
  const [components, setComponents] = React.useState([])

  React.useEffect(() => {
    let elementsCopy = elements || []
    const options = { ...defaultArrayOptions, ...(elementOptions || {}) }
    const selections = select !== null ? getSelectionsKeyValue(select) : []
    const createElement = (data, i) => {
      const { key, value } = data
      let className = options.className || ''
      let style = options.style || {}
      selections.forEach((s) => {
        if (s.callback(key, value)) {
          className = `${className} ${s.className}`
          style = { ...style, ...s.style }
        }
      })
      return (
        <KeyValueElement
          // onClick={(event) => options.onClick(key, value, event)}
          // key={`${i}-${key}-${value}`}
          className={className}
          style={style}
          data={data}
        />
      )
    }
    setComponents(elementsCopy.map(createElement))
  }, [elements, elementOptions, select])

  return (
    <div className={`${styles.mapStructure} ${className}`}>{components}</div>
  )
}

export default MapStructure
