import { useEffect, useState } from "react";
import { getFilms } from "../api/swapiService.ts";
import FilmsTable from "../components/FilmsTable.tsx";
import Search from "antd/es/input/Search";
import { Select } from "antd";
import "../styles/filmList.css";

const FilmList = () => {
  const [films, setFilms] = useState<any>([]);
  const [title, setTitle] = useState<any>([]);

  async function getFilmsList() {
    const response = await getFilms(title);

    setFilms(response);
  }

  useEffect(() => {
    getFilmsList().then();
  }, [title]);

  return (
    <div
      className={"listFilm"}
      style={{
        gap: "100px",
      }}
    >
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
          size={"large"}
          style={{ width: 150 }}
          showSearch
          placeholder="Select a person"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={[
            { value: "1", label: "Jack" },
            { value: "2", label: "Lucy" },
            { value: "3", label: "Tom" },
          ]}
        />
      </div>
      <FilmsTable filmsList={films} />
    </div>
  );
};

export default FilmList;
