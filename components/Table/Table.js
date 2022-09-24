import React from 'react'
import TableContainer from './TableContainer'
const Table = ({data}) => {





  return (
    <div>
        {/* <div>Всего объектов: {data?.count}</div> */}
        {/* <div>Оплата производится белорусскими рублями</div> */}
        <TableContainer data={data?.data}></TableContainer>
    </div>
  )
}

export default Table