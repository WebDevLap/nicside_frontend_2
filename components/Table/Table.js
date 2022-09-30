import React, { useContext, useEffect, useState } from 'react'
import ReactLoader from 'react-loader'
import { CategoryContext } from '../../contexts/CategoryContext'
import { ProductContext } from '../../contexts/ProductsContext'
import TableContainer from './TableContainer'
const Table = ({data}) => {


  const [products, setProducts] = useContext(ProductContext)
  const [category, setCategory] = useContext(CategoryContext)



  return (
    <div>
        {/* <div>Всего объектов: {data?.count}</div> */}
        {/* <div>Оплата производится белорусскими рублями</div> */}
        <ReactLoader loaded={!products?.isLoading}>
          {products?.products?.length == 0 ? (
            <h2>Товаров по вашему запросу не обнаружено</h2>
          ) : (
            <TableContainer data={products?.products} showCategory={category?.category == ''}></TableContainer>
          )}
        </ReactLoader>
    </div>
  )
}

export default Table