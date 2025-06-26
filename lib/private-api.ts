import axios from "axios";

const privateApi = axios.create({
  baseURL: "http://168.231.96.194/api",
});

export default privateApi;
