import API_INSTANCE from ".";
const URL = "/subregion/South America?fields=name";

const getSouthAmerica = async() => {
  const {data} = await API_INSTANCE.get(URL);

  let dataFinal =  (data.map(country => (
    {
      
      value : country.name.common
    }
  )));

  return (
    dataFinal
   );
}

const api_countries = {
  getSouthAmerica
}

export default api_countries;