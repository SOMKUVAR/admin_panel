const COLUMNS = [
    {
        id: 'semester_id',
        name: 'id',
        selector: (row) => row.semester_id,
        sortable:true
    },
  {
        id: 'semester',
        name: 'Semester',
        selector: (row) => row.semester,
        sortable:true
    }
];

export default COLUMNS;