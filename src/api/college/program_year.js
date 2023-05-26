import axios from "axios";


const fetchProgramYear = async (program_id) => await axios.get(`http://localhost:5001/api/admin/program_year/${program_id}`).then(res => res.data);


export {fetchProgramYear};
