import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Nav } from "./components/header/index";
import { Home } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route index element={<Home />} />
        {/*  <Route path="Contact" element={<ContactPage />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="Checkout" element={<Checkout />} />
  <Route path="CheckoutSuccess" element={<CheckoutSuccess />} />   */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
