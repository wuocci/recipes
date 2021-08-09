import axios from 'axios'
const baseUrl = '/'
const logUrl = '/LoginPage'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response =>  response.data)
}

const login = async (credentials)  => {
  const response = await axios.post(logUrl, credentials)
  return response.data
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async newObject => {
  const config = {    
    headers: { Authorization: token },  
}

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
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

const toBeExported =  { getAll, login, updateRecipe, create, setToken, deleteRecipe }

export default toBeExported

