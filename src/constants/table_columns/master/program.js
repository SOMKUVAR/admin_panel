const COLUMNS = [
    {
        id: 'program_id',
        name: 'id',
        selector: (row) => row.program_id,
        width: '80px',
        sortable: true
    }, {
        id: 'program_name',
        name: 'Program Name',
        selector: (row) => row.program_name,
        sortable: true
    },{
        id: 'program_type',
        name: 'Program Type',
        selector: (row) => row.program_type,
        sortable: true
    },
     {
        id: 'duration',
        name: "Duration (Year)",
        selector: (row) => row.duration,
        center:true
    }, {
        id: 'semester',
        name: 'Exam System',
        cell: (row) => (
            <>
                <div className="flex items-center">
                    {row.semester === 0 ? 'Annual' : 'Semester'}
                </div>
            </>
        ),
    }
];

export default COLUMNS;