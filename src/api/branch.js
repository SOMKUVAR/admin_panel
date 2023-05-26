import axios from "axios";

const fetchBranches = async() => await axios.get('http://localhost:5001/api/admin/branch').then(res => res.data);

const addBranch = async(programTypeData) => await axios.post('http://localhost:5001/api/admin/branch',programTypeData);

const updateBranch = async(programTypeData) => await axios.put('http://localhost:5001/api/admin/branch',programTypeData);

const fetchCollegeBranch = async(college_program_id) => await axios.get(`http://localhost:5001/api/admin/college_branch/${college_program_id}`).then(res => res.data);


export {fetchBranches,addBranch,updateBranch,fetchCollegeBranch};