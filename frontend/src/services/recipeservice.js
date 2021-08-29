import axios from 'axios'
const baseUrl = '/'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response =>  response.data)
}
const deleteRecipe = async (id, newObject) => {
  const response = await axios.delete(`${baseUrl}/${id}`, newObject)
  return response.data
}


const updateRecipe = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  const response = await request
  return response.data
}

const toBeExported =  { getAll, updateRecipe, deleteRecipe }

export default toBeExported

