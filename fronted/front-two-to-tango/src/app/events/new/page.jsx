"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewEventPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    tags: "",
  });
  const [loading, setLoading] = useState(true); // Nuevo para SSR/CSR
  const [token, setToken] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Acceso seguro a localStorage sólo en cliente
    const t = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    setToken(t);
    setLoading(false);
  }, []);

  // Maneja el envío del formulario para crear un evento real en el backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("Debes iniciar sesión para crear eventos");
      router.push("/auth/login");
      return;
    }
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const eventData = {
      ...formData,
      tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };
    try {
      const res = await fetch(`${API_URL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/events");
      } else {
        alert(data.message || "Error al crear evento");
      }
    } catch (err) {
      alert("No se pudo conectar al backend");
    }
  };

  if (loading) return <div className="p-4">Cargando...</div>;

  return (
    <section className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-xl bg-white p-8 rounded border border-gray-200">
        <h1 className="text-2xl font-bold mb-4 text-black">Crear Nuevo Evento</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Ubicación"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="tags"
          placeholder="Intereses separados por coma (ej: tech, música)"
          value={formData.tags}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 text-gray-800 rounded"
        />
        <button type="submit" className="w-full bg-white border border-gray-300 text-black py-2 rounded hover:bg-gray-100 transition font-semibold">Crear Evento</button>
      </form>
    </section>
  );
}
