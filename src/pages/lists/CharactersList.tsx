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
  const [currentPage, setCurrentPage] = useState(1);
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
  }, [name]);

  useEffect(() => {
    getCharacters(currentPage).then();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="listFilm">
      <div className="search-container">
        <Search
          className="search-box"
          value={name}
          onChange={(e) => {
            setCurrentPage(1);
            setName(e.target.value);
          }}
          size="large"
          placeholder="Search"
          enterButton
        />
      </div>
      {!!characters?.results?.length && (
        <>
          <Row justify="end">
            <Pagination
              showSizeChanger={false}
              style={{ textAlign: "center", marginTop: "20px" }}
              current={currentPage}
              pageSize={10}
              total={characters?.count}
              onChange={handlePageChange}
            />
          </Row>

          <Row gutter={[20, 20]} justify="center">
            {characters?.results.map((character) => (
              <Col
                className="listCard"
                key={character.url}
                xs={24}
                sm={12}
                md={8}
                lg={6}
                onClick={() => {
                  setCharacterId(getCharacterId(character.url));
                  setOpen(true);
                }}
              >
                <Card
                  className="custom-card"
                  hoverable
                  cover={
                    <img
                      alt={character.name}
                      src={`https://starwars-visualguide.com/assets/img/characters/${character.url
                        .split("/")
                        .slice(-2, -1)}.jpg`}
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
