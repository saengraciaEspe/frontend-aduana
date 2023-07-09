import API_INSTANCE from ".";



const URL = "/aduana";

 const getAll = async() => {
  const {data} = await API_INSTANCE.API_ADUANA.get(URL);
  return data;
}

const getAllPais = async() => {
  const {data} = await API_INSTANCE.API_PAISES.get();
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
  await API_INSTANCE.API_ADUANA.put(`${URL}/${data.nitAgenteAduana}`,data)
} 

const delForId = async(id) => {
  await API_INSTANCE.API_ADUANA.delete(`${URL}/${id}`)
}


const api_agente_aduana = {
  getAll,
  getForId,
  post,
  put,
  delForId,
  getAllPais,
}

export default api_agente_aduana;
