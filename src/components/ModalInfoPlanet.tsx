import Grid from "antd/lib/card/Grid";
import { PlanetType } from "../type/PlanetType.ts";

const ModalInfoPlanet = ({
  planet,
  isPlanetCharacterSpecie,
}: {
  planet: PlanetType;
  isPlanetCharacterSpecie: boolean;
}) => {
  return (
    <>
      {isPlanetCharacterSpecie && <h3 className={"titleModal"}>Homeworld</h3>}{" "}
      <div className={"modalContentFilm"}>
        <Grid>
          {isPlanetCharacterSpecie && (
            <p>
              <b>Planet: </b>
              {planet?.name}
            </p>
          )}
          <p>
            <b>Orbital period: </b>
            {planet?.rotation_period}
          </p>
          <p>
            <b>Surface Water: </b>
            {planet?.surface_water}
          </p>
          <p>
            <b>Diameter: </b>
            {planet?.diameter} km
          </p>
          <p>
            <b>Climate: </b>
            {planet?.climate}
          </p>
        </Grid>
        <Grid>
          <p>
            <b>Gravity: </b>
            {planet?.gravity}
          </p>
          <p>
            <b>Orbital period: </b>
            {planet?.orbital_period}
          </p>{" "}
          <p>
            <b>Population: </b>
            {planet?.population}
          </p>
        </Grid>
      </div>
    </>
  );
};

export default ModalInfoPlanet;
