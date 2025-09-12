import { useEffect, useState } from "react";

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/leaderboard`);
        if (!res.ok) throw new Error("Failed to fetch leaderboard");
        const data = await res.json();
        // Sortiere die Spieler nach Score absteigend
        const sorted = data.data.sort((a, b) => b.score - a.score);
        setPlayers(sorted);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading)
    return <div className="text-center text-white mt-20">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-20">{error}</div>;

  const getRankClass = index => {
    if (index === 0) return "!bg-yellow-500 text-black font-bold"; // Gold
    if (index === 1) return "!bg-gray-400 text-black font-bold"; // Silber
    if (index === 2) return "!bg-amber-700 text-white font-bold"; // Bronze
    return "";
  };

  return (
    <div className="flex flex-col items-center max-w-[1400px] mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-white">
        Player results table
      </h1>
      <div className="overflow-x-auto w-full">
        <table className="table table-zebra table-compact w-full text-white ">
          <thead className="bg-gray-800 text-white text-xl">
            <tr>
              <th className="text-left">Rank</th>
              <th className="text-left">Player</th>
              <th className="text-left">Score</th>
            </tr>
          </thead>
          <tbody className="text-lg">
            {players.map((player, index) => (
              <tr key={player.id} className={getRankClass(index)}>
                <td>{index + 1}</td>
                <td>{player.username}</td>
                <td>{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
