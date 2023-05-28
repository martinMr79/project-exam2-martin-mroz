import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  VenuePage,
  RegisterCustomerForm,
  LoginPage,
  RegisterVenueManagerForm,
} from "./pages";
import { Nav } from "./components/header";
import User from "./components/profile/user";
import ManagerProfile from "./components/profile/venueManager";
import useAuthStore from "./hooks/useAuthStore";

function App() {
  const { decodedToken, clearAccessToken } = useAuthStore();

  const handleLogout = () => {
    clearAccessToken();
    window.location.reload();
  };

  const renderProfile = () => {
    if (!decodedToken) {
      return <LoginPage />;
    }

    return decodedToken.venueManager ? (
      <ManagerProfile decodedToken={decodedToken} handleLogout={handleLogout} />
    ) : (
      <User decodedToken={decodedToken} handleLogout={handleLogout} />
    );
  };

  return (
    <BrowserRouter>
      <Nav decodedToken={decodedToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="venues/:id" element={<VenuePage />} />
        <Route path="register" element={<RegisterCustomerForm />} />
        <Route path="registerManager" element={<RegisterVenueManagerForm />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="profile" element={renderProfile()} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

