import { useState,useEffect } from "react";
import "./Roles.css";
import axios from "axios";
function Roles() {
  
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);


  //fetch roles 
  const fetchRoles = async()=>{
    try{
        const res = await axios.get("http://localhost:5000/api/roles");
        setRoles(res.data.data)
    }catch(err){
        console.log(err);
    }
  }

  //load roles
  useEffect(()=>{
    fetchRoles();
  },[])

  const handleClick = (role) => {
   
    setSelectedRole(role);
  };

  return (
    <div className="roles-container">
      <h2>Roles</h2>

      <div className="roles-grid">
        {roles.map((role) => (
          <div
            key={role._id}
            className={`role-card ${
              selectedRole?._id === role._id ? "active" : ""
            }`}
            onClick={() => handleClick(role)}
          >
            <h3>{role.name}</h3>
          </div>
        ))}
      </div>

      <div className="permissions-section">
        <h3>Permissions</h3>

        {!selectedRole ? (
          <p className="empty-text">Click a role to view permissions</p>
        ) : (
          <div className="permissions-list">
            {selectedRole.permissions.map((perm, index) => (
              <div key={index} className="permission-card">
                {perm}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Roles;