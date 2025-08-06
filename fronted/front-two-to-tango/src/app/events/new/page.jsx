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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulamos guardar el evento en localStorage
    const existing = JSON.parse(localStorage.getItem("events")) || [];
    const newEvent = {
      id: Date.now().toString(),
      ...formData,
      tags: formData.tags.split(",").map((t) => t.trim()),
    };

    localStorage.setItem("events", JSON.stringify([...existing, newEvent]));

    alert("Evento creado 🎉");
    router.push("/events");
  };

  return (
    <section className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Crear Nuevo Evento</h1>
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
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Crear Evento
        </button>
      </form>
    </section>
  );
}
