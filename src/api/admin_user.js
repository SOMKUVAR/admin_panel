import axios from "axios";

const addAdminUser = async(adminUser) => await axios.post('http://localhost:5001/api/admin/admin_user',adminUser);

export {addAdminUser};