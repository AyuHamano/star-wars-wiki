import { useEffect, useState } from "react";
import { getByUrl } from "../../api/swapiService.ts";
import "../../styles/cards.css";

import Search from "antd/es/input/Search";
import { ListResponseApiType } from "../../type/ListResponseApiType.ts";
import { Card, Col, Pagination, Row } from "antd";
import { getCharacterId } from "../../utils/utils-functions.ts";
import ModalSpecie from "../../components/ModalSpecie.tsx";
import { SpecieType } from "../../type/SpecieType.ts";

const SpeciesList = () => {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState<ListResponseApiType<SpecieType>>();
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState<boolean>(false);
  const [specieId, setSpecieId] = useState<string>("");

  async function getspecies(page: number) {
    const params = {
      page: page,
      search: name,
    };
    try {
      const response = await getByUrl("species", params);
      setSpecies(response);
    } catch (e) {
      alert("Failed to fetch data " + e);
    }
  }

  useEffect(() => {
    const debounce = setTimeout(() => getspecies(currentPage), 1000);
    return () => clearTimeout(debounce);
  }, [currentPage, name]);

  useEffect(() => {
    getspecies(currentPage).then();
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

      {!!species?.results?.length && (
        <>
          <Row justify="end">
            <Pagination
              showSizeChanger={false}
              style={{ textAlign: "center", marginTop: "20px" }}
              current={currentPage}
              pageSize={10}
              total={species?.count}
              onChange={handlePageChange}
            />
          </Row>
          <Row gutter={[20, 20]} justify="center">
            {species?.results.map((specie) => (
              <Col
                className="listCard"
                key={specie.url}
                xs={24}
                sm={12}
                md={8}
                lg={6}
                onClick={() => {
                  setSpecieId(getCharacterId(specie.url));
                  setOpen(true);
                }}
              >
                <Card
                  className="custom-card"
                  hoverable
                  cover={
                    <img
                      alt={specie.name}
                      src={`https://starwars-visualguide.com/assets/img/species/${specie.url
                        .split("/")
                        .slice(-2, -1)}.jpg`}
                    />
                  }
                >
                  <Card.Meta
                    title={specie.name}
                    description={`Birth Year: ${specie.classification}`}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}

      {!species?.results?.length && (
        <div style={{ height: 500 }}>
          <h3 style={{ textAlign: "center" }}>No results found</h3>
        </div>
      )}

      <ModalSpecie open={open} setOpen={setOpen} id={specieId} />
    </div>
  );
};

export default SpeciesList;
