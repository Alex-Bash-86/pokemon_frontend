const Battle = () => {
  // Daten aus der localStorage laden

  const fightPokemons =
    JSON.parse(localStorage.getItem("pokemon_roster")) || [];

  console.log("pokemon_roster", fightPokemons);

  const pokeStorage = JSON.parse(localStorage.getItem("fight_pokemon"));

  console.log("fight_pokemon", pokeStorage);

  //get random pokemon image
  const randomPokemonIndex = () => {
    const randomIndex = Math.floor(Math.random() * pokeStorage.length);
    return randomIndex;
  };

  return (
    <div className="grid grid-cols-1 max-w-[1400px] mx-auto h-full">
      <div></div>
      <div className="flex justify-between items-center w-full min-h-full ">
        <div className=" w-60  px-4">
          <h2 className="text-center">Arno' Pokemon</h2>

          <img
            className=" bg-black rounded-lg w-[200px] h-[200px] aspect-square object-cover block mx-auto mt-4 p-4"
            src={fightPokemons[0].spriteUrl}
          />
        </div>
        <div className="w-60  px-4">
          <h2 className="text-center">Computers' Pokemon</h2>

          <img
            className="bg-black rounded-lg w-[200px] h-[200px] aspect-square object-cover block mx-auto mt-4 p-4"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${randomPokemonIndex() +
              1}.svg`}
          />
        </div>
      </div>
      <div className="mx-auto my-16">
        <button className="btn ">Fight</button>
      </div>
      <div className="flex justify-between items-center mx-auto my-16 w-full">
        <button className="btn">Random Fight</button>
        <button className="btn">Leaderboard</button>
      </div>
    </div>
  );
};
export default Battle;
