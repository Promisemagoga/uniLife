import axios from "axios";

const API = axios.create({
  baseURL: "http://10.16.211.11:5000/api",
});

export default API;
