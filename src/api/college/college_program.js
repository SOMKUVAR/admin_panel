import axios from "axios";

const fetchAllCollegesProgram = async () => await axios.get('http://localhost:5001/api/admin/college_program').then(res => res.data);

const addCollegeProgram = async (collegeProgramData) => axios.post('http://localhost:5001/api/admin/college_program', collegeProgramData);

const updateCollegeProgram = async (collegeProgramData) => axios.put('http://localhost:5001/api/admin/college_program', collegeProgramData);

const fetchCollegePrograms = async (college_id) => await axios.get(`http://localhost:5001/api/admin/college_program/${college_id}`).then(res => res.data);

const fetchCollegeProgramId = async (college_id, program_id) => await axios.get(`http://localhost:5001/api/admin/college_program_id/${college_id}/${program_id}`).then(res => res.data);

const fetchAllCollegesProgramOfUniversity = async(university_id) => await axios.get(`http://localhost:5001/api/admin/university/college_program/${university_id}`).then(res => res.data);
export {
    fetchAllCollegesProgram,
    addCollegeProgram,
    updateCollegeProgram,
    fetchCollegePrograms,
    fetchCollegeProgramId,
    fetchAllCollegesProgramOfUniversity
};
