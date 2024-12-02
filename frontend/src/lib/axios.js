import axios from "axios";

export const axioInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});
