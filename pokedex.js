import { Pokedex } from './pokedex/index.js';


const POKEMONS_INFO = []; //guardamos en este array el objeto de cada pokemon
const searcher$$ = document.querySelector("#mainSearchInput");
const notFound$$ = document.createElement("h2");
notFound$$.textContent = "Ese pokemon no existe...DE MOMENTO";
notFound$$.classList.add("notfound");
document.body.appendChild(notFound$$);


//* funcion que inicia la página
const init = async () => {

  /**
   * Initialize type selector and its event listeners
   */
  const typeSelector$$ = document.querySelector(".types-selector");
  typeSelector$$.addEventListener("input", () => {
    const result = Pokedex.filterByType(typeSelector$$.value, POKEMONS_INFO);
    Pokedex.render(result);
  });
  for (let type in typeColors) {
    const typeOption$$ = document.createElement("option");

    typeOption$$.textContent = type;
    typeOption$$.setAttribute("value", type);
    typeSelector$$.appendChild(typeOption$$);
    //dándole background color a cada tipo a traves del objeto typecolors
    typeOption$$.style.background = typeColors[typeOption$$.textContent];
  }

  /**
   * guardamos el valor de la funcion getAllPokemos (objeto) en una variable, e iteramos sobre el para
   * conseguir la url de cada pokemon
   */
  const allPokemons = await Pokedex.getAllPokemons();
  for (let pokemon of allPokemons) {
    //enviamos la url individual a la funcion con el segundo fetch y pusheamos su valor en un array para
    //guardar el objeto de cada pokemon
    let eachPokemon = await Pokedex.getOnePokemon(pokemon.url);
    POKEMONS_INFO.push(eachPokemon);
  }
  
  /**
   * Input event listener
   */
  searcher$$.addEventListener("input", (event) => {
    const results = Pokedex.filterByName(POKEMONS_INFO, event.target.value.toLowerCase());
    if (results) {
      notFound$$.classList.remove("notfound-display");
      Pokedex.render(results);
    } else {
      notFound$$.classList.add("notfound-display");
    }
  });

  // Render
  Pokedex.render(POKEMONS_INFO);
}

init();
//console.log(POKEMONS_INFO);
