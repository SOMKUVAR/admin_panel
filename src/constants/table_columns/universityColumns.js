const COLUMNS = [
    {
        id: 'university_id',
        name: 'id',
        selector: (row) => row.university_id,
        width: '80px',
        sortable: true
    }, {
        id: 'name',
        name: 'name',
        selector: (row) => row.university_name,
        maxWidth: '300px',
        sortable: true
    }, {
        id: 'registration_number',
        name: 'registration_number',
        selector: (row) => row.registration_number,
        maxWidth: '150px'
    }, {
        id: 'email',
        name: 'email',
        selector: (row) => row.email,
        maxWidth: '200px'
    }, {
        id: 'contact_number',
        name: 'contact_number',
        selector: (row) => row.contact_number,
        maxWidth: '150px'
    }, {
        id: 'address',
        name: 'address',
        selector: (row) => row.address
    }, {
        id: 'password',
        name: 'Password',
        selector: (row) => row.password
    }
];

export default COLUMNS;