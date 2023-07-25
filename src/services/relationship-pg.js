import API_INSTANCE from ".";

const URL = "/postgres/relationship";

 const getAll = async() => {
  const {data} = await API_INSTANCE.get(URL);
  return data;
}


const api_relationship_pg = {
  getAll
}

export default api_relationship_pg;
