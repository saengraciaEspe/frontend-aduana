import axios from 'axios'
const BASE_URL = "http://localhost:3000/api";
const BASE_URL_PAIS = "";
const API_ADUANA= axios.create({baseURL: BASE_URL});
const API_PAISES = axios.create({baseURL: BASE_URL_PAIS});

API_ADUANA.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) =>{
    console.log("Error", error);
    return Promise.reject(error);
  }

)

API_PAISES.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) =>{
    console.log("Error", error);
    return Promise.reject(error);
  }

)

const API_INSTANCE = {
  API_ADUANA,
  API_PAISES
}

export default  API_INSTANCE;