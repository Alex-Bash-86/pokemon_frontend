import { useEffect, useState } from "react";

const pokeStorage = "pokemon_roster";

const MyRoster = () => {
  const [roster, setRoster] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(pokeStorage);
    if (stored) {
      setRoster(JSON.parse(stored));
    }
  }, []);

  const handleRemove = (id) => {
    const updated = roster.filter((p) => p.id !== id);
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
          {roster.map((element) => (
            <div
              key={element.id}
              className="bg-white rounded shadow p-4 flex flex-col items-center m-4 w-45"
            >
              <img src={element.spriteUrl} alt={element.name} />
              <div className="flex justify-center gap-2 text-black">
                Type:
                {element.types.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-1 rounded text-black text-xs capitalize"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <h2 className="capitalize mb-2">{element.name}</h2>
              <button className="mt-2 mb-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 cursor-pointer">
                Choose for fight
              </button>
              <button
                onClick={() => handleRemove(element.id)}
                className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500 cursor-pointer"
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
