import axios from "axios";

const fetchUniversities = async () =>  await axios.get("http://localhost:5001/api/admin/universities").then((res) => res.data);

const fetchUniversityName = async () => await axios.get("http://localhost:5001/api/admin/university_name").then(res => res.data);

const addUniversity = async (universityData) => await axios.post("http://localhost:5001/api/admin/university", universityData).then(res => res.data.insertId);

const updateUniversity = async (universityData) => await axios.put("http://localhost:5001/api/admin/university", universityData);

export {fetchUniversities,addUniversity,updateUniversity,fetchUniversityName};