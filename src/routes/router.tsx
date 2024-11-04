import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import CharactersList from "../pages/lists/CharactersList.tsx";
import FilmList from "../pages/lists/FilmList.tsx";
import FilmView from "../pages/views/FilmView.tsx";
import PlanetsList from "../pages/lists/PlanetsList.tsx";
import SpeciesList from "../pages/lists/SpeciesList.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <FilmList />,
      },
      { path: "characters", element: <CharactersList /> },
      { path: "planets", element: <PlanetsList /> },
      { path: "/films/:id", element: <FilmView /> },
      { path: "species", element: <SpeciesList /> },
    ],
  },
]);

export default router;
