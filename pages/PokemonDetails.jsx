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
          setIsInRoster(roster.some((p) => p.id === data.id));
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

    if (!roster.some((p) => p.id === pokemon.id)) {
      const pokemonData = {
        id: pokemon.id,
        name: pokemon.name,
        spriteUrl: pokemon.sprites.front_default,
        types: pokemon.types.map((t) => t.type.name),
      };
      roster.push(pokemonData);
      localStorage.setItem(pokeStorage, JSON.stringify(roster));
      setIsInRoster(true);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-4 max-w-[800px] mx-auto p-4 bg-white rounded shadow text-black">
      <h1 className="text-3xl font-bold capitalize text-center">
        {pokemon.name}
      </h1>
      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
        className="mx-auto my-4 w-60"
      />
      <div className="flex justify-center gap-2">
        {pokemon.types.map((types) => (
          <span
            key={types.slot}
            className="px-3 py-1 rounded bg-slate-700 text-white capitalize"
          >
            {types.type.name}
          </span>
        ))}
      </div>
      <div className="mt-4 text-center">
        <h2 className="text-xl font-semibold">Stats</h2>
        {pokemon.stats.map((stats) => (
          <p className="capitalize" key={stats.stat.name}>
            {stats.stat.name}: {stats.base_stat}
          </p>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="btn mt-6 w-full py-2 rounded"
          onClick={handleAddToRoster}
        >
          {isInRoster ? "Is already in roster" : "Add to roster"}
        </button>
      </div>
    </div>
  );
};

export default PokemonDetails;
