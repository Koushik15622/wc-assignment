import axios from "axios";

const instance = axios.create({
  baseURL: "https://wc-assignment-17j6crbbw-koushik15622s-projects.vercel.app/",
  withCredentials: true,
});


export default instance;
