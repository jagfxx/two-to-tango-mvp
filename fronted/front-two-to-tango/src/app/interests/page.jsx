'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

const INTEREST_OPTIONS = ["Tech", "Music", "Sports", "Art", "Startups", "Movies"];

export default function InterestsPage() {
  const [selected, setSelected] = useState([]);
  const router = useRouter();

  const toggleInterest = (interest) => {
    setSelected((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSave = () => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      const users = JSON.parse(localStorage.getItem("users") || "{}");
      users[email] = {
        ...(users[email] || {}),
        interests: selected,
      };
      localStorage.setItem("users", JSON.stringify(users));
      alert("Intereses guardados correctamente");
      router.push("/events"); // redirecciona
    }
  };

  return (
    <section className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Selecciona tus intereses</h1>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {INTEREST_OPTIONS.map((interest) => (
          <button
            key={interest}
            onClick={() => toggleInterest(interest)}
            className={`p-2 border rounded-md ${
              selected.includes(interest) ? "bg-blue-500 text-white" : ""
            }`}
          >
            {interest}
          </button>
        ))}
      </div>
      <button
        onClick={handleSave}
        className="bg-green-600 text-white px-4 py-2 rounded"
        disabled={selected.length < 2}
      >
        Guardar Intereses
      </button>
    </section>
  );
}
