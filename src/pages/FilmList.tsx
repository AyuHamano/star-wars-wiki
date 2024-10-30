import { useEffect, useState } from "react";
import { getFilms } from "../api/swapiService.ts";
import FilmsTable from "../components/FilmsTable.tsx";

const FilmList = () => {
  const [films, setFilms] = useState<any>([]);

  async function getFilmsList() {
    const response = await getFilms();

    setFilms(response);
  }

  useEffect(() => {
    getFilmsList().then();
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "auto" }}>
      <FilmsTable filmsList={films} />
    </div>
  );
};

export default FilmList;
