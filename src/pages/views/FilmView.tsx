import Grid from "antd/lib/card/Grid";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { getCharacterId, getStarWarsImg } from "../../utils/utils-functions.ts";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { FilmType } from "../../utils/type/FilmType.ts";
import { getByUrl } from "../../api/swapiService.ts";
import "../../styles/filmView.css";
import ModalCharacters from "../../components/ModalCharacters.tsx";
import ModalSpecie from "../../components/ModalSpecie.tsx";
import ImageCarousel from "../../components/ImageCarousel.tsx";

const FilmView = () => {
  const { id } = useParams(); // Pega o ID da URL
  const [film, setFilm] = useState<FilmType>();
  const [open, setOpen] = useState<boolean>(false);
  const [openSpecie, setOpenSpecie] = useState<boolean>(false);
  const [character, setCharacter] = useState<string>("");
  const [specie, setSpecie] = useState<string>("");

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

  const charactersImages: string[] = film?.characters
    ?.map((item: string) => {
      const parts = item.split("/").filter(Boolean);
      const id = parts[parts.length - 1];
      return getStarWarsImg(id, "characters");
    })
    .filter(
      (img: string | undefined): img is string =>
        img !== undefined && img !== null,
    );
  const speciesImages: string[] = film?.species
    ?.map((item: string) => {
      const parts = item.split("/").filter(Boolean);
      const id = parts[parts.length - 1];
      return getStarWarsImg(id, "species");
    })
    .filter(
      (img: string | undefined): img is string =>
        img !== undefined && img !== null,
    );

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

      <Row justify="center" className="characters-section">
        <h2 style={{ textAlign: "center" }}>Characters</h2>
        <p className="titleModal" style={{ textAlign: "center" }}>
          *Click on the image to read more info
        </p>
      </Row>
      <ImageCarousel
        imgList={charactersImages}
        infinite={true}
        autoplay={true}
        onClick={(url) => {
          setCharacter(getCharacterId(url));
          setOpen(true);
        }}
      />

      <Row justify="center" className="characters-section">
        <h2 style={{ textAlign: "center" }}>Species</h2>
      </Row>
      <ImageCarousel
        imgList={speciesImages}
        infinite={true}
        autoplay={true}
        onClick={(url) => {
          setSpecie(getCharacterId(url));
          setOpenSpecie(true);
        }}
      />

      <ModalSpecie open={openSpecie} setOpen={setOpenSpecie} id={specie} />
      <ModalCharacters open={open} setOpen={setOpen} id={character} />
    </Grid>
  );
};

export default FilmView;
