import { Table } from "antd";
import { ColumnType } from "antd/es/table";

import { FilmType } from "../type/FilmType.ts";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

interface FilmsTableProps {
  filmsList: FilmType[];
  total: number;
  onRowClick: (film: FilmType) => void;
}

const FilmsTable = ({ filmsList, total, onRowClick }: FilmsTableProps) => {
  const urlImg = "https://starwars-visualguide.com/assets/img/films/{id}.jpg";
  const columns: ColumnType<FilmType>[] = [
    {
      title: "Poster",
      render: (episode_id: number) => (
        <img
          key={episode_id}
          width={80}
          height={100}
          src={urlImg.replace("{id}", episode_id?.toString())}
        />
      ),
      dataIndex: "episode_id", // Define "episode_id" como o dataIndex para acessar o ID diretamente
      key: "poster",
    },
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "Director",
      key: "director",
      dataIndex: "director",
    },
    {
      title: "Producer",
      key: "producer",
      dataIndex: "producer",
      width: 400,
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Release date",
      key: "release_date",
      dataIndex: "release_date",
    },
  ];

  return (
    <>
      {filmsList?.length > 0 ? (
        <Table
          className={"custom-table"}
          columns={columns}
          dataSource={filmsList}
          pagination={{
            pageSize: 3,
            total: total,
            align: "center",
            showSizeChanger: false,
          }}
          onRow={(film: FilmType) => ({
            onClick: () => onRowClick(film), // Chama a função ao clicar na linha
          })}
        />
      ) : (
        <Skeleton />
      )}
    </>
  );
};

export default FilmsTable;
