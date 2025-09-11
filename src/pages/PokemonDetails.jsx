import { useParams } from "react-router";
import { useEffect, useState } from "react";

const pokeStorage = "pokemon_roster";

const PokemonDetails = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInRoster, setIsInRoster] = useState(false);

  useEffect(() => {
    setError(null);
    setLoading(true);
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setPokemon(data);

        const stored = localStorage.getItem(pokeStorage);
        if (stored) {
          const roster = JSON.parse(stored);
          setIsInRoster(roster.some(p => p.id === data.id));
        }
      } catch (err) {
        console.error("Failed to fetch:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemon();
  }, [id]);

  const handleAddToRoster = () => {
    const stored = localStorage.getItem(pokeStorage);
    let roster = stored ? JSON.parse(stored) : [];

    console.log("pokemon", pokemon);
    if (!roster.some(element => element.id === pokemon.id)) {
      const pokemonData = {
        id: pokemon.id,
        name: pokemon.name,
        spriteUrl: pokemon.sprites.other.dream_world.front_default,
        stats: pokemon.stats,
        types: pokemon.types.map(t => t.type.name)
      };
      roster.unshift(pokemonData);
      localStorage.setItem(pokeStorage, JSON.stringify(roster));
      setIsInRoster(true);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-4 max-w-[800px]  max-h-full mx-auto p-4 bg-white rounded shadow text-black overflow-hidden transition-transform duration-200 hover:scale-105 hover:drop-shadow-[0_0_10px_#362617]">
      <h1 className="text-3xl font-bold capitalize text-center">
        {pokemon.name}
      </h1>
      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
        className="mx-auto my-4 w-60"
      />
      <div className="flex justify-center gap-2">
        {pokemon.types.map(types => (
          <span
            key={types.slot}
            className="px-3 py-1 rounded border border-slate-700 text-black capitalize"
          >
            {types.type.name}
          </span>
        ))}
      </div>
      <div className="mt-4 ">
        <h2 className="text-xl text-center font-semibold">Stats</h2>
        <div className="mt-4 grid  grid-cols-1 sm:grid-cols-2 place-items-center mx-auto gap-2">
          {pokemon.stats.map(stats => (
            <p className="capitalize text-left text-xl" key={stats.stat.name}>
              {stats.stat.name}: {stats.base_stat}
            </p>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="btn btn-xl   mt-6 w-full py-2 rounded-lg"
          onClick={handleAddToRoster}
        >
          {isInRoster ? "Is already in roster" : "Add to roster"}
        </button>
      </div>
    </div>
  );
};

export default PokemonDetails;
