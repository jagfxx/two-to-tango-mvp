"use client";

import { useState } from 'react';
import "./style.css";

export default function Register() {
  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    console.log('Intento de registro con:', {
      name: formData.name,
      email: formData.email,
      password: formData.password
    });

    // Simulate successful registration
    localStorage.setItem("token", "simulated-jwt-token");
    localStorage.setItem("userEmail", formData.email);
    
    // Redirect to events page
    window.location.href = "/events";
  };

  return (
    <section className="main-container">
      <div className="form-container">
        <h2>Crear Cuenta</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              minLength="6"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              minLength="6"
              required
            />
          </div>

          <button type="submit">Registrarse</button>
          
          <p className="login-link">
            ¿Ya tienes una cuenta? <a href="/auth/login">Inicia sesión aquí</a>
          </p>
        </form>
      </div>
    </section>
  );
}