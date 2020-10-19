import * as React from 'react'

import styles from '../styles/keyValueElement.module.css'

const KeyValueElement = ({
  style = {},
  className = '',
  data,
  onClick = (val: any) => {}
}) => {
  return (
    <div
      className={`${styles.keyValueElement} ${className}`}
      style={style}
      onClick={onClick}
    >
      <span className={`${styles.keyValueElementValue}`}>{data.value}</span>
      <span className={`${styles.keyValueElementKey}`}>{data.key}</span>
    </div>
  )
}

export default KeyValueElement
