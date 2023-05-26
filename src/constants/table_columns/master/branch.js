const COLUMNS = [
    {
        id: 'branch_id',
        name: 'id',
        selector: (row) => row.branch_id,
        width:'80px',
        sortable:true
    }, {
        id: 'program_type',
        name: 'Branch',
        selector: (row) => row.branch_name,
        sortable:true
    },{
        id: 'program_name',
        name: 'Program',
        selector: (row) => row.program_name,
        sortable:true
    }
];

export default COLUMNS;