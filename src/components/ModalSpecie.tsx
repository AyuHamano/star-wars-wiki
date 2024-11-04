import { Button, Modal } from "antd";
import Grid from "antd/lib/card/Grid";
import { getByUrl } from "../api/swapiService.ts";
import { useEffect, useState } from "react";
import { getStarWarsImg } from "../utils/utils-functions.ts";
import { PlanetType } from "../utils/type/PlanetType.ts";
import "react-loading-skeleton/dist/skeleton.css";
import ModalInfoPlanet from "./ModalInfoPlanet.tsx";
import { SpecieType } from "../utils/type/SpecieType.ts";

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
}

const ModalSpecie = ({ open, setOpen, id }: ModalProps) => {
  const [specie, setSpecie] = useState<SpecieType | null>(null);
  const [planet, setPlanet] = useState<PlanetType | null>(null);

  const [loading, setLoading] = useState(true);

  async function fetchSpecieAndPlanet() {
    try {
      setLoading(true);
      const specieResponse = await getByUrl("species/" + id);
      setSpecie(specieResponse);

      if (specieResponse.homeworld) {
        const planetResponse = await getByUrl(specieResponse.homeworld);
        setPlanet(planetResponse);
      }
    } catch (error) {
      alert("Failed to fetch data " + error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      fetchSpecieAndPlanet().then();
    }
  }, [id]);

  return (
    <Modal
      className="modalInfo"
      loading={loading}
      centered
      width={1000}
      height={"auto"}
      open={open}
      onCancel={() => {
        setOpen(false);
      }}
      destroyOnClose
      footer={[
        <Button key="back" onClick={() => setOpen(false)}>
          Close
        </Button>,
      ]}
    >
      <Grid className={"modalContentFilm"}>
        <Grid style={{ display: "flex", alignItems: "center" }}>
          <img
            width={250}
            height={350}
            src={getStarWarsImg(id?.toString(), "species")}
          />
        </Grid>
        <Grid>
          <h1 className={"titleModal"}>{specie?.name}</h1>

          <div className={"modalContentFilm"}>
            <Grid>
              <p>
                <b>Classification: </b> {specie?.classification}
              </p>
              <p>
                <b>Average height: </b> {specie?.average_height}
              </p>
              <p>
                <b>Hair Colors: </b>
                {specie?.average_lifespan}
              </p>
            </Grid>
            <Grid>
              <p>
                <b>Language: </b> {specie?.language}
              </p>
              <p>
                <b>Skin Colors: </b>
                {specie?.skin_colors}
              </p>
              <p>
                <b>Eyes Colors: </b>
                {specie?.eye_colors}
              </p>
            </Grid>
          </div>
          {planet && planet?.name !== "unknown" && (
            <ModalInfoPlanet planet={planet} isPlanetCharacterSpecie={true} />
          )}
        </Grid>
      </Grid>
    </Modal>
  );
};

export default ModalSpecie;
