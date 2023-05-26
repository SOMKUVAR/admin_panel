const COLUMNS = [
    {
        id: 'year_id',
        name: 'id',
        selector: (row) => row.year_id,
        sortable:true
    },
  {
        id: 'year',
        name: 'Year',
        selector: (row) => row.year,
        sortable:true
    }
];

export default COLUMNS;