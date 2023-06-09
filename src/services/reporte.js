import API_INSTANCE from ".";

const URL = "/reporte";

 const getAll = async() => {
  const {data} = await API_INSTANCE.get(URL);
  return data;
}



const post = async(data)=> {
  await API_INSTANCE.post(URL,data);
}

const getForId = async(id) => {
  const {data} = await API_INSTANCE.get(`${URL}/${id}`);
 
  return data;
}


const put = async(data) => {
  await API_INSTANCE.put(`${URL}/${data.nReportes}`,data)
} 

const delForId = async(id) => {
  await API_INSTANCE.delete(`${URL}/${id}`)
}


const api_reporte = {
  getAll,
  getForId,
  post,
  put,
  delForId
}

export default api_reporte;
