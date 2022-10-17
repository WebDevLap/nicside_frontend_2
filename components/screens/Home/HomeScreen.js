import { useState } from "react"
import ReactPaginate from "react-paginate"
import Header from "../../layout/Header/Header"
import Sidebar from "../../layout/Sidebar/Sidebar"
import Table from "../../Table/Table"
import { TableMockup } from "../../Table/Table.mockup"
import styles from './HomeScreen.module.css'

const HomeScreen = () => {


  return (
    <div className={styles.home}>
        <Sidebar></Sidebar>
        <div className={styles.main}>
          <Header/>
          <Table data={TableMockup}></Table>
        </div>
    </div>
  )
}

export default HomeScreen