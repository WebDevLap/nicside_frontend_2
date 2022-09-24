import { Icon } from '@iconify/react'
import React from 'react'
import styles from './Table.module.css'

const TableCategory = () => {
  return (
    <div className={styles.table__category}>
      <p>Железо</p>
      <Icon icon="bx:minus"  />
    </div>
  )
}

export default TableCategory