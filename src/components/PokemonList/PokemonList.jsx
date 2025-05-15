import React, { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoding] = useState(true);
  const [pokedexUrl, setPokedexUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );

  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");

  async function downloadPokemons() {
    setIsLoding(true);
    const response = await axios.get(pokedexUrl); // this download 20 pokemons
    const pokemonResults = response.data.results; // we get the array of pokemon from results

    console.log(response.data);
    setNextUrl(response.data.next);
    setPrevUrl(response.data.previous);

    // iterating over the array of pokemons and using their url, to create an array of promises
    // that will download those 20 pokemons
    const pokemonResultsPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );
    // console.log(pokemonResultsPromise);

    // passing that promise array to axios.all
    const pokemonData = await axios.all(pokemonResultsPromise); // array of 20 pokemon details data
    // console.log(pokemonData);

    // Now iterate on the each pokemon and extract id, name, image and types
    const pokeListResult = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other
          ? pokemon.sprites.other.dream_world.front_default
          : pokemon.sprites.front.shine,
        types: pokemon.types,
      };
    });
    // console.log(pokeListResult);
    setPokemonList(pokeListResult);
    setIsLoding(false);
  }
  useEffect(() => {
    // console.log("effect called");
    downloadPokemons();
  }, [pokedexUrl]);

  return (
    <div className="pokemon-list-wrapper">
      <div className="pokemon-wrapper">
        {isLoading
          ? "Data is loading"
          : pokemonList.map((p) => (
              <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
            ))}
      </div>
      <div className="controls">
        <button
          id="btn-control"
          disabled={!prevUrl}
          onClick={() => setPokedexUrl(prevUrl)}
        >
          previous
        </button>
        <button
          id="btn-control"
          disabled={!nextUrl}
          onClick={() => setPokedexUrl(nextUrl)}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
