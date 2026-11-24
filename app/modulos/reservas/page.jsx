'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FondoHotel from '../../components/FondoHotel';

const HABITACIONES_22 = Array.from({ length: 22 }, (_, i) => {
  const num = i + 1;
  const tipo = num <= 10 ? 'Simple' : num <= 18 ? 'Doble' : 'Suite';
  const tarifa = tipo === 'Simple' ? 150 : tipo === 'Doble' ? 250 : 420;
  return {
    id: num,
    numero: String(num),
    tipo,
    tarifa
  };
});

export default function ReservasPage() {
  const [rol, setRol] = useState('');
  const [correo, setCorreo] = useState('');
  const [vista, setVista] = useState('Consultar reservas');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const [reservas, setReservas] = useState([
    {
      id: 1,
      huesped: 'Lucía Mamani',
      correo: 'huesped@correo.com',
      habitacion: '1',
      entrada: '2026-11-25',
      salida: '2026-11-28',
      total: 450,
      estado: 'Confirmada'
    },
    {
      id: 2,
      huesped: 'Diego Quispe',
      correo: 'diego@correo.com',
      habitacion: '12',
      entrada: '2026-12-01',
      salida: '2026-12-04',
      total: 750,
      estado: 'Confirmada'
    }
  ]);

  const [resHuesped, setResHuesped] = useState('');
  const [resHab, setResHab] = useState('1');
  const [resEntrada, setResEntrada] = useState('2026-11-26');
  const [resSalida, setResSalida] = useState('2026-11-28');
  const [editId, setEditId] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    const savedEmail = localStorage.getItem('userEmail');
    if (!savedRole) {
      router.push('/login');
    } else {
      setRol(savedRole);
      setCorreo(savedEmail || '');
      if (savedRole === 'Huesped') {
        setVista('Consultar mis reservas');
      }
    }
  }, [router]);

  const botones =
    rol === 'Huesped'
      ? [
          'Registrar reserva',
          'Consultar mis reservas',
          'Modificar reserva',
          'Cancelar reserva',
          'Verificar disponibilidad'
        ]
      : [
          'Registrar reserva',
          'Consultar reservas',
          'Modificar reserva',
          'Cancelar reserva',
          'Verificar disponibilidad',
          'Control de duplicidad',
          'Registrar check-in',
          'Registrar check-out'
        ];

  const cambiarVista = (nuevaVista) => {
    setVista(nuevaVista);
    setMensaje('');
    setError('');
    setEditId(null);
  };

  const calcularTotal = (habNum, f1, f2) => {
    const hab = HABITACIONES_22.find((h) => h.numero === String(habNum));
    const tarifa = hab ? hab.tarifa : 150;
    const dias = Math.max(
      1,
      Math.round((new Date(f2) - new Date(f1)) / (1000 * 60 * 60 * 24))
    );
    return tarifa * dias;
  };

  const existeCruce = (habNum, f1, f2, excluirId = null) => {
    return reservas.some((r) => {
      if (excluirId !== null && r.id === excluirId) return false;
      if (r.estado === 'Cancelada') return false;
      if (String(r.habitacion) !== String(habNum)) return false;
      return f1 < r.salida && f2 > r.entrada;
    });
  };

  const handleRegistrar = (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    if (resSalida <= resEntrada) {
      setError('La fecha de salida debe ser posterior a la de entrada.');
      return;
    }
    if (existeCruce(resHab, resEntrada, resSalida)) {
      setError(`La Habitación ${resHab} ya está reservada en esas fechas.`);
      return;
    }

    setReservas([
      ...reservas,
      {
        id: Date.now(),
        huesped: resHuesped.trim(),
        correo: rol === 'Huesped' ? correo : 'recepcion@lagoazul.com',
        habitacion: String(resHab),
        entrada: resEntrada,
        salida: resSalida,
        total: calcularTotal(resHab, resEntrada, resSalida),
        estado: 'Confirmada'
      }
    ]);

    setResHuesped('');
    setMensaje(`Reserva registrada en la Habitación ${resHab}.`);
  };

  const prepararEdicion = (r) => {
    setEditId(r.id);
    setResHuesped(r.huesped);
    setResHab(String(r.habitacion));
    setResEntrada(r.entrada);
    setResSalida(r.salida);
  };

  const handleGuardarEdicion = (e) => {
    e.preventDefault();
    setError('');
    if (resSalida <= resEntrada) {
      setError('La fecha de salida debe ser posterior a la de entrada.');
      return;
    }
    if (existeCruce(resHab, resEntrada, resSalida, editId)) {
      setError(`Esas fechas se cruzan con otra reserva en la Habitación ${resHab}.`);
      return;
    }

    setReservas(
      reservas.map((r) =>
        r.id === editId
          ? {
              ...r,
              huesped: resHuesped.trim(),
              habitacion: String(resHab),
              entrada: resEntrada,
              salida: resSalida,
              total: calcularTotal(resHab, resEntrada, resSalida)
            }
          : r
      )
    );
    setEditId(null);
    setMensaje('Reserva actualizada correctamente.');
  };

  const handleCancelar = (id) => {
    setReservas(
      reservas.map((r) => (r.id === id ? { ...r, estado: 'Cancelada' } : r))
    );
    setMensaje('Reserva cancelada.');
  };

  const handleVerificar = (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');
    if (resSalida <= resEntrada) {
      setError('La fecha de salida debe ser posterior a la de entrada.');
      return;
    }
    if (existeCruce(resHab, resEntrada, resSalida)) {
      setError(
        `La Habitación ${resHab} no está disponible del ${resEntrada} al ${resSalida}.`
      );
    } else {
      setMensaje(
        `La Habitación ${resHab} está disponible. Total estimado: Bs ${calcularTotal(
          resHab,
          resEntrada,
          resSalida
        )}.`
      );
    }
  };

  const handleEstadia = (id, nuevoEstado) => {
    setReservas(
      reservas.map((r) => (r.id === id ? { ...r, estado: nuevoEstado } : r))
    );
    setMensaje(`Estado actualizado a ${nuevoEstado}.`);
  };

  if (!rol) return null;

  const reservasVisibles =
    rol === 'Huesped'
      ? reservas.filter((r) => r.correo === correo || r.id === 1)
      : reservas;

  return (
    <FondoHotel>
      <div
        style={{
          maxWidth: '1080px',
          margin: '0 auto',
          background: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(10px)',
          padding: '28px',
          borderRadius: '18px',
          boxShadow: '0 20px 40px rgba(2, 6, 23, 0.35)'
        }}
      >
        <div style={{ marginBottom: '12px' }}>
          <button
            type="button"
            onClick={() => router.push('/panel')}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#2563eb',
              fontWeight: '600',
              cursor: 'pointer',
              padding: 0,
              fontSize: '14px'
            }}
          >
            ← Volver al panel
          </button>
        </div>

        <h1 style={{ margin: '0 0 18px 0', fontSize: '26px', color: '#0f172a' }}>
          Gestión de Reservas y Estadías
        </h1>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '22px'
          }}
        >
          {botones.map((btn) => {
            const activa = vista === btn;
            return (
              <button
                key={btn}
                type="button"
                onClick={() => cambiarVista(btn)}
                style={{
                  padding: '10px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '700',
                  fontSize: '13.5px',
                  background: activa ? '#16a34a' : '#f1f5f9',
                  color: activa ? '#ffffff' : '#0f172a'
                }}
              >
                {btn}
              </button>
            );
          })}
        </div>

        {error && (
          <div
            style={{
              background: '#fee2e2',
              color: '#991b1b',
              padding: '12px 16px',
              borderRadius: '10px',
              marginBottom: '16px',
              fontWeight: '600'
            }}
          >
            {error}
          </div>
        )}

        {mensaje && (
          <div
            style={{
              background: '#dcfce7',
              color: '#166534',
              padding: '12px 16px',
              borderRadius: '10px',
              marginBottom: '16px',
              fontWeight: '600'
            }}
          >
            {mensaje}
          </div>
        )}

        {vista === 'Registrar reserva' && (
          <div
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: '14px',
              padding: '22px',
              background: '#ffffff'
            }}
          >
            <h2 style={{ margin: '0 0 16px 0', fontSize: '19px', color: '#0f172a' }}>
              Registrar nueva reserva
            </h2>
            <form
              onSubmit={handleRegistrar}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
                gap: '12px',
                marginBottom: '14px'
              }}
            >
              <input
                type="text"
                placeholder="Nombre del huésped"
                value={resHuesped}
                onChange={(e) => setResHuesped(e.target.value)}
                required
                style={{ padding: '11px 14px' }}
              />

              <select
                value={resHab}
                onChange={(e) => setResHab(e.target.value)}
                style={{ padding: '11px 14px' }}
              >
                {HABITACIONES_22.map((h) => (
                  <option key={h.id} value={h.numero}>
                    Hab. {h.numero} ({h.tipo} - Bs {h.tarifa})
                  </option>
                ))}
              </select>

              <input
                type="date"
                value={resEntrada}
                onChange={(e) => setResEntrada(e.target.value)}
                required
                style={{ padding: '11px 14px' }}
              />

              <input
                type="date"
                value={resSalida}
                onChange={(e) => setResSalida(e.target.value)}
                required
                style={{ padding: '11px 14px' }}
              />
            </form>
            <button
              type="button"
              onClick={handleRegistrar}
              style={{
                background: '#d97706',
                color: '#ffffff',
                border: 'none',
                padding: '11px 20px',
                borderRadius: '10px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Confirmar reserva
            </button>
          </div>
        )}

        {(vista === 'Consultar reservas' || vista === 'Consultar mis reservas') && (
          <table>
            <thead>
              <tr>
                <th style={{ padding: '13px 16px', textAlign: 'left' }}>Huésped</th>
                <th style={{ padding: '13px 16px', textAlign: 'left' }}>Habitación</th>
                <th style={{ padding: '13px 16px', textAlign: 'left' }}>Entrada</th>
                <th style={{ padding: '13px 16px', textAlign: 'left' }}>Salida</th>
                <th style={{ padding: '13px 16px', textAlign: 'left' }}>Total</th>
                <th style={{ padding: '13px 16px', textAlign: 'left' }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {reservasVisibles.map((r) => (
                <tr key={r.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '13px 16px', fontWeight: '600' }}>{r.huesped}</td>
                  <td style={{ padding: '13px 16px' }}>{r.habitacion}</td>
                  <td style={{ padding: '13px 16px' }}>{r.entrada}</td>
                  <td style={{ padding: '13px 16px' }}>{r.salida}</td>
                  <td style={{ padding: '13px 16px' }}>Bs {r.total}</td>
                  <td style={{ padding: '13px 16px' }}>{r.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {vista === 'Modificar reserva' &&
          (editId !== null ? (
            <form
              onSubmit={handleGuardarEdicion}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
                gap: '12px'
              }}
            >
              <input
                type="text"
                value={resHuesped}
                onChange={(e) => setResHuesped(e.target.value)}
                required
                style={{ padding: '11px 14px' }}
              />
              <select
                value={resHab}
                onChange={(e) => setResHab(e.target.value)}
                style={{ padding: '11px 14px' }}
              >
                {HABITACIONES_22.map((h) => (
                  <option key={h.id} value={h.numero}>
                    Hab. {h.numero} ({h.tipo} - Bs {h.tarifa})
                  </option>
                ))}
              </select>
              <input
                type="date"
                value={resEntrada}
                onChange={(e) => setResEntrada(e.target.value)}
                required
                style={{ padding: '11px 14px' }}
              />
              <input
                type="date"
                value={resSalida}
                onChange={(e) => setResSalida(e.target.value)}
                required
                style={{ padding: '11px 14px' }}
              />
              <button
                type="submit"
                style={{
                  background: '#0284c7',
                  color: 'white',
                  border: 'none',
                  padding: '11px 18px',
                  borderRadius: '10px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                Guardar cambios
              </button>
            </form>
          ) : (
            <table>
              <thead>
                <tr>
                  <th style={{ padding: '13px 16px', textAlign: 'left' }}>Huésped</th>
                  <th style={{ padding: '13px 16px', textAlign: 'left' }}>Habitación</th>
                  <th style={{ padding: '13px 16px', textAlign: 'left' }}>Fechas</th>
                  <th style={{ padding: '13px 16px', textAlign: 'left' }}>Acción</th>
                </tr>
              </thead>
              <tbody>
                {reservasVisibles.map((r) => (
                  <tr key={r.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '13px 16px' }}>{r.huesped}</td>
                    <td style={{ padding: '13px 16px' }}>{r.habitacion}</td>
                    <td style={{ padding: '13px 16px' }}>
                      {r.entrada} al {r.salida}
                    </td>
                    <td style={{ padding: '13px 16px' }}>
                      <button
                        type="button"
                        onClick={() => prepararEdicion(r)}
                        style={{
                          background: '#0284c7',
                          color: 'white',
                          border: 'none',
                          padding: '7px 14px',
                          borderRadius: '8px',
                          fontWeight: '700',
                          cursor: 'pointer'
                        }}
                      >
                        Modificar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}

        {vista === 'Cancelar reserva' && (
          <table>
            <thead>
              <tr>
                <th style={{ padding: '13px 16px', textAlign: 'left' }}>Huésped</th>
                <th style={{ padding: '13px 16px', textAlign: 'left' }}>Habitación</th>
                <th style={{ padding: '13px 16px', textAlign: 'left' }}>Estado</th>
                <th style={{ padding: '13px 16px', textAlign: 'left' }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {reservasVisibles.map((r) => (
                <tr key={r.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '13px 16px' }}>{r.huesped}</td>
                  <td style={{ padding: '13px 16px' }}>{r.habitacion}</td>
                  <td style={{ padding: '13px 16px' }}>{r.estado}</td>
                  <td style={{ padding: '13px 16px' }}>
                    {r.estado !== 'Cancelada' ? (
                      <button
                        type="button"
                        onClick={() => handleCancelar(r.id)}
                        style={{
                          background: '#dc2626',
                          color: 'white',
                          border: 'none',
                          padding: '7px 14px',
                          borderRadius: '8px',
                          fontWeight: '700',
                          cursor: 'pointer'
                        }}
                      >
                        Cancelar reserva
                      </button>
                    ) : (
                      <span style={{ color: '#64748b', fontSize: '13px' }}>Cancelada</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {vista === 'Verificar disponibilidad' && (
          <form
            onSubmit={handleVerificar}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              alignItems: 'flex-end'
            }}
          >
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '4px' }}>
                Habitación
              </label>
              <select
                value={resHab}
                onChange={(e) => setResHab(e.target.value)}
                style={{ padding: '10px 14px' }}
              >
                {HABITACIONES_22.map((h) => (
                  <option key={h.id} value={h.numero}>
                    Hab. {h.numero} ({h.tipo} - Bs {h.tarifa})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '4px' }}>
                Entrada
              </label>
              <input
                type="date"
                value={resEntrada}
                onChange={(e) => setResEntrada(e.target.value)}
                style={{ padding: '10px 14px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '4px' }}>
                Salida
              </label>
              <input
                type="date"
                value={resSalida}
                onChange={(e) => setResSalida(e.target.value)}
                style={{ padding: '10px 14px' }}
              />
            </div>
            <button
              type="submit"
              style={{
                background: '#0284c7',
                color: 'white',
                border: 'none',
                padding: '11px 18px',
                borderRadius: '10px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Verificar
            </button>
          </form>
        )}

        {vista === 'Control de duplicidad' && (
          <p style={{ margin: 0, color: '#334155' }}>
            El sistema valida que no existan dos reservas activas o confirmadas para la misma habitación (del 1 al 22) en fechas superpuestas.
          </p>
        )}

        {vista === 'Registrar check-in' && (
          <table>
            <thead>
              <tr>
                <th style={{ padding: '13px 16px', textAlign: 'left' }}>Huésped</th>
                <th style={{ padding: '13px 16px', textAlign: 'left' }}>Habitación</th>
                <th style={{ padding: '13px 16px', textAlign: 'left' }}>Estado</th>
                <th style={{ padding: '13px 16px', textAlign: 'left' }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((r) => (
                <tr key={r.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '13px 16px' }}>{r.huesped}</td>
                  <td style={{ padding: '13px 16px' }}>{r.habitacion}</td>
                  <td style={{ padding: '13px 16px' }}>{r.estado}</td>
                  <td style={{ padding: '13px 16px' }}>
                    <button
                      type="button"
                      onClick={() => handleEstadia(r.id, 'Check-in realizado')}
                      style={{
                        background: '#0f766e',
                        color: 'white',
                        border: 'none',
                        padding: '7px 14px',
                        borderRadius: '8px',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      Marcar check-in
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {vista === 'Registrar check-out' && (
          <table>
            <thead>
              <tr>
                <th style={{ padding: '13px 16px', textAlign: 'left' }}>Huésped</th>
                <th style={{ padding: '13px 16px', textAlign: 'left' }}>Habitación</th>
                <th style={{ padding: '13px 16px', textAlign: 'left' }}>Estado</th>
                <th style={{ padding: '13px 16px', textAlign: 'left' }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((r) => (
                <tr key={r.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '13px 16px' }}>{r.huesped}</td>
                  <td style={{ padding: '13px 16px' }}>{r.habitacion}</td>
                  <td style={{ padding: '13px 16px' }}>{r.estado}</td>
                  <td style={{ padding: '13px 16px' }}>
                    <button
                      type="button"
                      onClick={() => handleEstadia(r.id, 'Check-out realizado')}
                      style={{
                        background: '#4338ca',
                        color: 'white',
                        border: 'none',
                        padding: '7px 14px',
                        borderRadius: '8px',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      Marcar check-out
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </FondoHotel>
  );
}