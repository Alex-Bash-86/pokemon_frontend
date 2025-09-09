import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [limit, setLimit] = useState(150);
  const [limitInput, setLimitInput] = useState();

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
          data.results.map(async (pokemon) => {
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
  }, [limit]);

  console.log(data);

  if (error) {
    return <p>{error}</p>;
  }
  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div className="flex flex-wrap max-w-[1400px] mx-auto">
      <div className=" text-2xl flex flex-wrap mx-auto m-4">Pokemon</div>
      <div className="flex flex-col mx-auto">
        <button
          className="btn self-center bg-slate-700 hover:bg-slate-600"
          onClick={() => setLimit(limitInput)}
        >
          Load {limitInput} Pokemon
        </button>

        <input
          className="w-[1000px] self-center m-4"
          type="range"
          id="limit"
          min={1}
          max={1302}
          defaultValue={25}
          value={limitInput}
          onChange={(e) => setLimitInput(Number(e.target.value))}
        />
        <label className="text-2xl text-center">First {limit} Pokemon</label>
        {loading && (
          <p className="text-center text-white font-medium">Loading...</p>
        )}
        {error && (
          <p className="text-center text-red-500 font-semibold">{error}</p>
        )}
        <div>
          <p className="flex flex-wrap">
            {data &&
              data.map((element, index) => (
                <div
                  key={element.name}
                  onClick={() => navigate(`/pokemonDetails/${element.id}`)}
                  className="cursor-pointer bg-white rounded shadow m-4 w-40"
                >
                  <p className="text-black text-center">ID: {index + 1}</p>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                      index + 1
                    }.png`}
                    alt={element.name}
                    className="mx-auto mb-2"
                  />
                  <div className="flex justify-center gap-2 mb-2 text-black">
                    Type:
                    {element.types.map((t) => (
                      <span
                        key={t.slot}
                        className="px-2 py-1 rounded text-black text-xs capitalize"
                      >
                        {t.type.name}
                      </span>
                    ))}
                  </div>
                  <p className="text-black text-center capitalize">
                    {element.name}
                  </p>
                </div>
              ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
