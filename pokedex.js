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


const typeColors = {
  fire: "#e50020",
  grass: "#00a63c",
  steel: "#00858a",
  water: "#0050ac",
  psychic: "#c90086",
  ground: "#c90086",
  ice: "#70deff",
  flying: "#5d4e75",
  ghost: "#4d5b64",
  normal: "#753845",
  poison: "#c94772",
  rock: "#6e1a00",
  fighting: "#634136",
  dark: "#272625",
  bug: "#6e1a00",
  dragon: "#00c431",
  electric: "#bba909",
  fairy: "#d31c81",
  unknow: "#757575",
  shadow: "#29292c",
}
const pokedexGrid$$ = document.querySelector('#pokedex');
const POKEMONS_INFO = [];

//?Guardamos el primer fetch en la funcion getAllPokemos

 async function getAllPokemons() {
  return fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
    .then((response) => response.json())
    .then((response) => {
      return response.results;
    })
    .catch((error) => console.log('Error obteniendo todos los pokemons', error));
}

 async function getOnePokemon(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) => console.log('Error obteniendo pokemon individual', error));
}

function setTypeColors(p) {

  p.style.backgroundColor = typeColors[p.textContent];

}

function renderPokedex(pokemons){

  for (let pokemon of pokemons){
    
    const card$$ = document.createElement('li');
    const pickContainer$$ = document.createElement('div');
    const infoContainer$$ = document.createElement('div');
    const img$$ = document.createElement('img');
    const name$$ = document.createElement('h2');
    const id$$ = document.createElement('p');
    const typesContainer$$ = document.createElement('div')
    //const type$$ = document.createElement('p');

    card$$.classList.add('card')
    pickContainer$$.classList.add('pick-container');
    infoContainer$$.classList.add('info-container');
    img$$.classList.add('img');
    typesContainer$$.classList.add('typesContainer')
    id$$.classList.add('pokemonId')
  
    img$$.src = pokemon.sprites.other.dream_world.front_default;
    name$$.textContent = pokemon.name;
    id$$.textContent = `#${pokemon.id}`;
  
    pickContainer$$.appendChild(img$$);
    infoContainer$$.appendChild(id$$);
    infoContainer$$.appendChild(name$$);
    card$$.appendChild(pickContainer$$);
    card$$.appendChild(infoContainer$$);
    pokedexGrid$$.appendChild(card$$);

    for (let item of pokemon.types) {

      const typeName$$ = document.createElement('p');
      
      typeName$$.classList.add('typeName')
      typeName$$.textContent = item.type.name;

      typesContainer$$.appendChild(typeName$$);
      infoContainer$$.appendChild(typesContainer$$);

      setTypeColors(typeName$$);
    }


  }


}
//? Creando opciones para meter en la lista de tipos

  for (let type in typeColors) {
    /* console.log('Bucle forin',type); */
    const typeOption$$ = document.createElement('option');
    const typeSelector$$ = document.querySelector('.types-selector');
    
    typeOption$$.textContent = type;
    typeOption$$.setAttribute('value', type);

    typeSelector$$.appendChild(typeOption$$);

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










