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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.access_token) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("userEmail", formData.email);
        window.location.href = "/events";
      } else {
        alert(data.message || "Credenciales invalidas");
      }
    } catch (err) {
      alert("Error de red o backend");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md bg-white p-8 rounded border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-black font-semibold mb-1">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-black font-semibold mb-1">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button type="submit" className="w-full bg-white border border-gray-300 text-black py-2 rounded hover:bg-gray-100 transition font-semibold">Iniciar Sesión</button>
        </form>
        {/* Enlace para ir a la página de registro */}
        {/* Enlace para ir a la página de registro */}
        <div className="mt-4 text-center">
          <a href="/auth/register" className="text-black hover:underline">
            ¿No tienes cuenta? Regístrate aquí
          </a>
        </div>
      </div>
    </section>
  );
}

