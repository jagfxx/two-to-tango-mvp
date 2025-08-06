"use client";

import { useEffect, useState } from "react";

const allInterests = [
  "tech", "music", "startups", "sports", "books", "movies", "indie"
];

export default function ProfilePage() {
  const [userEmail, setUserEmail] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);

  // Cargar email e intereses del localStorage
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const savedInterests = JSON.parse(localStorage.getItem("userInterests")) || [];

    setUserEmail(email || "");
    setSelectedInterests(savedInterests);
  }, []);

  // Manejar selección
  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  // Guardar en localStorage
  const handleSave = () => {
    localStorage.setItem("userInterests", JSON.stringify(selectedInterests));
    alert("Intereses guardados ✅");
  };

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mi perfil</h1>
      <p className="mb-4">Correo: <strong>{userEmail || "No logueado"}</strong></p>

      <h2 className="text-lg font-semibold mb-2">Selecciona tus intereses</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {allInterests.map((interest) => (
          <button
            key={interest}
            onClick={() => toggleInterest(interest)}
            className={`px-3 py-1 rounded-full border ${
              selectedInterests.includes(interest)
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {interest}
          </button>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Guardar intereses
      </button>
    </section>
  );
}
