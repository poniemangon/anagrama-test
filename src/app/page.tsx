"use client";

import { useState, useEffect, useRef } from "react";
import { sonIguales, contarLetras } from "@/lib/anagrama";

type Resultado = "anagrama" | "no-anagrama" | null;

export default function Home() {
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [resultado, setResultado] = useState<Resultado>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    // Si alguno está vacío, reset inmediato
    if (!p1.trim() || !p2.trim()) {
      setResultado(null);
      return;
    }

    // Debounce 2 segundos
    timerRef.current = setTimeout(() => {
      setResultado(sonIguales(p1, p2) ? "anagrama" : "no-anagrama");
    }, 500);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [p1, p2]);

  const letras1 = p1.trim()
    ? contarLetras(p1.toLowerCase().replace(/[^\p{L}]/gu, ""))
    : [];
  const letras2 = p2.trim()
    ? contarLetras(p2.toLowerCase().replace(/[^\p{L}]/gu, ""))
    : [];

  const bgClass =
    resultado === "anagrama"
      ? "bg-[#5B7E3C]"
      : resultado === "no-anagrama"
      ? "bg-[#EA5252]"
      : "bg-white";

  const textColor = resultado ? "text-white" : "text-black";
  const subTextColor = resultado ? "text-white/70" : "text-gray-500";
  const labelColor = resultado ? "text-white/80" : "text-gray-600";
  const inputBg = resultado === "anagrama"
    ? "bg-[#4a6a30] text-white placeholder-white/40 focus:ring-white/50"
    : resultado === "no-anagrama"
    ? "bg-[#d44444] text-white placeholder-white/40 focus:ring-white/50"
    : "bg-gray-100 text-black placeholder-gray-400 focus:ring-gray-400";
  const tagBg = resultado === "anagrama"
    ? "bg-[#4a6a30] text-white"
    : resultado === "no-anagrama"
    ? "bg-[#d44444] text-white"
    : "bg-gray-100 text-gray-800";
  const tagCount = resultado ? "text-white/60" : "text-gray-400";
  const sectionBg = resultado === "anagrama"
    ? "bg-[#4a6a30]/60"
    : resultado === "no-anagrama"
    ? "bg-[#d44444]/40"
    : "bg-gray-50 border border-gray-200";

  return (
    <main
      className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-700 ${bgClass}`}
    >
      <div className="w-full max-w-2xl">
        <h1 className={`text-4xl font-bold text-center mb-2 transition-colors duration-700 ${textColor}`}>
          Detector de Anagramas
        </h1>
        <p className={`text-center mb-10 text-sm transition-colors duration-700 ${subTextColor}`}>
          Escribe dos palabras o frases y comprueba si son anagramas entre sí
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {[
            { label: "Palabra o frase 1", value: p1, onChange: setP1, placeholder: "Ej: Roma" },
            { label: "Palabra o frase 2", value: p2, onChange: setP2, placeholder: "Ej: Amor" },
          ].map(({ label, value, onChange, placeholder }) => (
            <div key={label}>
              <label className={`block text-sm font-medium mb-2 transition-colors duration-700 ${labelColor}`}>
                {label}
              </label>
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={`w-full rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 transition-colors duration-700 ${inputBg}`}
              />
            </div>
          ))}
        </div>

        {resultado && (
          <div className="text-center mb-8">
            <p className={`text-2xl font-semibold transition-colors duration-700 ${textColor}`}>
              {resultado === "anagrama" ? "¡Son anagramas!" : "No son anagramas"}
            </p>
            <p className={`text-sm mt-1 transition-colors duration-700 ${subTextColor}`}>
              {resultado === "anagrama"
                ? "Ambas palabras usan exactamente las mismas letras."
                : "Las letras no coinciden."}
            </p>
          </div>
        )}

        {(letras1.length > 0 || letras2.length > 0) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: p1, letras: letras1 },
              { label: p2, letras: letras2 },
            ].map(
              ({ label, letras }, i) =>
                letras.length > 0 && (
                  <div key={i} className={`rounded-xl p-4 transition-colors duration-700 ${sectionBg}`}>
                    <p className={`text-xs font-medium mb-3 uppercase tracking-wide transition-colors duration-700 ${labelColor}`}>
                      Letras en &ldquo;{label}&rdquo;
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {letras
                        .sort((a, b) => a.letra.localeCompare(b.letra))
                        .map(({ letra, cantidad }) => (
                          <span
                            key={letra}
                            className={`rounded-lg px-3 py-1 text-sm font-mono transition-colors duration-700 ${tagBg}`}
                          >
                            {letra}
                            <span className={`ml-1 text-xs transition-colors duration-700 ${tagCount}`}>
                              ×{cantidad}
                            </span>
                          </span>
                        ))}
                    </div>
                  </div>
                )
            )}
          </div>
        )}
      </div>
    </main>
  );
}
