import axios from 'axios'
<<<<<<< HEAD
const BASE_URL = "http://localhost:3000/api";
=======
const BASE_URL = "http://localhost:4001/api";
>>>>>>> 290b827312cb383b6e0ddbecb75514fc865e9a27
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