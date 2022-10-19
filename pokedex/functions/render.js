/**
 * Given an array of pokemons, render a list to DOM
 * @param {*} pokemons Array of pokemons to render
 */

export const render = (pokemons) => {
    const pokedexGrid$$ = document.querySelector("#pokedex");
    pokedexGrid$$.innerHTML = "";
  
    for (let pokemon of pokemons) {
      const card$$ = document.createElement("li");
      const pickContainer$$ = document.createElement("div");
      const infoContainer$$ = document.createElement("div");
      const img$$ = document.createElement("img");
      const name$$ = document.createElement("h2");
      const id$$ = document.createElement("p");
      const typesContainer$$ = document.createElement("div");
  
      card$$.classList.add("card");
      pickContainer$$.classList.add("pick-container");
      infoContainer$$.classList.add("info-container");
      img$$.classList.add("img");
      typesContainer$$.classList.add("typesContainer");
      id$$.classList.add("pokemonId");
  
      img$$.src = pokemon.sprites.other.dream_world.front_default;
      name$$.textContent = pokemon.name;
      id$$.textContent = `#${pokemon.id}`;
  
      pickContainer$$.appendChild(img$$);
      infoContainer$$.appendChild(id$$);
      infoContainer$$.appendChild(name$$);
      card$$.appendChild(pickContainer$$);
      card$$.appendChild(infoContainer$$);
      pokedexGrid$$.appendChild(card$$);
  
      //recorremos el array de tipos con un for of para sacar parrafos con cada tipo
      for (let item of pokemon.types) {
        const typeName$$ = document.createElement("p");
  
        typeName$$.classList.add("typeName");
        typeName$$.textContent = item.type.name;
  
        typesContainer$$.appendChild(typeName$$);
        infoContainer$$.appendChild(typesContainer$$);
  
        //dándole background color a cada tipo a traves del objeto typecolors
        typeName$$.style.backgroundColor = typeColors[typeName$$.textContent];
      }
    }
}