import axios from 'axios'
const BASE_URL = "https://restcountries.com/v3.1";
const API_INSTANCE = axios.create({baseURL: BASE_URL});


API_INSTANCE.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) =>{
    console.log("Error", error);
    return Promise.reject(error);
  }

)

export default API_INSTANCE;