const pokedexGrid$$ = document.querySelector("#pokedex");
const POKEMONS_INFO = []; //guardamos en este array el objeto de cada pokemon
const searcher$$ = document.querySelector(".searcher");
const notFound$$ = document.createElement("h2");
notFound$$.textContent = "Ese pokemon no existe...DE MOMENTO";
notFound$$.classList.add("notfound");
document.body.appendChild(notFound$$);

//?Peticiones a la api
//Guardamos el primer fetch en la funcion getAllPokemos
const getAllPokemons = async () => {
  return fetch("https://pokeapi.co/api/v2/pokemon?limit=150")
    .then((response) => response.json())
    .then((response) => {
      return response.results;
    })
    .catch((error) =>
      console.log("Error obteniendo todos los pokemons", error)
    );
};
//Hacemos un segundo fetch pasandole el resultado de getAllPokemons
const getOnePokemon = async (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) =>
      console.log("Error obteniendo pokemon individual", error)
    );
};

//?BUSCADOR POR NOMBRE
const filterByName = (pokemons) => {
  const pokemonsFiltered$$ = [];
  for (let pokemon of pokemons) {
    if (pokemon.name.includes(searcher$$.value)) {
      pokemonsFiltered$$.push(pokemon);
    }
  }

  if (pokemonsFiltered$$.length === 0) {
    notFound$$.classList.add("notfound-display");
  } else {
    notFound$$.classList.remove("notfound-display");
  }

  renderPokedex(pokemonsFiltered$$);
};
//?BUSCADOR POR TIPO
const filterbyType = (value, pokemons) => {
  const pokemonsFilteredType$$ = [];
  for (let pokemon of pokemons) {
    for (let item of pokemon.types) {
      if (item.type.name.includes(value)) pokemonsFilteredType$$.push(pokemon);
    }
  }

  //console.log(pokemonsFilteredType$$);
  renderPokedex(pokemonsFilteredType$$);
}

//? Creando opciones para meter en la lista de tipos
const typeSelector$$ = document.querySelector(".types-selector");
typeSelector$$.addEventListener("input", () =>
  filterbyType(typeSelector$$.value, POKEMONS_INFO)
);
for (let type in typeColors) {
  const typeOption$$ = document.createElement("option");

  typeOption$$.textContent = type;
  typeOption$$.setAttribute("value", type);
  typeSelector$$.appendChild(typeOption$$);
  //dándole background color a cada tipo a traves del objeto typecolors
  typeOption$$.style.background = typeColors[typeOption$$.textContent];
}

//? Render pokemon cards
const renderPokedex = (pokemons) => {
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

//* funcion que inicia la página
const init = async () => {
  //guardamos el valor de la funcion getAllPokemos (objeto) en una variable, e iteramos sobre el para
  //conseguir la url de cada pokemon
  const allPokemons = await getAllPokemons();
  for (let pokemon of allPokemons) {
    //enviamos la url individual a la funcion con el segundo fetch y pusheamos su valor en un array para
    //guardar el objeto de cada pokemon
    let eachPokemon = await getOnePokemon(pokemon.url);
    POKEMONS_INFO.push(eachPokemon);
  }

  searcher$$.addEventListener("input", () => filterByName(POKEMONS_INFO));
  renderPokedex(POKEMONS_INFO);
}

init();
//console.log(POKEMONS_INFO);
