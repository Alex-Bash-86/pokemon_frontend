import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import PokemonDetails from "../pages/PokemonDetails.jsx";
import MyRooster from "../pages/MyRooster.jsx";
import Layout from "../Layout/Layout.jsx";
import Battle from "../pages/Battle.jsx";
import Leaderboard from "../pages/Leaderboard.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="pokemon" element={<PokemonDetails />} />
        <Route path="myrooster" element={<MyRooster />} />
        <Route path="battle" element={<Battle />} />
        <Route path="leaderboard" element={<Leaderboard />} />
      </Route>
      <Route path="*" element={<h1>Page not found</h1>} />
    </Routes>
  );
};

export default App;
