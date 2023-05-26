const COLUMNS = [
    {
        id: 'college_program_id',
        name: 'id',
        selector: (row) => row.college_program_id,
        width:'80px',
        sortable:true
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