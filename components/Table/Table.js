import React, { useContext, useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { CategoryContext } from '../../contexts/CategoryContext'
import { ProductContext } from '../../contexts/ProductsContext'
import TableContainer from './TableContainer'
import InfiniteScroll from 'react-infinite-scroller';
import { BeatLoader } from 'react-spinners'
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


  const handleMore = (event) => {
    console.log(event)
    // console.log(event.selected,  itemsPerPage)
    const newOffset = event * itemsPerPage;
    console.log(!products?.isLoading)
    if(!products?.isLoading) {



    
      setProducts((prev) => ({
        ...prev,
        size: 0,
        isLoading: true,
        categories: products?.categories
      }))

      setCategory(prev => ({...prev, offset: newOffset}))
    }
    // console.log(newOffset)
  };



  return (
    <div>
        {/* <div>Всего объектов: {data?.count}</div> */}
        {/* <div>Оплата производится белорусскими рублями</div> */}
        {/* <ReactLoader loaded={!products?.isLoading}> */}
          {products?.products?.length == 0 && !products?.isLoading ? (
            <div style={{margin: '30px auto', width: '100%', display: 'flex', justifyContent: 'center'}} className="loader" key={0}>Ничего не найдено...</div>
          ) : products?.products?.length == 0 && products?.isLoading ? (
            <div style={{margin: '30px auto', width: '100%', display: 'flex', justifyContent: 'center'}} className="loader" key={0}><BeatLoader color="#402E7D" /></div>
          ) : (
            <>

            <InfiniteScroll
                pageStart={0}
                loadMore={handleMore}
                hasMore={products?.products?.length != products?.size}
                loader={<div style={{margin: '30px auto', width: '100%', display: 'flex', justifyContent: 'center'}} className="loader" key={0}><BeatLoader color="#402E7D" /></div>}
            >
              <TableContainer data={products?.products} showCategory={category?.category == ''}></TableContainer>
            </InfiniteScroll>
            
            </>
          )}
          
        {/* </ReactLoader> */}
        {/* <ReactPaginate
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
        /> */}
    </div>
  )
}

export default Table