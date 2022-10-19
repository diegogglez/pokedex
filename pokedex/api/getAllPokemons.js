
//Guardamos el primer fetch en la funcion getAllPokemos
export const getAllPokemons = async () => {
    return fetch("https://pokeapi.co/api/v2/pokemon?limit=150")
      .then((response) => response.json())
      .then((response) => {
        return response.results;
      })
      .catch((error) =>
        console.log("Error obteniendo todos los pokemons", error)
      );
};
