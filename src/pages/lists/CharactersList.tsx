import { useEffect, useState } from "react";
import { getByUrl } from "../../api/swapiService.ts";
import "../../styles/cards.css";

import Search from "antd/es/input/Search";
import { ListResponseApiType } from "../../utils/type/ListResponseApiType.ts";
import { CharacterType } from "../../utils/type/CharacterType.ts";
import { Card, Col, Pagination, Row } from "antd";
import ModalCharacters from "../../components/ModalCharacters.tsx";
import { getCharacterId } from "../../utils/utils-functions.ts";

const CharactersList = () => {
  const [name, setName] = useState("");
  const [characters, setCharacters] =
    useState<ListResponseApiType<CharacterType>>();
  const [currentPage, setCurrentPage] = useState(1); // Estado para a página atual
  const [open, setOpen] = useState<boolean>(false);

  const [characterId, setCharacterId] = useState<string>();

  async function getCharacters(page: number) {
    const params = {
      page: page,
      search: name,
    };
    try {
      const response = await getByUrl("people", params);
      setCharacters(response);
    } catch (e) {
      alert("Failed to fetch data " + e);
    }
  }

  useEffect(() => {
    const debounce = setTimeout(() => getCharacters(currentPage), 1000);

    return () => clearTimeout(debounce);
  }, [currentPage, name]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div
      className={"listFilm"}
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          justifyContent: "space-between",
        }}
      >
        <Search
          className={"search-box"}
          value={name}
          onChange={(e) => {
            setCurrentPage(1);
            setName(e.target.value);
          }}
          size={"large"}
          placeholder="Search"
          enterButton
          color={"black"}
        />
      </div>

      {!!characters?.results?.length && (
        <>
          <Row gutter={[20, 20]} justify="start" style={{ width: 1000 }}>
            {characters?.results.map((character) => (
              <Col
                className={"listCard"}
                key={character.url}
                xs={24}
                sm={12}
                md={12}
                lg={8}
                onClick={() => {
                  setCharacterId(getCharacterId(character.url));
                  setOpen(true);
                }}
              >
                <Card
                  className="custom-card"
                  style={{ width: 240, height: 400 }}
                  hoverable
                  cover={
                    <img
                      alt={character.name}
                      style={{ width: 240, height: 300 }}
                      src={`https://starwars-visualguide.com/assets/img/characters/${character.url.split("/").slice(-2, -1)}.jpg`}
                    />
                  }
                >
                  <Card.Meta
                    title={character.name}
                    description={`Birth Year: ${character.birth_year}`}
                  />
                </Card>
              </Col>
            ))}
          </Row>
          <Row justify={"center"}>
            <Pagination
              showSizeChanger={false}
              style={{ textAlign: "center", marginTop: "20px" }}
              current={currentPage}
              pageSize={10}
              total={characters?.count} // Número total de personagens na API SWAPI
              onChange={handlePageChange}
            />
          </Row>
        </>
      )}

      {!characters?.results?.length && (
        <div style={{ height: 500 }}>
          <h3 style={{ textAlign: "center" }}>No results found</h3>
        </div>
      )}

      <ModalCharacters open={open} setOpen={setOpen} id={characterId ?? ""} />
    </div>
  );
};

export default CharactersList;
