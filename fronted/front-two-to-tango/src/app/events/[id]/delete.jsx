"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function DeleteEventPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    setToken(t);
    if (!t) {
      router.push("/auth/login");
      return;
    }
    setLoading(false);
  }, [router]);

  const handleDelete = async () => {
    if (!token) return;
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    try {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (res.ok) {
        router.push("/events");
      } else {
        alert("No se pudo eliminar el evento");
      }
    } catch {
      alert("Error de conexión al backend");
    }
  };

  if (loading) return <div className="p-4">Cargando...</div>;

  return (
    <section className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-white p-8 rounded border w-full max-w-lg text-center">
        <h1 className="text-2xl font-bold mb-4 text-black">Eliminar Evento</h1>
        <p className="mb-4 text-black">¿Estás seguro de que deseas eliminar este evento?</p>
        <button className="bg-red-600 text-white px-4 py-2 rounded mr-2" onClick={handleDelete}>Sí, eliminar</button>
        <button className="bg-gray-300 text-black px-4 py-2 rounded" onClick={() => router.push(`/events/${id}`)}>Cancelar</button>
      </div>
    </section>
  );
}
