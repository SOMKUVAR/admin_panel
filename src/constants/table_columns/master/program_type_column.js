const COLUMNS = [
    {
        id: 'program_type_id',
        name: 'id',
        selector: (row) => row.program_type_id,
        width:'80px',
        sortable:true
    }, {
        id: 'program_type',
        name: 'Program Type',
        selector: (row) => row.program_type,
        sortable:true
    }
];

export default COLUMNS;