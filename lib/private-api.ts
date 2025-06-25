import axios from "axios";

const privateApi = axios.create({
  baseURL: "http://168.231.96.194:3000/api",
});

export default privateApi;
