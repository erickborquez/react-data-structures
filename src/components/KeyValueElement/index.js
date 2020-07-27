import React from 'react'

import styles from './style.css'

const KeyValueElement = ({ style = {}, className = '', data }) => {
  return (
    <div className={`${styles.keyValueElement} ${className}`} style={style}>
      <span className={`${styles.keyValueElementValue}`}>{data.value}</span>
      <span className={`${styles.keyValueElementKey}`}>{data.key}</span>
    </div>
  )
}

export default KeyValueElement
