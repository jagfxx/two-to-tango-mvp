"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditEventPage() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    tags: "",
  });
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    setToken(t);
    if (!t) {
      router.push("/auth/login");
      return;
    }
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    fetch(`${API_URL}/events/${id}`, {
      headers: { "Authorization": `Bearer ${t}` }
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setFormData({
            title: data.title,
            description: data.description,
            date: data.date?.slice(0, 16),
            location: data.location,
            tags: (data.tags || []).join(", "),
          });
        } else {
          alert("No se pudo cargar el evento");
          router.push("/events");
        }
        setLoading(false);
      })
      .catch(() => {
        alert("No se pudo conectar al backend");
        setLoading(false);
      });
  }, [id, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("Debes iniciar sesión");
      return;
    }
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const eventData = {
      ...formData,
      tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };
    try {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
      });
      if (res.ok) {
        router.push(`/events/${id}`);
      } else {
        alert("No se pudo actualizar el evento");
      }
    } catch {
      alert("Error de conexión al backend");
    }
  };

  if (loading) return <div className="p-4">Cargando evento...</div>;

  return (
    <section className="min-h-screen bg-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded border w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-black">Editar Evento</h1>
        <label className="block mb-2 text-black">Título
          <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border p-2 rounded mb-4" required />
        </label>
        <label className="block mb-2 text-black">Descripción
          <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border p-2 rounded mb-4" required />
        </label>
        <label className="block mb-2 text-black">Fecha
          <input type="datetime-local" name="date" value={formData.date} onChange={handleChange} className="w-full border p-2 rounded mb-4" required />
        </label>
        <label className="block mb-2 text-black">Lugar
          <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full border p-2 rounded mb-4" required />
        </label>
        <label className="block mb-2 text-black">Intereses/Tags (separados por coma)
          <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="w-full border p-2 rounded mb-4" />
        </label>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Actualizar Evento</button>
      </form>
    </section>
  );
}
