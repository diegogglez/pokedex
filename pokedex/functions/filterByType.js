
export const filterByType = (value, pokemons) => {
    const pokemonsFilteredType$$ = [];
    for (let pokemon of pokemons) {
      for (let item of pokemon.types) {
        if (item.type.name.includes(value) || value === 'Select') {
          pokemonsFilteredType$$.push(pokemon);
        }    
      }
    }
  
    return pokemonsFilteredType$$;
}
  
