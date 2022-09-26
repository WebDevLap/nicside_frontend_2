import React, { useState } from 'react'
import formatPrice from '../../utils/formatPrice'

import styles from './Table.module.css'
import TableCategory from './TableCategory'
import TableRow from './TableRow'

const TableContainer = ({data}) => {

    const [hidden, setHidden] = useState([])



  return (
    <div className={styles.table}>
        <div className={styles.table_header}>
            <div className={styles.image}>
                
                <img></img> 
            </div>
            {/* <div className={styles.code}>
                Код
            </div> */}
            <div className={styles.title}>
                Наименование
            </div>
            {/* <div className={styles.sku}>
                Описание
            </div>   */}
            <div className={styles.amount}>
                Количество
            </div>
            
            <div className={styles.table__prices}>
                <p>Цены</p>
                <div className={styles.price}>
                    от 100 руб.
                </div>
                <div className={styles.price}>
                    от 200 руб.
                </div>
                <div className={styles.price}>
                    от 500 руб.
                </div>
            </div>
            <div className={styles.summ}>
                Сумма
            </div>
        </div>
        {
            data?.map((item, index) => {

                if (item?.pathName != data?.[index - 1]?.pathName) {
                    return (
                        <>
                        <TableCategory setHidden={setHidden} item={item}/>
                        <TableRow hidden={hidden} item={item}/>
                        </>
                    )
                } else {
                    return (
                        <TableRow hidden={hidden} item={item}/>
                    )
                }

            })
        }
    </div>
  )
}

export default TableContainer