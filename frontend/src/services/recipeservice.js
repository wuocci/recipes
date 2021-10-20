import axios from "axios";
const baseUrl = "http://localhost:8080/api/recipes";

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};
const deleteRecipe = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id._id}`);
  return response.data;
};

const getRecipesByUser = async (userId) => {
  const request = await axios.get(`${baseUrl}/${userId}`);
  const response = request;
  return response.data;
};

const postNewRecipe = (recipe) => {
  const request = axios.post(baseUrl, recipe);
};

const updateRecipe = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  const response = await request;
  return response.data;
};

const toBeExported = {
  getAll,
  updateRecipe,
  deleteRecipe,
  getRecipesByUser,
  postNewRecipe,
};

export default toBeExported;
