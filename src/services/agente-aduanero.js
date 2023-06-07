import API_INSTANCE from ".";

const URL = "api/aduana";

export const get = async() => {
  const {data} = await API_INSTANCE.get(URL);
  return data;
}
 


export const post = async( {  } )=> {

}
