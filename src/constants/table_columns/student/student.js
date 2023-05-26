const COLUMNS = [
    {
         id: 'roll_number',
         name: 'Roll Number',
         selector: (row) => row.roll_number,
         sortable:true
     }, {
         id: 'student_name',
         name: 'Student Name',
         minWidth:'250px',
         selector: (row) => row.student_name
     },
    {
         id: 'father_name',
         name: 'Father Name',
         selector: (row) => row.father_name,
         width:'150px',
     },
     {   
        id:'status',
        name: 'Status',
        width:'170px',
        cell: (row) => (
          <>
            <div className="flex items-center">
                      {row.status === 1 ? "Regular" : "Non Regular"}
              </div>
          </>
        ),
    },
    {
        id: 'email',
        name: 'Email Id',
        selector: (row) => row.email,
        minWidth:'250px',
    },
    {
        id: 'password',
        name: 'Password',
        selector: (row) => row.password,
        minWidth:'150px',
    },
     {
         id:"branch_name",
         name:"Branch Name",
         selector:(row) => row.branch_name,
         minWidth:"250px"
     },
     {
         id:"program_name",
         name:"Program Name",
         selector:(row) => row.program_name,
         minWidth:"250px"
     },
     {
        id:"college_name",
        name:"College Name",
        selector:(row) => row.college_name,
        minWidth:"250px"
     }
     
 ]
 
 export default COLUMNS;