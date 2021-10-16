import axios from "axios";
const baseUrl = "http://localhost:8080/api/recipes";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};
const deleteRecipe = async (id, newObject) => {
  const response = await axios.delete(`${baseUrl}/${id}`, newObject);
  return response.data;
};

const getRecipesByUser = (userId) => {
  const request = axios.get(`${baseUrl}/${userId}`);
  request
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      } else if (error.request) {
        return error.request;
      } else {
        return error.message;
      }
    });
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
