const COLUMNS = [
   {
        id: 'minPercentage',
        name: 'Min Percentage',
        selector: (row) => row.minPercentage,
        sortable: true
    }, {
        id: 'maxPercentage',
        name: 'Max Percentage',
        selector: (row) => row.maxPercentage,
    }, {
        id: 'grade',
        name: 'Grade',
        selector: (row) => row.grade,
    }, {
        id: 'description',
        name: 'Description',
        selector: (row) => row.description
    }
];

export default COLUMNS;