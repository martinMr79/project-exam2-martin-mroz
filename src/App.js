import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Nav } from "./components/header/index";
import { Home, VenuePage } from "./pages";


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route index element={<Home />} />
        <Route path="venues/:id" element={<VenuePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
