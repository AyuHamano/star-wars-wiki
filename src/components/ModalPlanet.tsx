import { Button, Modal } from "antd";
import Grid from "antd/lib/card/Grid";
import { PlanetType } from "../type/PlanetType.ts";
import "react-loading-skeleton/dist/skeleton.css";
import ModalInfoPlanet from "./ModalInfoPlanet.tsx";

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  planet: PlanetType | undefined;
}

const ModalPlanet = ({ open, setOpen, planet }: ModalProps) => {
  if (!planet) return;
  return (
    <Modal
      className="modalInfo"
      centered
      width={400}
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
      <Grid
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1 className={"titleModal"}>{planet?.name}</h1>
        {planet && (
          <ModalInfoPlanet planet={planet} isPlanetCharacterSpecie={false} />
        )}
      </Grid>
    </Modal>
  );
};

export default ModalPlanet;
