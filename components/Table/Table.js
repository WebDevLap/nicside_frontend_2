import React from 'react'

import styles from './Table.module.css'
const Table = ({data}) => {





  return (
    <div>
        <div>Всего объектов: {data?.count}</div>
        <div className={styles.table}>
            <div className={styles.table_header}>
                <div className={styles.image}>
                    
                    <img></img> 
                </div>
                <div className={styles.code}>
                    Код
                </div>
                <div className={styles.title}>
                    Наименование
                </div>
                <div>
                    Артикул
                </div>  
                <div>
                    
                </div>
                <div>
                    
                </div>
                <div>
                    
                </div>
            </div>
            {
                data?.data?.map(item => (
                    <div className={styles.table_row}>
                        <div className={styles.image}>
                            <img src={item.image}></img> 
                        </div>
                        <div className={styles.code}>
                            {item.code}
                        </div>
                        <div className={styles.title}>
                            {item.title}
                        </div>
                        <div>
                            {item.sku}  
                        </div>  
                        <div>
                            
                        </div>
                        <div>
                            
                        </div>
                        <div>
                            
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Table