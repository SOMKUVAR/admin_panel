const COLUMNS = [
    {
        id: 'college_branch_id',
        name: 'id',
        selector: (row) => row.college_branch_id,
        width:'80px',
        sortable:true
    }, 
    {
        id: 'branch_name',
        name: 'Branch Name',
        selector: (row) => row.branch_name
    },
    {
        id: 'program_name',
        name: 'Program Name',
        selector: (row) => row.program_name
    },
    {
        id: 'college_name',
        name: 'College Name',
        selector: (row) => row.college_name,
        sortable:true
    }, {
        id: 'university_name',
        name: 'University Name',
        selector: (row) => row.university_name
    }
];

export default COLUMNS;