"use client";

import { useState } from "react";
import { sonIguales, contarLetras } from "@/lib/anagrama";

export default function Home() {
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");

  const ambosConValor = p1.trim() !== "" && p2.trim() !== "";
  const esAnagrama = ambosConValor ? sonIguales(p1, p2) : null;

  const letras1 = p1.trim()
    ? contarLetras(p1.toLowerCase().replace(/[^\p{L}]/gu, ""))
    : [];
  const letras2 = p2.trim()
    ? contarLetras(p2.toLowerCase().replace(/[^\p{L}]/gu, ""))
    : [];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-white text-center mb-2">
          Detector de Anagramas
        </h1>
        <p className="text-slate-400 text-center mb-10 text-sm">
          Escribe dos palabras o frases y comprueba si son anagramas entre sí
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Palabra o frase 1
            </label>
            <input
              type="text"
              value={p1}
              onChange={(e) => setP1(e.target.value)}
              placeholder="Ej: Roma"
              className="w-full rounded-xl bg-slate-700 text-white placeholder-slate-500 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Palabra o frase 2
            </label>
            <input
              type="text"
              value={p2}
              onChange={(e) => setP2(e.target.value)}
              placeholder="Ej: Amor"
              className="w-full rounded-xl bg-slate-700 text-white placeholder-slate-500 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
        </div>

        {ambosConValor && (
          <div
            className={`rounded-2xl p-6 text-center mb-8 ${
              esAnagrama
                ? "bg-emerald-500/20 border border-emerald-500"
                : "bg-rose-500/20 border border-rose-500"
            }`}
          >
            <span className="text-5xl mb-3 block">
              {esAnagrama ? "✅" : "❌"}
            </span>
            <p className="text-xl font-semibold text-white">
              {esAnagrama ? "¡Son anagramas!" : "No son anagramas"}
            </p>
            <p className="text-slate-400 text-sm mt-1">
              {esAnagrama
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
                  <div key={i} className="bg-slate-700/50 rounded-xl p-4">
                    <p className="text-slate-400 text-xs font-medium mb-3 uppercase tracking-wide">
                      Letras en &ldquo;{label}&rdquo;
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {letras
                        .sort((a, b) => a.letra.localeCompare(b.letra))
                        .map(({ letra, cantidad }) => (
                          <span
                            key={letra}
                            className="bg-slate-600 text-white rounded-lg px-3 py-1 text-sm font-mono"
                          >
                            {letra}
                            <span className="ml-1 text-slate-400 text-xs">
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
