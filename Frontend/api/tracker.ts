import axios from "axios";
import API from "./auth";



export  const getSpendingSummary = async () => {
  const response = await axios.get(`${API}/spending-summary`);
  return response.data;
};