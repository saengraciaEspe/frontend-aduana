import API_INSTANCE from ".";

const URL = "/clima";

const getAllpg = async() => {
  const {data} = await API_INSTANCE.get("/postgres"+URL);
  return data;
}

const api_climas_pg = {
  getAllpg,
 
}

export default api_climas_pg;