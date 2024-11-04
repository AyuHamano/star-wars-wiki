import Grid from "antd/lib/card/Grid";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { getStarWarsImg } from "../../utils/utils-functions.ts";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { FilmType } from "../../utils/type/FilmType.ts";
import { getByUrl } from "../../api/swapiService.ts";
import "../../styles/filmView.css";

const FilmView = () => {
  const { id } = useParams(); // Pega o ID da URL
  const [film, setFilm] = useState<FilmType>();

  async function getFilm() {
    const response = await getByUrl("films/" + id);
    setFilm(response);
  }

  useEffect(() => {
    if (id) {
      getFilm().then();
    }
  }, [id]);

  if (!film) return null;

  return (
    <Grid className="container">
      <Row gutter={[16, 16]} justify="center" className="film-view-row">
        <Col xs={24} sm={12} md={8} lg={6} className="film-poster">
          <img
            width="100%"
            height="auto"
            src={getStarWarsImg(film.episode_id.toString(), "films")}
            alt={`${film.title} Poster`}
          />
        </Col>
        <Col xs={24} sm={12} md={16} lg={18} className="film-details">
          <h1>{film.title}</h1>
          <p>
            <b>Release date:</b> {film.release_date}
          </p>
          <p>
            <b>Director:</b> {film.director}
          </p>
          <p>
            <b>Producer:</b> {film.producer}
          </p>
          <p>{film.opening_crawl}</p>
        </Col>
      </Row>
    </Grid>
  );
};

export default FilmView;
