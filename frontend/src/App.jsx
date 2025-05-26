import { Route, Routes } from "react-router-dom";
import "./App.css";
import Users from "./pages/Users";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
