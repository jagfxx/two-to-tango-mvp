"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setHasToken(true);
      if (pathname === "/auth/login") {
        router.push("/events");
      }
    } else {
      setHasToken(false);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setHasToken(false);
    router.push("/auth/login");
  };

  return (
    <nav className="flex h-[100px] bg-[aliceblue] text-[#18123c]">
      <div className="w-full flex justify-around p-5">
        <div className="flex items-center">
          <img
            fetchPriority="high"
            className="h-[30px] object-cover"
            src="https://static.wixstatic.com/media/86ae48_38295846b4fd47b1bad7966631954623~mv2.png/v1/fill/w_190,h_26,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/header%20logo.png"
            alt="header logo"
          />
          <span className="ml-2 flex items-center">by TTT Networking Inc.</span>
        </div>

        {/* Sign in solo si NO hay token y NO está en /auth/login */}
        {!hasToken && pathname !== "/auth/login" && (
          <Link
            href="/auth/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign in
          </Link>
        )}

        {/* Cerrar sesión solo si hay token */}
        {hasToken && (
          <button
            onClick={handleLogout}
            className="text-red-600 hover:underline font-medium"
          >
            Cerrar sesión
          </button>
        )}
      </div>
    </nav>
  );
}
