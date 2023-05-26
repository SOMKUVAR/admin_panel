import axios from "axios";

const fetchCollegeProgramBranch = async () => await axios.get('http://localhost:5001/api/admin/college_branch').then(res => res.data);

const addCollegeProgramBranch = async(collegeProgramBranchData) => axios.post('http://localhost:5001/api/admin/college_branch',collegeProgramBranchData);

const updateCollegeProgramBranch = async(collegeProgramBranchData) => axios.put('http://localhost:5001/api/admin/college_branch',collegeProgramBranchData);

const fetchAllCollegesBranchOfUniversity = async(university_id) => await axios.get(`http://localhost:5001/api/admin/university/college_branch/${university_id}`).then(res => res.data);

export {fetchCollegeProgramBranch,addCollegeProgramBranch,updateCollegeProgramBranch,fetchAllCollegesBranchOfUniversity};