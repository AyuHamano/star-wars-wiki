import { Table } from "antd";
import { useEffect, useState } from "react";
import { getByUrl } from "../../api/swapiService.ts";
import "../../styles/cards.css";

import Search from "antd/es/input/Search";
import { ListResponseApiType } from "../../type/ListResponseApiType.ts";
import { PlanetType } from "../../type/PlanetType.ts";
import { ColumnsType } from "antd/es/table";
import ModalPlanet from "../../components/ModalPlanet.tsx";
import Grid from "antd/es/card/Grid";
import { MoonLoader } from "react-spinners";

const PlanetsList = () => {
  const [name, setName] = useState("");
  const [planets, setPlanets] =
    useState<ListResponseApiType<PlanetType> | null>(null);
  const [planet, setPlanet] = useState<PlanetType>();
  const [currentPage, setCurrentPage] = useState(1); // Estado para a página atual
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  async function getPlanetsList(page: number) {
    const params = {
      page: page,
      search: name,
    };
    try {
      setLoading(true);
      const response = await getByUrl("planets", params);
      setPlanets(response);
    } catch (e) {
      alert("Failed to fetch data " + e);
    } finally {
      setLoading(false);
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
      width: 150,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Diameter",
      dataIndex: "diameter",
      key: "diameter",
      width: 150,
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
      width: 300,
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
      width: 150,
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
      {planets?.results.length && (
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
      )}
      {!loading && !planets?.results.length && (
        <div style={{ height: 500 }}>
          <h3 style={{ textAlign: "center" }}>No results found</h3>
        </div>
      )}

      {loading && (
        <Grid style={{ padding: 20 }}>
          <MoonLoader color={"#ffffff"} />
        </Grid>
      )}

      <ModalPlanet open={open} setOpen={setOpen} planet={planet} />
    </div>
  );
};

export default PlanetsList;
