/**
 * @param {string} searchQuery Search query
 * @param {*} pokemons List of pokemons to sort by search query
 */
export const filterByName = (pokemons, searchQuery) => {
    const pokemonsFiltered$$ = [];
    for (let pokemon of pokemons) {
      if (pokemon.name.includes(searchQuery)) {
        pokemonsFiltered$$.push(pokemon);
      }
    }
    
    return pokemonsFiltered$$.length > 0 ? pokemonsFiltered$$ : null;
};
