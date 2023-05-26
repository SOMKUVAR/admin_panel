import axios from "axios";

const fetchSubject = async(university_id) => await axios.get(`http://localhost:5001/api/admin/subject/${university_id}`).then(res => res.data);

const addSubject = async(subjectData) => await axios.post('http://localhost:5001/api/admin/subject',subjectData);

const updateSubject = async(subjectData) => await axios.put('http://localhost:5001/api/admin/subject',subjectData);

const fetchSubjectType = async () => await axios.get('http://localhost:5001/api/admin/subject_type').then(res => res.data);

const fetchSubjectSemesterWise = async(college_branch_id,program_semester_id) =>  
await axios.get(`http://localhost:5001/api/admin/subject/${college_branch_id}/${program_semester_id}`).then(res => res.data);


const fetchSubjectYearWise = async(college_branch_id,program_year_id) =>  
await axios.get(`http://localhost:5001/api/admin/subject/${college_branch_id}/${program_year_id}`).then(res => res.data);

export {addSubject,fetchSubject,updateSubject,fetchSubjectType,fetchSubjectSemesterWise,fetchSubjectYearWise};