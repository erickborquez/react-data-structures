import React from 'react'
import clsx from 'clsx'

import { position } from '../types/Shared'
import { KeyValueElement } from '../types/Elements'

import styles from '../styles/keyValueElement.module.css'

interface Props extends KeyValueElement {
  keyPosition?: position
  showKey?: boolean
}

const KeyValueElementBox: React.FC<Props> = ({
  value,
  keyValue,
  className = '',
  style = {},
  keyPosition = 'bottom',
  showKey = true
}) => {
  return (
    <div className={clsx(styles.keyValueElement, className)} style={style}>
      <span className={styles.keyValueElementValue}>{value}</span>
      <span className={styles.keyValueElementKey}>{keyValue}</span>
    </div>
  )
}

export default KeyValueElementBox
