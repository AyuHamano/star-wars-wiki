import { useEffect, useState } from "react";
import { getFilms } from "../api/swapiService.ts";
import FilmsTable from "../components/FilmsTable.tsx";
import Search from "antd/es/input/Search";
import { Select } from "antd";
import "../styles/filmList.css";
import starWarsDirectors from "./mock-select-options/starWarsDirectors.ts";

const FilmList = () => {
  const [films, setFilms] = useState<any>([]);
  const [title, setTitle] = useState<any>();
  const [director, setDirector] = useState<any>();

  async function getFilmsList() {
    const response = await getFilms(title);

    setFilms(response);
  }

  useEffect(() => {
    getFilmsList().then();
    console.log(director);
  }, [title]);

  const handleChange = (value) => {
    console.log("Selected Director ID:", value); // Verifique se o valor é exibido no console
    setDirector(value);
  };

  return (
    <div
      className={"listFilm"}
      style={{
        gap: "100px",
      }}
    >
      <h1>Films</h1>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
          justifyContent: "space-between",
        }}
      >
        <Search
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          size={"large"}
          style={{ marginBottom: 50 }}
          placeholder="input search text"
          enterButton
          color={"black"}
        />

        <Select
          value={director}
          size={"large"}
          style={{ width: 150 }}
          showSearch
          placeholder="Select a person"
          onChange={handleChange}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={starWarsDirectors}
        />
      </div>
      <FilmsTable filmsList={films} />
    </div>
  );
};

export default FilmList;
