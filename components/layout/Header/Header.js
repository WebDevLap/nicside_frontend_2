import { Icon } from '@iconify/react'
import React from 'react'
import styles from './Header.module.css'

const Header = () => {
  return (
    <div className={styles.header}>
       <div className={styles.logo}>
            <img src='/VAPELOGO.svg'></img>
        </div> 
        <div className={styles.search}>
            <div className={styles.input__wrapper}>
                <Icon icon="eva:search-fill" />
                <input placeholder='Введите название, артикул или код товара'></input>
            </div>
            <button className='primary__button'>Найти</button>
        </div>
    </div>
  )
}

export default Header