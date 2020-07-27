import React from 'react'

import styles from './styles.css'

const ElementBox = ({
  className = '',
  style = {},
  data = '',
  showIndexTop = false,
  indexTop = 0,
  showIndexLeft = false,
  indexLeft = 0,
  ...options
}) => {
  return (
    <div
      {...options}
      className={`${styles.elementBox} ${className} ${
        showIndexTop ? `${styles.elementBoxShowTop}` : ''
      } ${showIndexLeft ? `${styles.elementBoxShowLeft}` : ''}`}
      style={style}
    >
      {showIndexTop && (
        <span
          className={`${styles.elementBoxIndex} ${styles.elementBoxIndexTop}`}
        >
          {indexTop}
        </span>
      )}
      {showIndexLeft && (
        <span
          className={`${styles.elementBoxIndex} ${styles.elementBoxIndexLeft}`}
        >
          {indexLeft}
        </span>
      )}

      {data}
    </div>
  )
}

export default ElementBox
