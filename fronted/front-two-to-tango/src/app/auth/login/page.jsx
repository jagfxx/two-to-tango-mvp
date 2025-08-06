"use client";

import { useState } from 'react';
import "./style.css";

export default function Login() {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Manejador para cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejador para el envio del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita recargar la pagina
    console.log('Intento de inicio de sesion con:', formData);

    // Validacion simple de credenciales (simulada)
    if (formData.email === "test@correo.com" && formData.password === "123") {
      // Guardar token simulado y correo en el localStorage
      localStorage.setItem("token", "simulated-jwt-token");
      localStorage.setItem("userEmail", formData.email);

      // Redirigir a la pagina de eventos
      window.location.href = "/events";
    } else {
      alert("Credenciales invalidas");
    }
  };

  return (
    <section className="main-container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="input-email">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-password">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Iniciar Sesion</button>
        </form>
      </div>
    </section>
  );
}

