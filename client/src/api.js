import axios from "axios";

const instance = axios.create({
  baseURL: "https://5b7e-38-27-127-37.ngrok-free.app",
  withCredentials: true,
});


export default instance;
