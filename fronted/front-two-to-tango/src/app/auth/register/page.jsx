"use client";

import { useState } from 'react';

export default function Register() {
  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    interests: '' // Nuevo campo para intereses
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          interests: formData.interests.split(',').map(i => i.trim()).filter(Boolean)
        }),
      });
      const data = await res.json();
      if (res.ok && data.email) {
        window.location.href = "/auth/login";
      } else {
        alert(data.message || "Error en el registro");
      }
    } catch (err) {
      alert("Error de red o backend");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md bg-white p-8 rounded border border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Crear Cuenta</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-black font-semibold mb-1">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-black font-semibold mb-1">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label htmlFor="interests" className="block text-black font-semibold mb-1">Intereses (separados por coma):</label>
            <input
              type="text"
              id="interests"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-black font-semibold mb-1">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              minLength="6"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-black font-semibold mb-1">Confirmar Contraseña:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              minLength="6"
              required
            />
          </div>

          <button type="submit" className="w-full bg-white border border-gray-300 text-black py-2 rounded hover:bg-gray-100 transition font-semibold">Registrarse</button>
          
          {/* Enlace para ir a la página de login */}
          <div className="mt-4 text-center">
            <a href="/auth/login" className="text-black hover:underline">
              ¿Ya tienes cuenta? Inicia sesión aquí
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}