"use client";

// Importa hooks de React y Next.js
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Permite redireccionar programaticamente

// Lista simulada de eventos, como si viniera del backend
const mockEvents = [
  {
    id: 1,
    title: "Tech Meetup",
    date: "2025-08-10",
    location: "Bogota",
    tags: ["tech", "startups"]
  },
  {
    id: 2,
    title: "Concierto de Indie",
    date: "2025-08-15",
    location: "Medellin",
    tags: ["music", "indie"]
  }
];

// Componente principal de la pagina de eventos
export default function EventsPage() {
  const [events, setEvents] = useState([]); // Estado para almacenar los eventos
  const router = useRouter(); // Hook para redireccionar

  useEffect(() => {
    // Obtener el token almacenado en localStorage
    const token = localStorage.getItem("token");

    // Si no existe el token, redireccionar al login
    if (!token) {
      router.push("/login");
    } else {
      // Si hay token, cargar los eventos simulados
      setEvents(mockEvents);
    }
  }, []);

  return (
    // Seccion principal de la pagina
    <section className="p-6">
      {/* Titulo de la pagina */}
      <h1 className="text-2xl font-bold mb-4">Eventos Disponibles</h1>

      {/* Grid de eventos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((event) => (
          // Tarjeta individual de evento
          <div key={event.id} className="border rounded-lg p-4 shadow-sm">
            {/* Titulo del evento */}
            <h2 className="text-xl font-semibold">{event.title}</h2>

            {/* Fecha y lugar */}
            <p>{event.date} – {event.location}</p>

            {/* Etiquetas del evento */}
            <p className="text-sm text-gray-500">{event.tags.join(", ")}</p>

            {/* Enlace a los detalles del evento */}
            <a
              href={`/events/${event.id}`}
              className="text-blue-600 hover:underline mt-2 inline-block"
            >
              Ver detalles →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

