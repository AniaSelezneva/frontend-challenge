import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllKitties from "./pages/allKitties";
import FavKitties from "./pages/favKitties";
import Layout from "./layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path="/" element={<AllKitties />} />
          <Route exact path="/fav" element={<FavKitties />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
