import axios from "axios";


const fetchProgramSemester = async (program_id) => await axios.get(`http://localhost:5001/api/admin/program_semester/${program_id}`).then(res => res.data);


export {fetchProgramSemester};
