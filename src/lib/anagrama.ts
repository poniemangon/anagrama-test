export function contarLetras(palabra: string) {
  const contador: Record<string, number> = {};

  for (const letra of palabra) {
    contador[letra] = (contador[letra] || 0) + 1;
  }

  return Object.entries(contador).map(([letra, cantidad]) => ({
    letra,
    cantidad,
  }));
}

export function sonIguales(p1: string, p2: string): boolean {
  p1 = p1.toLowerCase().replace(/[^\p{L}]/gu, "");
  p2 = p2.toLowerCase().replace(/[^\p{L}]/gu, "");

  if (p1.length !== p2.length) return false;

  const contador: Record<string, number> = {};

  for (const letra of p1) {
    contador[letra] = (contador[letra] || 0) + 1;
  }

  for (const letra of p2) {
    if (!contador[letra]) return false;
    contador[letra]--;
  }

  return true;
}
