import axios from "axios";

const fetchSemester = async() => await axios.get('http://localhost:5001/api/admin/semester').then(res => res.data);

const addSemester = async(programTypeData) => await axios.post('http://localhost:5001/api/admin/semester',programTypeData);

const updateSemester = async(programTypeData) => await axios.put('http://localhost:5001/api/admin/semester',programTypeData);


export {fetchSemester,addSemester,updateSemester};