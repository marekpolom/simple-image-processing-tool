import axios from "axios";

export const defaultAxios = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
});