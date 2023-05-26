import axios from "axios";

const fetchStatus = async() => await axios.get('http://localhost:5001/api/admin/status').then(res => res.data);

export {fetchStatus};