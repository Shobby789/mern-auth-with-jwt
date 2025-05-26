import React, { useEffect, useState } from "react";
import { BASE_API } from "../api/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const token = Cookies.get("userToken");
    console.log("token >>", token);
    try {
      const res = await axios.get(`${BASE_API}/users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      setUsers(res?.data?.data);
    } catch (error) {
      console.log("Fetch error:", error);
      if (error.status == 400) {
        navigate("/login");
        alert("Session expired! login again");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogout = () => {
    Cookies.remove("userToken");
    navigate("/login");
  };
  return (
    <div className="px-4 md:px-8 lg:px-20 2xl:px-40 py-12 lg:py-20">
      <div className="w-full">
        <h2>User List</h2>
        <button onClick={handleLogout} type="button">
          Logout
        </button>
      </div>
      <div className="mt-5">
        {users.map((user, index) => {
          return (
            <div key={index} className="grid grid-cols-4 gap-6 border-b py-5">
              <p>{user?._id}</p>
              <p>{user?.name}</p>
              <p>{user?.email}</p>
              <p>{user?.role}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserList;
