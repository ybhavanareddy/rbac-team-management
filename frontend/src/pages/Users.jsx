import { useState, useEffect } from "react";
import "./Users.css";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");


  //fectch users 

  const fetchUsers = async()=>{
    try{
        const res = await axios.get("http://localhost:5000/api/users");
        
        setUsers(res.data.users)
    }catch(err){
        console.log(err);
    }
  }

  //fecth users on page load
  useEffect(()=>{
    fetchUsers()
  },[])


  //create user
  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!name || !email) return;


    try{
        await axios.post("http://localhost:5000/api/users",{name,email});
        
        fetchUsers();

        setName("");
        setEmail("");
    }catch(err){
        console.log(err);
    }

};

  return (
    <div className="users-container">
      <h2>Users</h2>

      {/* FORM */}
      <form className="user-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Add User</button>
      </form>

      {/* LIST */}
      <div className="user-list">
        {users.length === 0 ? (
          <p>No users yet</p>
        ) : (
          users.map((user, index) => (
            <div key={index} className="user-card">
              <p><strong>{user.name}</strong></p>
              <p>{user.email}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Users;