import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      style={{
        margin: 0,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ width: "100%" }}>
        <img
          width={400}
          height={350}
          src={"src/assets/films/star-wars-logo-1002.png"}
        />
      </div>
      {children}
    </div>
  );
};

export default Layout;
