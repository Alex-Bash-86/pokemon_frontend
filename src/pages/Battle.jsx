import { useState } from "react";

const Battle = () => {
  /* const [fightPokemons, setFightPokemons] = useState(() => {
    return JSON.parse(localStorage.getItem("pokemon_roster")).slice(0, 3) || [];
  }); */

  const fightPokemons =
    JSON.parse(localStorage.getItem("pokemon_roster")) || [];
  const [pokemonFighter, setPokemonFighter] = useState(null);
  // Daten aus der localStorage laden

  console.log("pokemon_roster", fightPokemons);

  const pokeStorage = JSON.parse(localStorage.getItem("fight_pokemon"));

  console.log("fight_pokemon", pokeStorage);

  const handleClick = id => {
    const foundPokemon = fightPokemons.find(p => p.id === id);
    setPokemonFighter(foundPokemon);
  };

  //get random pokemon image
  const randomPokemonIndex = () => {
    const randomIndex = Math.floor(Math.random() * pokeStorage.length) + 1;
    return randomIndex;
  };

  const randomIndex = randomPokemonIndex();

  return (
    <div className="grid grid-cols-[1fr] w-full  h-full ">
      <div className="   space-x-4   carousel carousel-center max-w-lg border border-amber-50 ">
        {fightPokemons.map(p => (
          <div
            onClick={() => handleClick(p.id)}
            className="border border-white p-8 rounded-lg transition-transform duration-200 hover:scale-105 hover:drop-shadow-[0_0_10px_#362617] cursor-pointer carousel-item w-[80px] h-[80px] "
            key={p.id}
          >
            <div>
              <p className="text-xs">{p.name}</p>
              <img
                className=" object-contain  w-full aspect-square rounded-box  mx-auto mt-4 p-4"
                src={p.spriteUrl}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between gap-4 mx-auto sm:mx-4 items-center   ">
        <div className=" bg-white rounded shadow flex flex-col items-center justify-center   max-w-80 max-h-80  px-4 space-y-2 py-2 overflow-hidden transition-transform duration-200 hover:scale-105 hover:drop-shadow-[0_0_10px_#362617] ">
          <p className="w-full px-3 py-2 rounded bg-slate-700 text-white text-md sm:text-xl h-1/4 sm:h-auto text-center capitalize mt-2 font-bold ">
            Arno' {pokemonFighter ? pokemonFighter.name : fightPokemons[0].name}
          </p>
          <img
            className="  rounded-lg w-[200px] h-[200px] aspect-square object-cover block mx-auto mt-4 p-4"
            src={
              pokemonFighter
                ? pokemonFighter.spriteUrl
                : fightPokemons[0].spriteUrl
            }
          />
        </div>

        <div className="bg-white rounded shadow flex flex-col items-center justify-center   max-w-80 max-h-80  px-4 space-y-2 py-2 overflow-hidden transition-transform duration-200 hover:scale-105 hover:drop-shadow-[0_0_10px_#362617]">
          {/*  <h2 className="text-center text-black text-lg">
            {pokeStorage[randomIndex].name}
          </h2> */}
          <p className="w-full px-3 py-2 rounded bg-slate-700 text-white text-md h-1/4 sm:h-auto sm:text-xl text-center capitalize mt-2 font-bold ">
            {pokeStorage[randomIndex].name}
          </p>

          <img
            className="rounded-lg w-[200px] h-[200px] aspect-square object-cover block mx-auto mt-4 p-4"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${randomIndex +
              1}.svg`}
          />
        </div>
      </div>

      <div className="mx-4 sm:mx-auto my-16 text-center    ">
        <div className=" bg-white  text-slate-700 rounded-lg h-24 w-full text-3xl">
          Tatami and animations here
        </div>
      </div>

      <div className="flex gap-4 justify-between items-center mx-auto sm:mx-4 my-16  ">
        <button className="btn btn-xl bg-white  text-slate-700 hover:bg-slate-600 hover:text-white rounded-lg">
          Random Fight
        </button>

        <button className="btn btn-xl bg-white  text-slate-700 hover:bg-slate-600 hover:text-white rounded-lg">
          Fight
        </button>
      </div>
    </div>
  );
};
export default Battle;
