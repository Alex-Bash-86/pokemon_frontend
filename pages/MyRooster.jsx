import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const pokeStorage = "pokemon_roster";
const fightStorage = "fight_pokemon";

const MyRoster = () => {
  const [roster, setRoster] = useState([]);
  const [fightingPokemon, setfightingPokemon] = useState([]);
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
  };

  if (roster.length === 0) {
    return <p className="text-center mt-8">No Pokémon in your roster yet.</p>;
  }

  return (
    <div className="flex flex-wrap max-w-[1400px] mx-auto text-black">
      <div className="flex flex-col mx-auto">
        <div className="flex flex-wrap">
        {roster.map(element => (
          <div
            key={element.id}
            className="cursor-pointer bg-white rounded shadow flex flex-col items-center m-4 w-45"
          >
            <p className="w-full px-3 py-1 rounded bg-slate-700 text-white text-center capitalize mt-2">
              {element.name}
            </p>
            <img
              onClick={() => navigate(`/pokemonDetails/${element.id}`)}
              src={element.spriteUrl}
              alt={element.name}
            />
            <div className="flex justify-center gap-2 text-black">
              Type:
              {element.types.map(t => (
                <span key={t} className="py-1 text-black text-xs capitalize">
                  {t}
                </span>
              ))}
            </div>
            <button
              onClick={() => navigate("/battle")}
              className="mb-2 px-3 py-1 bg-slate-700 text-white rounded hover:bg-slate-600 cursor-pointer"
            >
              Choose for fight
            </button>
            <button
              onClick={() => handleRemove(element.id)}
              className="mb-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500 cursor-pointer"
            >
              Remove
            </button>
          </div>
        ))}
          </div>
      </div>
    </div>
  );
};
export default MyRoster;
