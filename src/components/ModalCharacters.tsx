import { Button, Modal } from "antd";
import Grid from "antd/lib/card/Grid";
import { getByUrl } from "../api/swapiService.ts";
import { useEffect, useState } from "react";
import { CharacterType } from "../utils/type/CharacterType.ts";
import { getStarWarsImg } from "../utils/utils-functions.ts";
import { PlanetType } from "../utils/type/PlanetType.ts";
import "react-loading-skeleton/dist/skeleton.css";
import ModalInfoPlanet from "./ModalInfoPlanet.tsx";

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
}

const ModalCharacters = ({ open, setOpen, id }: ModalProps) => {
  const [character, setCharacter] = useState<CharacterType | null>(null);
  const [planet, setPlanet] = useState<PlanetType | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchCharacterAndPlanet() {
    try {
      setLoading(true);
      const characterResponse = await getByUrl("people/" + id);
      const planetResponse = await getByUrl(characterResponse.homeworld);
      setCharacter(characterResponse);
      setPlanet(planetResponse);
    } catch (error) {
      alert("Failed to fetch data " + error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      fetchCharacterAndPlanet().then();
    }
  }, [id]);

  return (
    <Modal
      className="modalInfo"
      centered
      loading={loading}
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
            src={getStarWarsImg(id?.toString(), "characters")}
          />
        </Grid>
        <Grid>
          <h1 className={"titleModal"}>{character?.name}</h1>

          <div className={"modalContentFilm"}>
            <Grid>
              <p>
                <b>Birth Year:</b> {character?.birth_year}
              </p>
              <p>
                <b>Height:</b> {character?.height} cm
              </p>
              <p>
                <b>Mass:</b> {character?.mass} kg
              </p>
            </Grid>
            <Grid>
              <p>
                <b>Hair Color:</b> {character?.hair_color}
              </p>
              <p>
                <b>Skin Color:</b> {character?.skin_color}
              </p>
              <p>
                <b>Eyes Color:</b> {character?.eye_color}
              </p>
            </Grid>
          </div>
          {planet && (
            <ModalInfoPlanet planet={planet} isPlanetCharacterSpecie={true} />
          )}
        </Grid>
      </Grid>
    </Modal>
  );
};

export default ModalCharacters;
