import axios from "axios";

const addStudentMarks = async(subjects,student_id) => 
                       await axios.post('http://localhost:5001/api/admin/student_marks',{student_id,subjects})
                       .catch(err => console.log(err));

const fetchStudentMarksSemester = async(student_id,program_semester_id) => 
await axios.get(`http://localhost:5001/api/admin/student_marks/${student_id}/${program_semester_id}`).then(res => res.data).catch(err => console.log(err));
                                
const fetchStudentMarksYear = async(student_id,program_year_id) => 
await axios.get(`http://localhost:5001/api/admin/student_marks/${student_id}/${program_year_id}`).then(res => res.data).catch(err => console.log(err));

export {addStudentMarks,fetchStudentMarksSemester,fetchStudentMarksYear};