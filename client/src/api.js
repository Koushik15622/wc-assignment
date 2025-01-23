import axios from "axios";

const instance = axios.create({
  baseURL: "https://wc-assignment.vercel.app/",
  withCredentials: true,
});


export default instance;
