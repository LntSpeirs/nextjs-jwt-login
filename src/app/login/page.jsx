"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const [credenciales, setCredenciales] = useState({ email: "", password: "" });

  const router = useRouter();

  const handleChange = (e) => {
    setCredenciales({
      ...credenciales,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const respuesta = await axios.post("/api/auth/login", credenciales);
    if (respuesta.status === 200) {
      router.push("/dashboard");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="email"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          onChange={handleChange}
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
