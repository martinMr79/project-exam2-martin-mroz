import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, VenuePage, RegisterCustomerForm, LoginPage } from "./pages";
import { Nav } from "./components/header";
import useAuthStore from "./hooks/useAuthStore";

function App() {
  const { decodedToken } = useAuthStore();
  console.log("decodedToken from useAuthStore:", decodedToken);

  return (
    <BrowserRouter>
      <Nav decodedToken={decodedToken} />
      <Routes>
        <Route index element={<Home />} />
        <Route path="venues/:id" element={<VenuePage />} />
        <Route path="register/" element={<RegisterCustomerForm />} />
        <Route path="login/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
