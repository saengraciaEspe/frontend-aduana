import API_INSTANCE from ".";

const URL = "/traslado";

 const getAll = async() => {
  const {data} = await API_INSTANCE.API_ADUANA.get(URL);
  return data;
}



const post = async(data)=> {
  await API_INSTANCE.API_ADUANA.post(URL,data);
}

const getForId = async(id) => {
  const {data} = await API_INSTANCE.API_ADUANA.get(`${URL}/${id}`);
 
  return data;
}


const put = async(data) => {
  await API_INSTANCE.API_ADUANA.put(`${URL}/${data.codigoTraslado}`,data)
} 

const delForId = async(id) => {
  await API_INSTANCE.API_ADUANA.delete(`${URL}/${id}`)
}


const api_traslado = {
  getAll,
  getForId,
  post,
  put,
  delForId
}

export default api_traslado;
