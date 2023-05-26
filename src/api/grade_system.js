import axios from "axios";

const fetchGrade = async(university_id) => await axios.get(`http://localhost:5001/api/admin/grade/${university_id}`).then(res => res.data);

const addGrade = async(gradeSystemData) => await axios.post('http://localhost:5001/api/admin/grade',gradeSystemData);

const updateGrade = async(gradeSystemData) => await axios.put('http://localhost:5001/api/admin/grade',gradeSystemData);


export {addGrade,fetchGrade,updateGrade};