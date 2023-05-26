import axios from "axios";

const fetchYear = async() => await axios.get('http://localhost:5001/api/admin/year').then(res => res.data);

const addYear = async(yearData) => await axios.post('http://localhost:5001/api/admin/year',yearData);

const updateYear = async(yearData) => await axios.put('http://localhost:5001/api/admin/year',yearData);


export {fetchYear,addYear,updateYear};