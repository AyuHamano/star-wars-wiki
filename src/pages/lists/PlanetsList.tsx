import { Table } from "antd";
import { useEffect, useState } from "react";
import { getByUrl } from "../../api/swapiService.ts";
import "../../styles/cards.css";

import Search from "antd/es/input/Search";
import { ListResponseApiType } from "../../utils/type/ListResponseApiType.ts";
import { PlanetType } from "../../utils/type/PlanetType.ts";
import { ColumnsType } from "antd/es/table";

const PlanetsList = () => {
  const [name, setName] = useState("");
  const [planets, setPlanets] =
    useState<ListResponseApiType<PlanetType> | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // Estado para a página atual

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
      title: "Rotation Period",
      dataIndex: "rotation_period",
      key: "rotation_period",
      sorter: (a, b) =>
        parseInt(a.rotation_period) - parseInt(b.rotation_period),
      render: (text) => (text === "unknown" ? "-" : text),
      responsive: ["lg"],
    },
    {
      title: "Orbital Period",
      dataIndex: "orbital_period",
      key: "orbital_period",
      sorter: (a, b) => parseInt(a.orbital_period) - parseInt(b.orbital_period),
      render: (text) => (text === "unknown" ? "-" : text),
      responsive: ["lg"],
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
      title: "Surface Water",
      dataIndex: "surface_water",
      key: "surface_water",
      sorter: (a, b) => parseInt(a.surface_water) - parseInt(b.surface_water),
      render: (text) => (text === "unknown" ? "-" : `${text}%`),
    },
    {
      title: "Population",
      dataIndex: "population",
      key: "population",
      sorter: (a, b) => parseInt(a.population) - parseInt(b.population),
      render: (text) => (text === "unknown" ? "-" : text),
    },
  ];

  return (
    <div
      className={"listFilm"}
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
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
        />
      ) : (
        <div style={{ height: 500 }}>
          <h3 style={{ textAlign: "center" }}>No results found</h3>
        </div>
      )}
    </div>
  );
};

export default PlanetsList;
