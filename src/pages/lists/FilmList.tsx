import { useEffect, useMemo, useState } from "react";
import { getByUrl } from "../../api/swapiService.ts";
import FilmsTable from "../../components/FilmsTable.tsx";
import Search from "antd/es/input/Search";
import { Select } from "antd";
import "../../styles/filmList.css";
import starWarsDirectors from "../../mock-data/starWarsDirectors.ts";
import { FilmType } from "../../utils/type/FilmType.ts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";
import {
  FilmsFilterState,
  setDirector,
  setProducer,
} from "../../store/filmsFilterSlice.ts";
import starWarsProducers from "../../mock-data/starWarsProducers.ts";
import { useNavigate } from "react-router";
import { ListResponseApiType } from "../../utils/type/ListResponseApiType.ts";
import "../../styles/cards.css";

const FilmList = () => {
  const [films, setFilms] = useState<ListResponseApiType<FilmType>>();
  const [title, setTitle] = useState<string>("");
  const navigate = useNavigate();

  const filters = useSelector(
    (state: RootState) => state.filters as FilmsFilterState,
  );
  const dispatch = useDispatch();

  async function getFilmsList() {
    const params = {
      search: title,
    };
    const response = await getByUrl("films", params);

    setFilms(response);
  }

  useEffect(() => {
    getFilmsList().then();
  }, [title]);

  const filteredFilms = useMemo(() => {
    if (!filters.director && !filters.producer) return films?.results;

    let filtered = films?.results || [];
    if (filters.director) {
      filtered = filtered.filter(
        (film: FilmType) =>
          film.director?.toLowerCase() === filters.director.toLowerCase(),
      );
    }
    if (filters.producer) {
      filtered = filtered.filter((film: FilmType) =>
        film.producer?.toLowerCase().includes(filters.producer.toLowerCase()),
      );
    }

    return filtered;
  }, [films, filters]);

  return (
    <div className={"listFilm"} style={{}}>
      {/*<h1>Films</h1>*/}
      <div
        className={"search-container"}
        style={{
          maxWidth: 1000,
          justifyContent: "space-between",
          gap: 10,
          flexWrap: "wrap",
          marginBottom: 80,
        }}
      >
        <Search
          className={"search-box"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          size={"large"}
          placeholder="Search"
          enterButton
          color={"black"}
        />
        <Select
          value={filters.director}
          size={"large"}
          style={{ width: 150 }}
          showSearch
          placeholder="Select a director"
          onChange={(value) => dispatch(setDirector(value))}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={starWarsDirectors}
        />
        <Select
          value={filters.producer}
          size={"large"}
          style={{ width: 150 }}
          showSearch
          placeholder="Select a producer"
          onChange={(value) => dispatch(setProducer(value))}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={starWarsProducers}
        />
      </div>
      <FilmsTable
        filmsList={filteredFilms ?? []}
        total={filteredFilms?.length ?? 0}
        onRowClick={(film: FilmType) => {
          navigate(`/films/${film.episode_id}`, { state: { film } });
        }}
      />

      {!films?.results?.length && (
        <div style={{ height: 500 }}>
          <h3 style={{ textAlign: "center" }}>No results found</h3>
        </div>
      )}
    </div>
  );
};

export default FilmList;
