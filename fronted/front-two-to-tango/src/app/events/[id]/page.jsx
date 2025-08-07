"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

// Página de detalle de evento completamente conectada al backend real
// Incluye: obtención de evento, asistentes, RSVP y sugerencias
// Todo documentado para reto técnico

export default function EventDetailPage() {
  const { id } = useParams(); // Extrae el ID de la URL
  const router = useRouter(); // Permite redireccionar

  // Estados para el evento, asistentes, RSVP y sugerencias
  const [event, setEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [rsvped, setRsvped] = useState(false);
  const [suggestedAttendees, setSuggestedAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Acceso seguro a localStorage sólo en cliente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    // 1. Verificar autenticación y cargar datos sólo en cliente
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    // 2. Obtener datos del evento
    fetch(`${API_URL}/events/${id}`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(async (res) => {
        if (res.ok) {
          setEvent(await res.json());
        } else if (res.status === 401) {
          router.push("/auth/login");
        } else {
          alert("Evento no encontrado o error de backend");
        }
      })
      .catch(() => alert("No se pudo conectar al backend"));
    // 3. Obtener asistentes del evento
    fetch(`${API_URL}/events/${id}/attendees`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setAttendees(data);
          // 4. Verificar si el usuario ya hizo RSVP
          const userId = parseJwt(token).userId;
          setRsvped(data.some((a) => a.id === userId));
          // 5. Obtener sugerencias de asistentes
          fetch(`${API_URL}/events/${id}/suggestions`, {
            headers: { "Authorization": `Bearer ${token}` }
          })
            .then(async (res) => {
              if (res.ok) {
                setSuggestedAttendees(await res.json());
              }
              setLoading(false);
            })
            .catch(() => setLoading(false));
        } else {
          setLoading(false);
        }
      })
      .catch(() => setLoading(false));
  }, [id, router, token]);

  // Decodifica JWT para obtener userId
  function parseJwt(token) {
    try { return JSON.parse(atob(token.split('.')[1])); } catch { return {}; }
  }

  // Función para hacer RSVP real (confirmar asistencia)
  const handleRSVP = async () => {
    if (!token) return;
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    try {
      const res = await fetch(`${API_URL}/events/${id}/rsvp`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (res.ok) {
        setRsvped(true);
        // Refrescar lista de asistentes tras RSVP
        const attendeesRes = await fetch(`${API_URL}/events/${id}/attendees`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (attendeesRes.ok) setAttendees(await attendeesRes.json());
      } else {
        alert("No se pudo registrar asistencia");
      }
    } catch {
      alert("Error de conexión al backend");
    }
  };

  // Mostrar mensaje mientras se valida la autenticación
  if (loading) return <p className="p-4 text-black">Verificando acceso...</p>;

  // Si no se encuentra el evento (ID inválido)
  if (!event) return <div className="p-4 text-black">Evento no encontrado.</div>;

  return (
    <section className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white p-8 rounded border border-gray-200">
        <h1 className="text-2xl font-bold mb-2 text-black">{event.title}</h1>
        <p className="text-black">
          {event.date} – {event.location}
        </p>
        <p className="text-sm text-black mb-4">{(event.tags || []).join(", ")}</p>
        <p className="mb-4 text-black">{event.description}</p>

      {/* Lista de asistentes reales */}
      <h2 className="mt-6 font-bold text-lg text-black">Asistentes:</h2>
      <h2 className="mt-6 font-bold text-lg">Asistentes:</h2>
      <ul className="list-disc list-inside mb-4">
        {attendees.map((a, idx) => (
          <li key={idx}>{a.email}</li>
        ))}
      </ul>

      {/* Lista de asistentes sugeridos por intereses */}
      <h2 className="font-bold text-lg">Sugerencias (basado en tus intereses):</h2>
      <ul className="list-disc list-inside text-blue-800">
        {suggestedAttendees.length === 0 ? (
          <li>No hay asistentes sugeridos aún.</li>
        ) : (
          suggestedAttendees.map((att, idx) => (
            <li key={idx}>
              {att.email} <span className="text-sm text-gray-500">(intereses comunes: {att.sharedInterests?.join(", ")})</span>
            </li>
          ))
        )}
      </ul>
      </div>
    </section>
  );
}
