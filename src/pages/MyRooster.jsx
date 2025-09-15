import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../contexts/AuthContext.jsx";

import { useToast } from "../contexts/ToasterContext.jsx";

const pokeStorage = "pokemon_roster";
const fightStorage = "fight_pokemon";

const MyRoster = () => {
  const { user, setUser, isRefreshing, setIsRefreshing } = useContext(
    AuthContext
  );
  const { showToast } = useToast();
  const [roster, setRoster] = useState([]);
  const [fightingPokemon, setfightingPokemon] = useState([]);

  const [pokemonRosters, setPokemonRosters] = useState(() => {
    return JSON.parse(localStorage.getItem("pokemon_roster")) || [];
  });
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem(pokeStorage);
    if (stored) {
      setRoster(JSON.parse(stored));
    }
  }, []);

  const fetchAllPokemon = async () => {
    try {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
      const data = await res.json();

      const detailed = await Promise.all(
        data.results.map(async p => {
          const pokeRes = await fetch(p.url);
          const pokeData = await pokeRes.json();
          return {
            id: pokeData.id,
            name: pokeData.name,
            stats: pokeData.stats,
            types: pokeData.types.map(t => t.type.name)
          };
        })
      );

      localStorage.setItem(fightStorage, JSON.stringify(detailed));
      setfightingPokemon(detailed);
    } catch (err) {
      console.error("Fehler beim Laden der Pokémon:", err);
    }
  };

  useEffect(() => {
    const storedAll = localStorage.getItem(fightStorage);
    if (storedAll) {
      setfightingPokemon(JSON.parse(storedAll));
    } else {
      fetchAllPokemon();
    }
  }, []);

  const handleRemove = id => {
    const updated = roster.filter(p => p.id !== id);
    localStorage.setItem(pokeStorage, JSON.stringify(updated));
    setRoster(updated);

    showToast(
      <div className="text-center text-xl">
        <p>
          Pokemon{" "}
          <span className="font-bold text-green-300 text-2xl">
            {roster.find(p => p.id === id).name}
          </span>{" "}
          removed from your roster successfully.
        </p>
      </div>,
      "success"
    );
  };

  const handleChoose = id => {
    const foundPokemon = roster.find(p => p.id === id);
    const updated = moveElementToStart(roster, foundPokemon);

    console.log("updated", updated);

    localStorage.setItem("pokemon_roster", JSON.stringify(updated));
    // update directly because of filter
    setPokemonRosters(updated);

    navigate("/battle");
  };

  function moveElementToStart(arr, element) {
    const index = arr.indexOf(element);
    if (index === -1) return arr;
    return [element, ...arr.filter((_, i) => i !== index)];
  }

  if (isRefreshing) {
    return (
      <div className="w-full grid grid-cols-2 place-items-center">
        <div className="flex w-52 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
        <div className="flex w-52 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    );
  }

  if (pokemonRosters?.length === 0) {
    showToast(
      <div className="text-center text-xl">
        Please Add Pokemon to your roster to be able to fight.
      </div>,
      "info"
    );

    return (
      <div className="text-center flex flex-col justify-center items-center  text-4xl mt-8 relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 space-y-4">
        <p>No Pokémons in your roster yet.</p>
        <button
          className="btn btn-xl bg-white  text-slate-700 hover:bg-slate-600 hover:text-white rounded-lg"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className=" text-black mx-8">
      <div className=" max-w-[1400px] mx-auto">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-8  mx-auto mt-8  ">
          {roster.map(element => (
            <div
              key={element.id}
              className="bg-white rounded shadow     px-4 space-y-2 overflow-hidden transition-transform duration-200 hover:scale-105 hover:drop-shadow-[0_0_10px_#362617]"
            >
              <p className="w-full px-3 py-2 rounded bg-slate-700 text-white text-center capitalize mt-2 font-bold ">
                {element.name}
              </p>
              <img
                className="cursor-pointer  rounded-lg w-[200px] h-[200px] aspect-square object-cover block mx-auto  p-4"
                onClick={() => navigate(`/pokemonDetails/${element.id}`)}
                src={element.spriteUrl}
                alt={element.name}
              />
              <div className="flex justify-center items-center  text-black">
                {/*  {element.types.map(t => (
                  <span key={t} className="py-1 text-black text-xs capitalize">
                    Type: {t}
                  </span>
                ))} */}
                <span className="py-4 text-black text-md capitalize">
                  Type: {element.types.join(", ")}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <button
                  onClick={() => handleChoose(element.id)}
                  className="mb-2 px-2 py-2  my-2 bg-slate-700 text-white rounded hover:bg-slate-600 cursor-pointer font-bold"
                >
                  Choose for fight
                </button>
                <button
                  onClick={() => handleRemove(element.id)}
                  className="mb-2 px-2 py-2 my-2  bg-red-600 text-white rounded hover:bg-red-500 cursor-pointer font-bold"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default MyRoster;
