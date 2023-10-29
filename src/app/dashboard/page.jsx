"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();

  const getProfile = async () => {
    const respuesta = await axios.get("/api/profile");
    setUser(respuesta.data);
  };

  const logout = async () => {
    try {
      const respuesta = await axios.post("/api/auth/logout");
      //console.log("Logged out", respuesta);
      router.push("/login");
    } catch (error) {
      console.log("Error al cerrar sesión", error);
    }
  };

  return (
    <div>
      <h1>dashboard</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button onClick={getProfile}>Obtener perfil</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
