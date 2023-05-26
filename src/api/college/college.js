import axios from "axios";

const fetchAllColleges = async () => await axios.get("http://localhost:5001/api/admin/colleges").then((res) => res.data);

const addCollege = async (collegeData) => await axios.post("http://localhost:5001/api/admin/college", collegeData);

const updateCollege= async (collegeData) => await axios.put("http://localhost:5001/api/admin/college", collegeData);

const fetchColleges = async(university_id) => await axios.get(`http://localhost:5001/api/admin/colleges/${university_id}`).then(res => res.data);

export {fetchAllColleges,addCollege,updateCollege,fetchColleges};