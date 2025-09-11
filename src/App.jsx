import { Route, Routes } from "react-router";
import Home from "./pages/Home.jsx";
import PokemonDetails from "./pages/PokemonDetails.jsx";
import MyRooster from "./pages/MyRooster.jsx";
import Layout from "./Layout/Layout.jsx";
import Battle from "./pages/Battle.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";

const App = () => {
  return (
    <div className=" min-h-screen  w-full grid grid-rows-[auto_1fr_auto] font-['Monaspace_Xenon_Var'] ">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="pokemondetails/:id" element={<PokemonDetails />} />
          <Route path="myroster" element={<MyRooster />} />
          <Route path="battle" element={<Battle />} />
          <Route path="leaderboard" element={<Leaderboard />} />
        </Route>
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </div>
  );
};

export default App;
