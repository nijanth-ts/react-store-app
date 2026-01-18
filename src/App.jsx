import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductListing/ProductListing";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/:id" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
