import React from 'react'
import DataTable from 'react-data-table-component';

const Table = (props) => {
  return (
    <div className='border border-box'>
        <DataTable columns={props.columns} data={props.data} responsive={true} paginationPerPage={5} paginationDefaultPage ={5} pagination/>
    </div>
  )
}

export default Table