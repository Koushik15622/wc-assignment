import axios from "axios";

const instance = axios.create({
  baseURL: "http://wc-assignment.vercel.app/",
  withCredentials: true,
});


export default instance;
