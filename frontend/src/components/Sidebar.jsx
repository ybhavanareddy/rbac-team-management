import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>

      <Link to="/">Users</Link>
      <Link to="/roles">Roles</Link>
    </div>
  );
}

export default Sidebar;