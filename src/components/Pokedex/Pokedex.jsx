import Search from "../Search/Search";
import React from "react";
import "./Pokedex.css";
import Pokemonlist from "../PokemonList/PokemonList";

const Pokedex = () => {
  return (
    <div className="pokedex-wrapper">
      <Search />
      <Pokemonlist />
    </div>
  );
};

export default Pokedex;
