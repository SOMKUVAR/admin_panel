const COLUMNS = [
    {
        id:"program_name",
        name:"Program Name",
        selector:(row) => row.program_name,
        minWidth:"250px"
    },
    {
        id:"branch_name",
        name:"Branch Name",
        selector:(row) => row.branch_name,
        minWidth:"250px"
    },
   {
        id: 'subject_code',
        name: 'Subject Code',
        selector: (row) => row.subject_code,
        sortable:true
    }, {
        id: 'subject_name',
        name: 'Subject Name',
        minWidth:'250px',
        selector: (row) => row.subject_name
    },
    {
        id:"subject_subtype_id",
        name:"Subject Type",
        cell: (row) => (
            <>
              <div className="flex items-center">
                {row.subject_subtype === 0 ? row.subject_type : row.subject_type+"-"+row.subject_subtype}
              </div>
            </>
          ),
          minWidth:'150px'
    },
     {
        id: 'theory_marks',
        name: 'Theory Marks',
        selector: (row) => row.theory_marks,
        width:'150px',
        center:true
    },
    {
        id: 'theory_passing_marks',
        name: 'Theory Passing Marks',
        selector: (row) => row.theory_passing_marks,
        center:true
    },
    {
        id:"practical_marks",
        name:"Practical Marks",
        selector:(row) => row.practical_marks,
        width:'150px',
        center:true
    },
    {
        id:"practical_passing_marks",
        name:"Practical Passing Marks",
        selector:(row) => row.practical_passing_marks,
        center:true
    },
    {
        id:"semester-year",
        name:"semester/year",
        cell: (row) => (
            <>
              <div className="flex items-center">
                {row.program_year_id === 0 ? row.semester+" semester": row.year+" year"}
              </div>
            </>
          ),
    },
    {
       id:"college_name",
       name:"College Name",
       selector:(row) => row.college_name,
       minWidth:"250px"
    },
    {   
        id:'status',
        name: 'Status',
        width:'170px',
        cell: (row) => (
          <>
            <div className="flex items-center">
               <button className={`p-1 px-4 ${row.status === 1 ? 'bg-green-700' : 'bg-red-700'} text-white text-xs font-bold`}>
                     {row.status === 1 ? "Active" : "InActive"}
               </button>
            </div>
          </>
        ),
    }
    
]

export default COLUMNS;