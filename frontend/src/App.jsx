import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Users from "./pages/Users";
import Roles from "./pages/Roles";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Sidebar />

      <div className="content">
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/roles" element={<Roles />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;