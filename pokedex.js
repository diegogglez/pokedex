//*Prueba con bucle for

/* const url = 'https://pokeapi.co/api/v2/pokemon/'
let pokemonNumber = 0;
let pokemonInfo = [];



for (let i = 0; i <= 150; i++){
  pokemonNumber++;
  fetch(url + pokemonNumber)
    .then((response) => response.json())
    .then((pokemons) => pokemonInfo.push(pokemons));
} 

console.log(pokemonInfo);

div$$ = document.createElement('div');
h2$$ = document.createElement('h2');
img$$ = document.createElement('img');

h2$$.textContent = pokemonInfo[0].base_experience;

document.body.appendChild(h2$$); */

//* prueba con funciones

const pokedexGrid$$ = document.querySelector('#pokedex');
const POKEMONS_INFO = [];

//?Guardamos el primer fetch en la funcion getAllPokemos

 function getAllPokemons() {
  return fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
    .then((response) => response.json())
    .then((response) => {
      return response.results;
    })
    .catch((error) => console.log('Error obteniendo todos los pokemons', error));
}

 function getOnePokemon(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) => console.log('Error obteniendo pokemon individual', error));
}

function renderPokedex(pokemons){

  for (let pokemon of pokemons){
    
    const card$$ = document.createElement('li');
    const img$$ = document.createElement('img');
    const name$$ = document.createElement('h2');
    const id$$ = document.createElement('p');

    card$$.classList.add('card')
  
    img$$.src = pokemon.sprites.front_default;
    name$$.textContent = pokemon.name;
    id$$.textContent = pokemon.id;
  
    card$$.appendChild(img$$);
    card$$.appendChild(name$$);
    card$$.appendChild(id$$);
    pokedexGrid$$.appendChild(card$$);

  }


}


async function init(){
  //?guardamos el valor de la funcion getAllPokemos (objeto) en una variable, e iteramos sobre el para 
  //?conseguir la url de cada pokemon
  const allPokemons = await getAllPokemons();
  /* console.log(allPokemons); */
  
  for(let pokemon of allPokemons) {
    //?enviamos la url individual a la funcion con el segundo fetch y pusheamos su valor en un array para 
    //?guardar el objeto de cada pokemon
    let eachPokemon = await getOnePokemon(pokemon.url);
    POKEMONS_INFO.push(eachPokemon);
  }

  renderPokedex(POKEMONS_INFO);
}

init()
console.log(POKEMONS_INFO);










