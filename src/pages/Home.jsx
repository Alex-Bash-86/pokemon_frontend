import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import pokeselected from "../assets/pokeselected.webp";
import pokeunselected from "../assets/pokeunselected.webp";
import { useToast } from "../contexts/ToasterContext.jsx";
import { toast } from "react-toastify";

const Home = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const location = useLocation();
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [limit, setLimit] = useState(150);
  const [limitInput, setLimitInput] = useState(150);
  const [isInRoster, setIsInRoster] = useState(false);

  const [pokemonRosters, setPokemonRosters] = useState(() => {
    return JSON.parse(localStorage.getItem("pokemon_roster")) || [];
  });
  /*   const pokemonRosters =
    JSON.parse(localStorage.getItem("pokemon_roster")) || [];
 */
  console.log("pokemonRosters", typeof pokemonRosters);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      setLoading(true);
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
        );
        if (!response) throw Error("Failed to fetch");
        const data = await response.json();

        const detailedData = await Promise.all(
          data.results.map(async pokemon => {
            const res = await fetch(pokemon.url);
            return await res.json();
          })
        );

        setData(detailedData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [limit, pokemonRosters]);

  console.log(data);

  // todo: add to roster
  const handleAddToRoster = id => {
    // Directly access the Pokémon data using the ID
    // const foundPokemon = data[id];
    const foundPokemon = data.find(element => element.id === id);

    // If the Pokémon is not found, exit early
    if (!foundPokemon) return;

    // Check if the Pokémon is already in the roster
    const isAlreadyInRoster = pokemonRosters.some(pokemon => pokemon.id === id);
    if (isAlreadyInRoster) return;

    // Prepare the Pokémon data to add to the roster
    const pokemonData = {
      id,
      name: foundPokemon.name,
      spriteUrl: foundPokemon.sprites.other.dream_world.front_default,
      stats: foundPokemon.stats,
      types: foundPokemon.types.map(type => type.type.name)
    };

    const updatedRoster = [pokemonData, ...pokemonRosters];

    localStorage.setItem("pokemon_roster", JSON.stringify(updatedRoster));
    // Update the roster and sync with local storage
    setPokemonRosters(updatedRoster);
  };

  const handleRemoveFromRoster = id => {
    const updated = pokemonRosters.filter(p => p.id !== id);
    // set state before localstorage setting
    setPokemonRosters(updated);
    localStorage.setItem("pokemon_roster", JSON.stringify(updated));
    setIsInRoster(false);
  };

  if (error) {
    return <p>{error}</p>;
  }
  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div className="flex flex-col items-center justify-center max-w-[1400px] mx-auto ">
      <div className=" text-2xl flex flex-wrap mx-auto m-4">Pokemon</div>
      <div className=" text-2xl flex flex-wrap mx-auto mb-4 bg-red-500">
        Filter comig soon (maybe)
      </div>
      <div className="grid grid-cols-1  mx-auto w-full space-y-4">
        <button
          className="btn  bg-slate-700 hover:bg-slate-600 btn-lg w-1/2 mx-auto"
          onClick={() => setLimit(limitInput)}
        >
          Click to load {limitInput} Pokemon
        </button>
        <p className="text-center text-xs">
          (adjust the bar to choose the number)
        </p>
        <input
          className="w-2/3  mx-auto"
          type="range"
          id="limit"
          min={1}
          max={1302}
          defaultValue={150}
          value={limitInput}
          onChange={e => setLimitInput(Number(e.target.value))}
        />
        <label className="text-2xl text-center">First {limit} Pokemon</label>
        <p className="text-center text-xs">click on Pokemon for details</p>
        {loading && (
          <p className="text-center text-white font-medium">Loading...</p>
        )}
        {error && (
          <p className="text-center text-red-500 font-semibold">{error}</p>
        )}
        <div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-4 mx-4  sm:mx-4 mt-8 max-w-[1400px]">
            {data &&
              data.map((element, index) => (
                <div
                  key={element.name}
                  className="cursor-pointer bg-white rounded shadow m-4  px-4 py-2 overflow-hidden transition-transform duration-200 hover:scale-105 hover:drop-shadow-[0_0_10px_#362617]"
                >
                  <div className="flex justify-between">
                    <p className="text-black text-center"># {index + 1}</p>
                    <p>
                      {pokemonRosters.some(p => p.id === element.id) ? (
                        <img
                          onClick={() => handleRemoveFromRoster(element.id)}
                          src={pokeselected}
                          alt="selected"
                          className="h-10 w-10 cursor-pointer aspect-square object-contain"
                        />
                      ) : (
                        <img
                          onClick={() => handleAddToRoster(element.id)}
                          src={pokeunselected}
                          alt="unselected"
                          className="h-10 w-10 cursor-pointer aspect-square object-contain"
                        />
                      )}
                    </p>
                  </div>
                  <div
                    onClick={() => navigate(`/pokemonDetails/${element.id}`)}
                  >
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index +
                        1}.svg`}
                      alt={element.name}
                      className="mx-auto mb-2 w-[200px] h-[200px]"
                    />
                    {/*  <img
                      src={
                        element.sprites.other["official-artwork"].front_default
                      }
                      alt={element.name}
                      className="mx-auto mb-2 w-[200px] h-[200px]"
                    /> */}
                    <div className="flex justify-center items-center gap-2 mb-2 text-black text-md">
                      <span className="py-4 text-black text-md capitalize">
                        Type: {element.types.map(t => t.type.name).join(", ")}
                      </span>
                    </div>
                    <p className="px-3 py-1 rounded bg-slate-700 text-white text-center capitalize mb-2 font-bold">
                      {element.name}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
