import { Table } from "antd";
import { useEffect, useState } from "react";
import { getByUrl } from "../../api/swapiService.ts";
import "../../styles/cards.css";

import Search from "antd/es/input/Search";
import { ListResponseApiType } from "../../utils/type/ListResponseApiType.ts";
import { PlanetType } from "../../utils/type/PlanetType.ts";
import { ColumnsType } from "antd/es/table";
import ModalPlanet from "../../components/ModalPlanet.tsx";

const PlanetsList = () => {
  const [name, setName] = useState("");
  const [planets, setPlanets] =
    useState<ListResponseApiType<PlanetType> | null>(null);
  const [planet, setPlanet] = useState<PlanetType>();
  const [currentPage, setCurrentPage] = useState(1); // Estado para a página atual
  const [open, setOpen] = useState<boolean>(false);

  async function getPlanetsList(page: number) {
    const params = {
      page: page,
      search: name,
    };
    try {
      const response = await getByUrl("planets", params);
      setPlanets(response);
    } catch (e) {
      alert("Failed to fetch data " + e);
    }
  }

  useEffect(() => {
    getPlanetsList(currentPage).then(); // Carrega os personagens com base na página atual
  }, [currentPage, name]); // Atualiza os personagens ao mudar de página

  const planetColumns: ColumnsType<PlanetType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Diameter",
      dataIndex: "diameter",
      key: "diameter",
      sorter: (a, b) => parseInt(a.diameter) - parseInt(b.diameter),
      render: (text) =>
        text === "0" || text === "unknown" ? "-" : `${text} km`,
    },
    {
      title: "Climate",
      dataIndex: "climate",
      key: "climate",
      width: 150,
      responsive: ["md"],
    },
    {
      title: "Gravity",
      dataIndex: "gravity",
      key: "gravity",
      responsive: ["md"],
    },
    {
      title: "Terrain",
      dataIndex: "terrain",
      key: "terrain",
      width: 150,
      responsive: ["md"],
    },
    {
      title: "Population",
      dataIndex: "population",
      key: "population",
      sorter: (a, b) => parseInt(a.population) - parseInt(b.population),
      render: (text) => (text === "unknown" ? "-" : text),
    },
  ];

  const onRowClick = (planet: PlanetType) => {
    setPlanet(planet);
    setOpen(true);
  };

  return (
    <div className={"listFilm"}>
      <div className={"search-container"}>
        <Search
          className={"search-box"}
          value={name}
          onChange={(e) => {
            setCurrentPage(1);
            setName(e.target.value);
          }}
          size={"large"}
          style={{ marginBottom: 50 }}
          placeholder="Search"
          enterButton
          color={"black"}
        />
      </div>
      {planets?.results.length ? (
        <Table
          className={"custom-table"}
          columns={planetColumns}
          dataSource={planets?.results}
          pagination={{
            showSizeChanger: false,
            pageSize: 10,
            current: currentPage,
            total: planets?.count,
            onChange: (page) => setCurrentPage(page),
            align: "center",
          }}
          onRow={(planet: PlanetType) => ({
            onClick: () => onRowClick(planet), // Chama a função ao clicar na linha
          })}
        />
      ) : (
        <div style={{ height: 500 }}>
          <h3 style={{ textAlign: "center" }}>No results found</h3>
        </div>
      )}

      <ModalPlanet open={open} setOpen={setOpen} planet={planet} />
    </div>
  );
};

export default PlanetsList;
