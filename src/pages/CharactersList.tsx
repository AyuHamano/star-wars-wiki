import Search from "antd/es/input/Search";
import { Select, Table } from "antd";
import { useEffect, useState } from "react";
import starWarsDirectors from "./mock-select-options/starWarsDirectors.ts";
import { getPeople } from "../api/swapiService.ts";

const CharactersList = () => {
  const [name, setName] = useState("");
  const [filters, setFilters] = useState({
    director: "",
  });
  const [characters, setCharacters] = useState<any>();

  async function getCharacters() {
    try {
      const response = await getPeople();

      setCharacters(response);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getCharacters().then();
    console.log(characters);
  }, []);

  const characterColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Height (cm)",
      dataIndex: "height",
      key: "height",
      render: (height) => `${height} cm`,
    },
    {
      title: "Mass (kg)",
      dataIndex: "mass",
      key: "mass",
      render: (mass) => `${mass} kg`,
    },
    {
      title: "Hair Color",
      dataIndex: "hair_color",
      key: "hair_color",
    },
    {
      title: "Skin Color",
      dataIndex: "skin_color",
      key: "skin_color",
    },
    {
      title: "Eye Color",
      dataIndex: "eye_color",
      key: "eye_color",
    },
    {
      title: "Birth Year",
      dataIndex: "birth_year",
      key: "birth_year",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Homeworld",
      dataIndex: "homeworld",
      key: "homeworld",
      render: (url) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          View Planet
        </a>
      ),
    },
  ];

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
          value={name}
          onChange={(e) => setName(e.target.value)}
          size={"large"}
          style={{ marginBottom: 50 }}
          placeholder="input search text"
          enterButton
          color={"black"}
        />

        <Select
          value={filters.director}
          size={"large"}
          style={{ width: 150, color: "black" }}
          showSearch
          // onChange={(e) => {
          //   console.log(e);
          //   setFilters(director: e});
          // }}
          placeholder="Select a person"
          filterOption={(input, option) =>
            (option?.value ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={starWarsDirectors}
        />
      </div>
      <Table
        className={"custom-table"}
        columns={characterColumns}
        dataSource={characters?.results}
        pagination={{
          pageSize: 10,
          total: characters?.count,
          align: "center",
        }}
      />
    </div>
  );
};

export default CharactersList;
