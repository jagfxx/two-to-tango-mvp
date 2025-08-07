"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    tags: []
  });
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

  // Función para cargar eventos
  const fetchEvents = async () => {
    try {
      console.log('Obteniendo eventos...');
      const response = await fetch(`${API_URL}/events`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          router.push("/auth/login");
          return;
        }
        const errorText = await response.text();
        console.error('Error en la respuesta del servidor:', errorText);
        throw new Error(`Error ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Eventos recibidos:', data);
      setEvents(Array.isArray(data) ? data : []);
      
    } catch (error) {
      console.error("Error al cargar eventos:", error);
      alert(`Error al cargar eventos: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Crear un nuevo evento
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      // Asegurarse de que la fecha esté en formato ISO
      const eventData = {
        ...newEvent,
        date: new Date(newEvent.date).toISOString(),
        // Asegurarse de que los tags sean un array de strings
        tags: Array.isArray(newEvent.tags) ? newEvent.tags : 
             (typeof newEvent.tags === 'string' ? 
              newEvent.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : 
              [])
      };

      console.log('Enviando datos del evento:', eventData);

      const response = await fetch(`${API_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(eventData)
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('Error del servidor:', error);
        throw new Error(error || 'Error al crear el evento');
      }

      const createdEvent = await response.json();
      console.log('Evento creado:', createdEvent);
      
      // Actualizar la lista de eventos
      await fetchEvents();
      
      // Cerrar el formulario y limpiar
      setIsCreating(false);
      setNewEvent({ title: '', description: '', date: '', location: '', tags: [] });
      
    } catch (error) {
      console.error("Error al crear el evento:", error);
      alert(`Error al crear el evento: ${error.message}`);
    }
  };

  // Eliminar un evento
  const handleDeleteEvent = async (eventId) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este evento?')) return;
    
    try {
      const response = await fetch(`${API_URL}/events/${eventId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        await fetchEvents();
      } else {
        const error = await response.json();
        alert(error.message || 'Error al eliminar el evento');
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al eliminar el evento");
    }
  };

  // Manejar RSVP a un evento
  const handleRSVP = async (eventId) => {
    try {
      console.log(`Enviando RSVP para el evento ${eventId}...`);
      console.log('Token JWT:', token ? 'Presente' : 'Ausente');
      
      if (!token) {
        throw new Error('No se encontró el token de autenticación. Por favor, inicia sesión nuevamente.');
      }

      // Verificar que el token sea válido
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('Payload del token:', payload);
        console.log('ID de usuario del token:', payload.sub);
      } catch (e) {
        console.error('Error al decodificar el token:', e);
      }

      const response = await fetch(`${API_URL}/events/${eventId}/rsvp`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({}) // Cuerpo vacío ya que solo necesitamos el ID del evento y el token JWT
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error en la respuesta del servidor:', {
          status: response.status,
          statusText: response.statusText,
          url: response.url,
          headers: Object.fromEntries(response.headers.entries()),
          error: errorText
        });
        throw new Error(errorText || `Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('RSVP exitoso:', result);
      
      // Actualizar la lista de eventos para reflejar el RSVP
      await fetchEvents();
      
      // Mostrar mensaje de éxito
      alert('¡Has confirmado tu asistencia al evento!');
      
    } catch (error) {
      console.error("Error al confirmar asistencia:", error);
      alert(`Error al confirmar asistencia: ${error.message}`);
    }
  };

  useEffect(() => {
    if (!token) {
      router.push("/auth/login");
      return;
    }

    // Detectar rol admin desde el JWT
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setIsAdmin(payload.role === 'admin');
    } catch (error) {
      console.error("Error al decodificar el token:", error);
    }

    fetchEvents();
  }, [router, token]);

  if (loading) return <div className="p-4">Cargando eventos...</div>;

  return (
    <section className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-black">Eventos Disponibles</h1>
          <button
            onClick={() => setIsCreating(!isCreating)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            {isCreating ? 'Cancelar' : 'Nuevo Evento'}
          </button>
        </div>

        {/* Formulario para crear nuevo evento */}
        {isCreating && (
          <form onSubmit={handleCreateEvent} className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Crear Nuevo Evento</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
                <input
                  type="text"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha y Hora</label>
                <input
                  type="datetime-local"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Etiquetas (separadas por comas)</label>
                <input
                  type="text"
                  value={newEvent.tags.join(', ')}
                  onChange={(e) => setNewEvent({...newEvent, tags: e.target.value.split(',').map(tag => tag.trim())})}
                  className="w-full p-2 border rounded"
                  placeholder="ej: música, deporte, comida"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  className="w-full p-2 border rounded"
                  rows="3"
                  required
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
            >
              Crear Evento
            </button>
          </form>
        )}

        {/* Lista de eventos */}
        {events.length === 0 ? (
          <p className="text-center text-gray-500">No hay eventos disponibles en este momento.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold text-gray-800">{event.title}</h2>
                  {isAdmin && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => router.push(`/events/${event.id}/edit`)}
                        className="text-yellow-600 hover:text-yellow-800"
                        title="Editar"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Eliminar"
                      >
                        🗑️
                      </button>
                    </div>
                  )}
                </div>
                
                <p className="text-gray-600 mt-2">{event.description?.substring(0, 100)}{event.description?.length > 100 ? '...' : ''}</p>
                
                <div className="mt-3">
                  <p className="text-sm font-medium">📅 {new Date(event.date).toLocaleString()}</p>
                  <p className="text-sm font-medium">📍 {event.location}</p>
                </div>
                
                {event.tags && event.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {event.tags.map((tag, index) => (
                      <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => handleRSVP(event.id)}
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                  >
                    Confirmar Asistencia
                  </button>
                  <a
                    href={`/events/${event.id}`}
                    className="text-blue-600 hover:underline text-sm font-medium"
                  >
                    Ver detalles →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

