import axios from "axios";

const fetchPrograms = async() => await axios.get('http://localhost:5001/api/admin/program_master').then(res => res.data);

const addProgram = async(programData) => await axios.post('http://localhost:5001/api/admin/program_master',programData).then(res => res.data.insertId);

const updateProgram = async(programData) => await axios.put('http://localhost:5001/api/admin/program_master',programData);

const addProgramSemster = async(programSemesterData) => await axios.post('http://localhost:5001/api/admin/program_semester',programSemesterData);

const addProgramYear = async(programYearData) => await axios.post('http://localhost:5001/api/admin/program_year',programYearData);

const fetchProgramExamType = async(program_id) => await axios.get(`http://localhost:5001/api/admin/exam_system/${program_id}`).then(res => res.data);


export {fetchPrograms,addProgram,updateProgram,addProgramSemster,addProgramYear,fetchProgramExamType};