import "./App.css";
import Layout from "./components/Layout.tsx";
import FilmList from "./pages/FilmList.tsx";

function App() {
  return (
    <main>
      <Layout>
        <FilmList />
      </Layout>
    </main>
  );
}

export default App;
