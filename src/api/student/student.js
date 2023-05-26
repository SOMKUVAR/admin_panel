import axios from "axios";

const fetchStudent = async(university_id) => await axios.get(`http://localhost:5001/api/admin/student/${university_id}`).then(res => res.data);

const addStudent = async(studentData) => await axios.post('http://localhost:5001/api/admin/student',studentData);

const updateStudent = async(studentData) => await axios.put('http://localhost:5001/api/admin/student',studentData);

const fetchStudents = async(college_branch_id) => await axios.get(`http://localhost:5001/api/admin/student/${college_branch_id}`).then(res => res.data);

const fetchStudentDetail = async(student_id) => await axios.get(`http://localhost:5001/api/admin/studentDetail/${student_id}`).then(res => res.data);


export {fetchStudent,addStudent,updateStudent,fetchStudents,fetchStudentDetail};