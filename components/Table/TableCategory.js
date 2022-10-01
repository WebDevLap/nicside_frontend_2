import { Icon } from '@iconify/react'
import React, { useContext, useState } from 'react'
import { ProductContext } from '../../contexts/ProductsContext'
import styles from './Table.module.css'

const TableCategory = ({item, setHidden, showButton, data}) => {

  const [products, setProducts] = useContext(ProductContext)
  const [isOpen, setIsOpen] = useState(false)


  const sortedProducts = data?.filter(product => product?.product?.pathName == item?.product?.pathName)?.map(item => item.id)


  const handleHide = (e) => {
    setIsOpen(true)

    // console.log(sortedProducts)

    setHidden(prev => {
      return [
        ...prev, 
        ...sortedProducts
      ]
    })

  }

  
  const handleShow = (e) => {
    setIsOpen(false)

    setHidden(prev => ([
      ...prev.filter(hiddenItem => !sortedProducts.includes(hiddenItem)),
    ]))

  }

  // console.log(item)

  return (
    <div className={styles.table__category}>
      <p>{item?.product?.pathName || item?.pathName}</p>
        {isOpen ? (
          <Icon onClick={handleShow} icon="bx:plus"  />
        ) : (
          <Icon onClick={handleHide} icon="bx:minus"  />
        )}
    </div>
  )
}

export default TableCategory