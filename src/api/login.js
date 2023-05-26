import axios from "axios";


const emailContains = async (username) => await axios.post('http://localhost:5001/api/admin/email_contains',username).then(res => res.data);

const login = async (loginData) => await axios.post('http://localhost:5001/api/admin/login',loginData).then(res => res.data);

export {emailContains,login};