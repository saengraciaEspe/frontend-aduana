import API_INSTANCE from ".";

const URL = "/producto";

 const getAll = async() => {
  const {data} = await API_INSTANCE.API_ADUANA.get(URL);
  return data;
}
 


const post = async(data)=> {
  await API_INSTANCE.post(URL,data);
}

const getForId = async(id) => {
  const {data} = await API_INSTANCE.API_ADUANA.get(`${URL}/${id}`);
 
  return data;
}


const put = async(data) => {
  await API_INSTANCE.API_ADUANA.put(`${URL}/${data.partidaId}`,data)
} 

const delForId = async(id) => {
  await API_INSTANCE.delete(`${URL}/${id}`)
}


const api_producto = {
  getAll,
  getForId,
  post,
  put,
  delForId
}

export default api_producto;
