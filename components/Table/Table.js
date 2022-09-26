import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../../contexts/ProductsContext'
import TableContainer from './TableContainer'
const Table = ({data}) => {


  const [products, setProducts] = useContext(ProductContext)

  const fetchProducts = async () => {
    let products = await fetch('http://localhost:8080/online.moysklad.ru/api/remap/1.2/entity/product', {
        headers: {
          'Authorization': 'e90e31c9edb91eb7a9907e90de541cecce642a76'
        }
      })
      products = await products.json()

      products = products?.rows?.map(item => item)

      products = products.sort(function (a, b) {
          return (a?.pathName).localeCompare(b?.pathName);
      })

      setProducts(products)

  }

  useEffect(() => {
    fetchProducts()
    console.log(products)
  }, [])


  return (
    <div>
        {/* <div>Всего объектов: {data?.count}</div> */}
        {/* <div>Оплата производится белорусскими рублями</div> */}
        <TableContainer data={products}></TableContainer>
    </div>
  )
}

export default Table