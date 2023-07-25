import API_INSTANCE from ".";

const URL = "/pais";

const getAllpg = async() => {
  const {data} = await API_INSTANCE.get("/postgres"+URL);
  return data;
}

const api_paises_pg = {
  getAllpg,
 
}

export default api_paises_pg;