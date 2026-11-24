export const HABITACIONES_HOTEL = Array.from({ length: 22 }, (_, index) => {
  const numero = index + 1;
  const piso = numero <= 8 ? 1 : numero <= 16 ? 2 : 3;
  const tipo =
    numero <= 10 ? 'Simple' : numero <= 18 ? 'Doble' : 'Suite';
  const tarifa =
    tipo === 'Simple' ? 150 : tipo === 'Doble' ? 250 : 420;
  const estado =
    numero % 4 === 0 ? 'Ocupada' : numero === 7 ? 'Mantenimiento' : 'Disponible';

  return {
    id: numero,
    numero: String(numero),
    codigo: `HAB-${String(numero).padStart(2, '0')}`,
    piso,
    tipo,
    tarifa,
    estado,
    disponibleHasta: '2026-12-31'
  };
});