import axios from "axios";
import authHeader from "./authheader";

const API_URL = "http://localhost:8080/api/test/";
const BASE_URL = "http://localhost:8080/api/recipes/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

/*const addFavourite = async (id, newObject) => {
  const request = axios.put(`${BASE_URL}/${id}`, newObject);
  const response = await request;
  return response.data;
};*/

export default {
  addFavourite,
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};
