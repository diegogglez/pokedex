
export const getOnePokemon = async (url) => {
    return fetch(url)
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .catch((error) =>
        console.log("Error obteniendo pokemon individual", error)
      );
};

  