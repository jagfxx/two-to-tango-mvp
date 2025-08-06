"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

// Lista simulada de eventos
const mockEvents = [
  {
    id: "1",
    title: "Tech Meetup",
    date: "2025-08-10",
    location: "Bogota",
    tags: ["tech", "startups"],
    description: "Un meetup para entusiastas de la tecnologia.",
    attendees: [
      { email: "ana@example.com", interests: ["tech", "books"] },
      { email: "juan@example.com", interests: ["music", "startups"] }
    ]
  },
  {
    id: "2",
    title: "Concierto de Indie",
    date: "2025-08-15",
    location: "Medellin",
    tags: ["music", "indie"],
    description: "Concierto con las mejores bandas emergentes.",
    attendees: [
      { email: "sofia@example.com", interests: ["indie", "movies"] }
    ]
  }
];

export default function EventDetailPage() {
  const { id } = useParams(); // Extrae el ID de la URL
  const router = useRouter(); // Permite redireccionar

  // Estados para el evento, asistencia, sugerencias y carga
  const [event, setEvent] = useState(null);
  const [rsvped, setRsvped] = useState(false);
  const [suggestedAttendees, setSuggestedAttendees] = useState([]);
  const [loading, setLoading] = useState(true); // Indica si aun se valida la autenticacion

  useEffect(() => {
    // Verificar si el usuario esta autenticado
    if (typeof window === "undefined") return;
    const currentEmail = localStorage.getItem("userEmail");

    if (!currentEmail) {
      // Si no hay email, redirigir al login
      router.push("/auth/login");
      return;
    }

    // Buscar el evento por ID
    const foundEvent = mockEvents.find((e) => e.id === id);
    setEvent(foundEvent);

    // Obtener la informacion del usuario
    const allUsers = JSON.parse(localStorage.getItem("users") || "{}");
    const currentUser = allUsers[currentEmail];

    // Validar que existan intereses
    if (!foundEvent || !currentUser?.interests) {
      setLoading(false); // Finalizar carga aunque no se pueda mostrar sugerencias
      return;
    }

    // Filtrar asistentes sugeridos con intereses en comun
    const suggestions = foundEvent.attendees.filter((attendee) => {
      if (attendee.email === currentEmail) return false;
      return attendee.interests?.some((i) =>
        currentUser.interests.includes(i)
      );
    });

    setSuggestedAttendees(suggestions);
    setLoading(false); // Finalizar carga
  }, [id, router]);

  // Funcion que confirma la asistencia (solo visual en este mock)
  const handleRSVP = () => {
    alert("Asistencia confirmada");
    setRsvped(true);
  };

  // Mostrar mensaje mientras se valida la autenticacion
  if (loading) return <p className="p-4">Verificando acceso...</p>;

  // Si no se encuentra el evento (ID invalido)
  if (!event) return <p className="p-4">Evento no encontrado.</p>;

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
      <p className="text-gray-600">
        {event.date} – {event.location}
      </p>
      <p className="text-sm text-gray-500 mb-4">{event.tags.join(", ")}</p>
      <p className="mb-4">{event.description}</p>

      {/* Boton para confirmar asistencia */}
      {!rsvped ? (
        <button
          onClick={handleRSVP}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Confirmar asistencia
        </button>
      ) : (
        <p className="text-green-600 font-semibold mt-2">
          Ya estas registrado en este evento
        </p>
      )}

      {/* Lista de asistentes */}
      <h2 className="mt-6 font-bold text-lg">Asistentes:</h2>
      <ul className="list-disc list-inside mb-4">
        {event.attendees.map((a, idx) => (
          <li key={idx}>{a.email}</li>
        ))}
      </ul>

      {/* Lista de asistentes sugeridos */}
      <h2 className="font-bold text-lg">Sugerencias (basado en tus intereses):</h2>
      <ul className="list-disc list-inside text-blue-800">
        {suggestedAttendees.length === 0 ? (
          <li>No hay asistentes sugeridos aun.</li>
        ) : (
          suggestedAttendees.map((att, idx) => (
            <li key={idx}>
              {att.email}{" "}
              <span className="text-sm text-gray-500">
                (intereses comunes:{" "}
                {att.interests
                  .filter((i) =>
                    JSON.parse(localStorage.getItem("users") || "{}")[localStorage.getItem("userEmail")]?.interests.includes(i)
                  )
                  .join(", ")}
                )
              </span>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
