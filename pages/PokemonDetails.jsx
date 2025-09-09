import { useParams } from "react-router";
import { useEffect, useState } from "react";

const PokemonDetails = () => {
  const { id } = useParams(); // ID aus URL
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        if (!res.ok) throw new Error("Failed to load Pokemon");
        const data = await res.json();
        setPokemon(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemon();
  }, [id]);

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
        {pokemon.types.map((t) => (
          <span
            key={t.slot}
            className="px-3 py-1 rounded bg-slate-700 text-white capitalize"
          >
            {t.type.name}
          </span>
        ))}
      </div>
      <div className="mt-4 text-center">
        <h2 className="text-xl font-semibold">Stats</h2>
        {pokemon.stats.map((s) => (
          <p className="capitalize" key={s.stat.name}>
            {s.stat.name}: {s.base_stat}
          </p>
        ))}
      </div>
    </div>
  );
};

export default PokemonDetails;
