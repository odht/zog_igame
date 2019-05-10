import React from 'react';
import Table from './table.js';
import Message from './message';
import index from './index.css';
import table from './table.css';
const TableCell = (props) => {
    const {tableData, size, scale, margin ,click,render} = props
    return (
        <div className={index.flexColumn + ' ' + table.tableBorder + ' ' + table.tableCard}>
            {/* <Message teamData={tableData.match_id.name} /> */}
            <div className={index.flexRow + ' ' + table.tableBorder}>
                <div className={table.tableSplit + ' ' + index.flexItemASpace} >
                    <Table size={size} scale={scale} margin={margin} render={render} tableData={tableData} type={"open"}/>
                </div>
                <div style={{ paddingLeft: "8PX" }} className={index.flexItemASpace}>
                    <Table size={size} scale={scale} margin={margin} render={render} tableData={tableData}  type={"close"}/>
                </div>
            </div>
        </div>
    )
}
export default React.memo(TableCell)