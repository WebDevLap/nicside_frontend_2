import { Icon } from '@iconify/react'
import React, { useContext, useState } from 'react'
import { ProductContext } from '../../contexts/ProductsContext'
import styles from './Table.module.css'

const TableCategory = ({item, setHidden}) => {

  const [products, setProducts] = useContext(ProductContext)
  const [isOpen, setIsOpen] = useState(false)


  const sortedProducts = products.filter(product => product?.pathName == item?.pathName)?.map(item => item.id)


  const handleHide = (e) => {
    setIsOpen(true)

    setHidden(prev => ([
      ...prev, 
      ...sortedProducts
    ]))

  }

  
  const handleShow = (e) => {
    setIsOpen(false)

    setHidden(prev => ([
      ...prev.filter(hiddenItem => !sortedProducts.includes(hiddenItem)),
    ]))

  }

  return (
    <div className={styles.table__category}>
      <p>{item?.pathName}</p>
      {isOpen ? (
        <Icon onClick={handleShow} icon="bx:plus"  />
      ) : (
        <Icon onClick={handleHide} icon="bx:minus"  />
      )}
    </div>
  )
}

export default TableCategory