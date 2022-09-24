import Header from "../../layout/Header/Header"
import Table from "../../Table/Table"
import { TableMockup } from "../../Table/Table.mockup"

const HomeScreen = () => {
  return (
    <div>
        <Header/>
        <Table data={TableMockup}></Table>
    </div>
  )
}

export default HomeScreen