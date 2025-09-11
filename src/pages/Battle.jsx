import { useEffect, useMemo, useRef, useState } from "react";
import { nanoid } from "nanoid";

const Battle = () => {
  /* const [fightPokemons, setFightPokemons] = useState(() => {
    return JSON.parse(localStorage.getItem("pokemon_roster")).slice(0, 3) || [];
  }); */

  const [message, setMessage] = useState("");
  const [fightData, setFightData] = useState([]);

  const fightPokemons =
    JSON.parse(localStorage.getItem("pokemon_roster")) || [];
  const [pokemonFighter, setPokemonFighter] = useState(
    fightPokemons?.[0] || null
  );
  // Daten aus der localStorage laden

  console.log("pokemon_roster", fightPokemons);

  const [computerPokemon, setComputerPokemon] = useState(null);

  const [randomIndex, setRandomIndex] = useState(0);
  // console.log("fight_pokemon", pokeStorage);

  // all pokemons from the localStorage
  /* const pokeStorage = JSON.parse(localStorage.getItem("fight_pokemon")) || [];
   */
  // all pokemons from the localStorage
  const pokeStorage = useMemo(() => {
    return JSON.parse(localStorage.getItem("fight_pokemon")) || [];
  }, []);

  useEffect(() => {
    //get random pokemon image
    const randomPokemonIndex = () => {
      const index = Math.floor(Math.random() * pokeStorage.length) + 1;
      setComputerPokemon(pokeStorage[index]);
      setRandomIndex(index);
    };
    randomPokemonIndex();
  }, [pokeStorage]);

  const handleClick = id => {
    const foundPokemon = fightPokemons.find(p => p.id === id);
    console.log("foundPokemon", foundPokemon);
    setPokemonFighter(foundPokemon);
  };

  const handleFight = () => {
    console.log("computerPokemon.name", computerPokemon.name);
    if (!pokemonFighter || !computerPokemon) return;

    const results = pokemonFighter.stats.map((stat, index) => {
      const fighterStat = stat.base_stat;
      const computerStat = computerPokemon.stats[index].base_stat;
      const statName = stat.stat.name;

      if (fighterStat > computerStat) {
        return {
          pokemonFighter: {
            name: pokemonFighter.name,
            result: "Win",
            bgColor: "green"
          },
          computerPokemon: {
            name: computerPokemon.name,
            result: "Lose",
            bgColor: "red"
          },
          statName
        };
      } else if (fighterStat < computerStat) {
        return {
          pokemonFighter: {
            name: pokemonFighter.name,
            result: "Lose",
            bgColor: "red"
          },
          computerPokemon: {
            name: computerPokemon.name,
            result: "Win",
            bgColor: "green"
          },
          statName
        };
      } else {
        return {
          pokemonFighter: {
            name: pokemonFighter.name,
            result: "draw",
            bgColor: "inherit"
          },
          computerPokemon: {
            name: computerPokemon.name,
            result: "draw",
            bgColor: "inherit"
          },
          statName
        };
      }
    });

    setFightData(results);
    document.getElementById("my_modal_5").showModal();

    checkWhoWins(results);
  };

  const checkWhoWins = results => {
    let myNumberOfWins = 0;
    let numberOfComputerWins = 0;

    console.log("fightData from checkwho win", results);

    for (const fight of results) {
      if (fight.pokemonFighter.result === "Win") {
        myNumberOfWins++;
      }
      if (fight.computerPokemon.result == "Win") {
        numberOfComputerWins++;
      }
    }

    console.log("myNumberOfWins", myNumberOfWins);
    console.log("numberOfComputerWins", numberOfComputerWins);
    if (myNumberOfWins === numberOfComputerWins) {
      setMessage("It's a draw");
    } else if (myNumberOfWins > numberOfComputerWins) {
      setMessage(`You won ${results[0].pokemonFighter.name} !`);
    } else {
      setMessage("You lost");
    }
  };

  const handleNewPcPokemon = () => {
    const index = Math.floor(Math.random() * pokeStorage.length) + 1;
    setComputerPokemon(pokeStorage[index]);
    setRandomIndex(index);
  };

  console.log("fightData", fightData);
  return (
    <div className="grid grid-cols-[1fr]   min-h-full mx-auto sm:mx-4">
      <div className=" p-[8px] justify-around items-center   space-x-4   carousel carousel-center max-w-lg  border border-white rounded-lg mb-8 ">
        {fightPokemons.map(p => (
          <div
            onClick={() => handleClick(p.id)}
            className="border border-red-800  rounded-lg transition-transform p-2 duration-200 hover:scale-105 hover:drop-shadow-[0_0_10px_#362617] cursor-pointer carousel-item grid flex-none w-[80px]   "
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

      <div
        className="flex justify-center sm:justify-between gap-4 w-full
        sm:mx-auto mx-0  my-8  "
      >
        <div className="bg-white rounded shadow flex flex-col items-center justify-center   max-w-[400px] w-full max-h-120  px-1 space-y-2 pt-2 pb-12 overflow-hidden transition-transform duration-200 hover:scale-105 hover:drop-shadow-[0_0_10px_#362617]">
          <p className="w-full px-3 py-2 rounded bg-slate-700 text-white text-md sm:text-xl  text-center capitalize mt-2 font-bold ">
            My {pokemonFighter ? pokemonFighter.name : fightPokemons[0].name}
          </p>
          <img
            className="  rounded-lg max-w-xs  h-[180px] sm:h-[200px] aspect-square object-cover block mx-auto mt-4 p-4"
            src={
              pokemonFighter
                ? pokemonFighter.spriteUrl
                : fightPokemons[0].spriteUrl
            }
          />

          <div className="text-white text-center   flex  gap-2  ">
            {pokemonFighter
              ? pokemonFighter.stats.map(stats => (
                  <div
                    className="space-y-2 divide-y-4 divide-red-800  gap-2 "
                    key={stats.stat.name}
                  >
                    <p className="grid place-items-center bg-black rounded-full w-6 sm:w-10   h-6 sm:h-10  text-xs sm:text-lg">
                      {stats.stat.name
                        .split("-")
                        .map(word =>
                          word === "special"
                            ? "SP"
                            : word === "hp"
                            ? "HP"
                            : word[0].toUpperCase()
                        )
                        .join("")}
                    </p>
                    <p className="grid place-items-center bg-black rounded-full w-6 sm:w-10   h-6 sm:h-10  text-xs sm:text-lg ">
                      {stats.base_stat}
                    </p>
                  </div>
                ))
              : fightPokemons[0].stats.map(stats => (
                  <div
                    className="space-y-2 divide-y-4 divide-red-800  gap-2 "
                    key={stats.stat.name}
                  >
                    <p className="grid place-items-center bg-black rounded-full w-6 sm:w-10   h-6 sm:h-10  text-xs sm:text-lg">
                      {stats.stat.name
                        .split("-")
                        .map(word =>
                          word === "special"
                            ? "SP"
                            : word === "hp"
                            ? "HP"
                            : word[0].toUpperCase()
                        )
                        .join("")}
                    </p>
                    <p className="grid place-items-center bg-black rounded-full w-6 sm:w-10   h-6 sm:h-10  text-xs sm:text-lg">
                      {stats.base_stat}
                    </p>
                  </div>
                ))}
          </div>
        </div>

        {/* computer pokemon */}

        <div className="bg-white rounded shadow flex flex-col items-center justify-center    max-w-[400px] w-full max-h-120  px-1 space-y-2 py-2 overflow-hidden transition-transform duration-200 hover:scale-105 hover:drop-shadow-[0_0_10px_#362617]">
          {/*  <h2 className="text-center text-black text-lg">
            {pokeStorage[randomIndex].name}
          </h2> */}

          <p className="w-full px-3 py-2 rounded bg-slate-700 text-white text-md sm:text-xl  text-center capitalize mt-2 font-bold ">
            {computerPokemon?.name}
          </p>

          <img
            className="rounded-lg max-w-xs h-[180px] sm:h-[200px] aspect-square object-cover block mx-auto mt-4  "
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${randomIndex +
              1}.svg`}
          />

          <div className="text-white text-center   flex  gap-2  ">
            {computerPokemon?.stats.map(stats => (
              <div
                className="space-y-2 divide-y-4 divide-red-800  gap-2  "
                key={stats.stat.name}
              >
                <p className=" grid place-items-center capitalize bg-black w-6 sm:w-10   h-6 sm:h-10  text-xs sm:text-lg rounded-full ">
                  {stats.stat.name
                    .split("-")
                    .map(word =>
                      word === "special"
                        ? "SP"
                        : word === "hp"
                        ? "HP"
                        : word[0].toUpperCase()
                    )
                    .join("")}
                </p>
                <p className="grid place-items-center bg-black rounded-full w-6 sm:w-10   h-6 sm:h-10  text-xs sm:text-lg ">
                  {stats.base_stat}
                </p>
              </div>
            ))}
          </div>
          <button
            className="btn btn-lg text-md sm:text-xl h-8"
            onClick={handleNewPcPokemon}
          >
            new Pokemon
          </button>
        </div>
      </div>

      <div className="flex gap-4 justify-between items-center mx-auto sm:mx-4 my-16  ">
        <button className="btn btn-xl bg-white  text-slate-700 hover:bg-slate-600 hover:text-white rounded-lg">
          Random Fight
        </button>

        <button
          onClick={handleFight}
          className="btn btn-xl bg-white  text-slate-700 hover:bg-slate-600 hover:text-white rounded-lg"
        >
          Fight
        </button>
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-2xl text-center divider">Results</h3>
          {fightData.map(fight => (
            <div
              key={nanoid()}
              className="grid grid-cols-[1fr_1fr_1fr] gap-4 w-full mx-auto place-items-center space-y-4   "
            >
              <button
                className={` btn p-2 rounded-lg ${
                  fight.pokemonFighter.bgColor === "green"
                    ? "bg-green-500"
                    : fight.pokemonFighter.bgColor === "red"
                    ? "bg-red-500"
                    : "bg-gray-500"
                }`}
              >
                {fight.pokemonFighter.name} {fight.pokemonFighter.result}
              </button>
              <div className="text-[14px] uppercase font-bold">
                {fight.statName}
              </div>

              <button
                className={` p-2 btn   rounded-lg ${
                  fight.computerPokemon.bgColor === "green"
                    ? "bg-green-500"
                    : fight.computerPokemon.bgColor === "red"
                    ? "bg-red-500"
                    : "bg-gray-500"
                }`}
              >
                {fight.computerPokemon.name} {fight.computerPokemon.result}
              </button>
            </div>
          ))}

          <p className="text-center text-xl font-bold my-4">{message}</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-xl bg-white  text-slate-700 hover:bg-slate-600 hover:text-white rounded-lg">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};
export default Battle;
