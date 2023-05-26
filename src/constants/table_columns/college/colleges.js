const COLUMNS = [
    {
        id: 'college_id',
        name: 'id',
        selector: (row) => row.college_id,
        width:'80px',
        sortable:true
    }, {
        id: 'college_name',
        name: 'College Name',
        selector: (row) => row.college_name,
        sortable:true
    }, {
        id: 'university_name',
        name: 'University Name',
        selector: (row) => row.university_name
    },
     {
        id: 'registration_number',
        name: 'Registration Number',
        selector: (row) => row.registration_number,
        width:'150px'
    },
     {
        id: 'email',
        name: 'Email Id',
        selector: (row) => row.email,
        maxWidth:'150px'
    },{
        id:'contact_number',
        name:'Contact Number',
        selector:(row) => row.contact_number,
        maxWidth:'150px'
    },{
        id:'address',
        name:'Address',
        selector:(row) => row.address
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
];

export default COLUMNS;