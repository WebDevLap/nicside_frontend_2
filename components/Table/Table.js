import React, { useContext, useEffect, useState } from 'react'
import ReactLoader from 'react-loader'
import ReactPaginate from 'react-paginate'
import { CategoryContext } from '../../contexts/CategoryContext'
import { ProductContext } from '../../contexts/ProductsContext'
import TableContainer from './TableContainer'
const Table = ({data}) => {


  const [products, setProducts] = useContext(ProductContext)
  const [category, setCategory] = useContext(CategoryContext)

  
  const itemsPerPage = 100
  const pageCount = Math.floor(products?.size / 100) + 1

  console.log(pageCount)


  


  const handlePageClick = (event) => {
    console.log(event.selected,  itemsPerPage)
    const newOffset = event.selected * itemsPerPage;
    console.log(newOffset)
    setCategory(prev => ({...prev, offset: newOffset}))
  };



  return (
    <div>
        {/* <div>Всего объектов: {data?.count}</div> */}
        {/* <div>Оплата производится белорусскими рублями</div> */}
        <ReactLoader loaded={!products?.isLoading}>
          {products?.products?.length == 0 ? (
            <h2>Товаров по вашему запросу не обнаружено</h2>
          ) : (
            <>
            <TableContainer data={products?.products} showCategory={category?.category == ''}></TableContainer>
            
            </>
          )}
          
        </ReactLoader>
        
        <ReactPaginate
            disabledLinkClassName="disabled_page"
            nextLinkClassName="page"
            previousLinkClassName="page"
            activeLinkClassName="active_page"
            breakLabel="..."
            className={products?.isLoading ? 'none' :'pagi'}
            nextLabel=">"
            pageLinkClassName="page"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    </div>
  )
}

export default Table