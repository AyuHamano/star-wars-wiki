import { Button, Table } from "antd";

const FilmsTable = ({ filmsList }) => {
  const columns = [
    {
      title: "Poster",
      render: (poster: string) => <img width={60} height={100} src={poster} />,
      dataIndex: "poster",
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
    },
    {
      title: "Release date",
      key: "release_date",
      dataIndex: "release_date",
    },
    {
      title: "Options",
      key: "release_date",
      render: () => {
        return <Button>Read more</Button>;
      },
    },
  ];

  const rows = filmsList?.results?.map((item) => ({
    ...item,
    poster: `src/assets/films/${item.episode_id}.png`,
  }));

  return (
    <div>
      {filmsList?.results?.length > 0 && (
        <Table
          className={"custom-table"}
          columns={columns}
          dataSource={rows}
          pagination={{ pageSize: 3, total: filmsList?.count, align: "center" }}
        />
      )}
    </div>
  );
};

export default FilmsTable;
