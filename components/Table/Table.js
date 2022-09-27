import React, { useContext, useEffect, useState } from 'react'
import ReactLoader from 'react-loader'
import { ProductContext } from '../../contexts/ProductsContext'
import TableContainer from './TableContainer'
const Table = ({data}) => {


  const [products, setProducts] = useContext(ProductContext)



  return (
    <div>
        {/* <div>Всего объектов: {data?.count}</div> */}
        {/* <div>Оплата производится белорусскими рублями</div> */}
        <ReactLoader loaded={!products?.isLoading}>
          <TableContainer data={products?.products}></TableContainer>
        </ReactLoader>
    </div>
  )
}

export default Table