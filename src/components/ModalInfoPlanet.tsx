import Grid from "antd/lib/card/Grid";
import { PlanetType } from "../utils/type/PlanetType.ts";

const ModalInfoPlanet = ({ planet }: { planet: PlanetType }) => {
  return (
    <>
      {" "}
      <h3 className={"titleModal"}>Homeworld</h3>
      <div className={"modalContentFilm"}>
        <Grid>
          <p>
            <b>Planet: </b>
            {planet?.name}
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
          </p>
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
