import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import CharactersList from "../pages/CharactersList.tsx";
import FilmList from "../pages/FilmList.tsx";

const router = createBrowserRouter([
  {
    path: "star-wiki",
    element: <App />,
    children: [
      { path: "", element: <FilmList /> },
      { path: "characters", element: <CharactersList /> },
    ],
  },
]);

export default router;
