import axios from "axios";

const fetchProgramType = async() => await axios.get('http://localhost:5001/api/admin/program_type').then(res => res.data);

const addProgramType = async(programTypeData) => await axios.post('http://localhost:5001/api/admin/program_type',programTypeData);

const updateProgramType = async(programTypeData) => await axios.put('http://localhost:5001/api/admin/program_type',programTypeData);


export {fetchProgramType,addProgramType,updateProgramType};