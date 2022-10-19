import { render } from './functions/render.js';
import { filterByName } from './functions/filterByName.js';
import { filterByType } from './functions/filterByType.js';
import { getAllPokemons } from './api/getAllPokemons.js';
import { getOnePokemon } from './api/getOnePokemon.js';

export const Pokedex = {
    render: render,
    filterByName: filterByName,
    filterByType: filterByType,
    getAllPokemons: getAllPokemons,
    getOnePokemon: getOnePokemon
}