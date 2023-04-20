import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Nav } from "./components/header/index";
import { Home, VenuePage, RegisterCustomerForm, LoginPage } from "./pages";


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route index element={<Home />} />
        <Route path="venues/:id" element={<VenuePage />} />
        <Route path="register/" element={<RegisterCustomerForm />} />
        <Route path="login/" element={<LoginPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
