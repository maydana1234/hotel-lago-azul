'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FondoHotel from '../components/FondoHotel';
import { HABITACIONES_HOTEL } from '../data/habitaciones';

export default function PanelPrincipal() {
  const [rol, setRol] = useState('');
  const [correo, setCorreo] = useState('');
  const router = useRouter();

  const totalHabitaciones = HABITACIONES_HOTEL.length; // 1 al 22
  const habitacionesOcupadas = HABITACIONES_HOTEL.filter(
    (h) => h.estado === 'Ocupada'
  ).length;
  const ocupacionPorcentaje = Math.round(
    (habitacionesOcupadas / totalHabitaciones) * 100
  );

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    const savedEmail = localStorage.getItem('userEmail');
    if (!savedRole) {
      router.push('/login');
    } else {
      setRol(savedRole);
      setCorreo(savedEmail || '');
    }
  }, [router]);

  const cerrarSesion = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    router.push('/login');
  };

  const areas = [
    {
      id: 2,
      nombre: 'Gestión de Habitaciones',
      descripcion:
        'Control de cuartos (1 al 22), tarifas, disponibilidad, características y estados.',
      ruta: '/modulos/habitaciones',
      color: '#0284c7',
      badge: 'Inventario 1–22',
      imagen:
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
      rolesPermitidos: ['Administrador', 'Recepcionista']
    },
    {
      id: 3,
      nombre: 'Gestión de Huéspedes',
      descripcion:
        'Registro, consulta, búsqueda por documento y actualización de clientes.',
      ruta: '/modulos/huespedes',
      color: '#16a34a',
      badge: 'Clientes',
      imagen:
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
      rolesPermitidos: ['Recepcionista']
    },
    {
      id: 4,
      nombre: 'Gestión de Reservas y Estadías',
      descripcion:
        rol === 'Huesped'
          ? 'Registra, consulta, modifica o cancela tus reservas y verifica disponibilidad.'
          : 'Reservas, disponibilidad, check-in, check-out y prevención de duplicidad.',
      ruta: '/modulos/reservas',
      color: '#d97706',
      badge: 'Estadías',
      imagen:
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      rolesPermitidos: ['Recepcionista', 'Huesped']
    },
    {
      id: 5,
      nombre: 'Reportes y Control Administrativo',
      descripcion:
        'Ocupación hotelera, historial de reservas, ingresos y cancelaciones.',
      ruta: '/modulos/reportes',
      color: '#7c3aed',
      badge: 'Gerencia',
      imagen:
        'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
      rolesPermitidos: ['Administrador']
    }
  ];

  const areasVisibles = areas.filter((a) => a.rolesPermitidos.includes(rol));

  if (!rol) return null;

  const nombreRol = rol === 'Huesped' ? 'Huésped' : rol;

  return (
    <FondoHotel>
      <div style={{ maxWidth: '1120px', margin: '0 auto', paddingBottom: '24px' }}>
        {/* Barra superior ejecutiva */}
        <div
          style={{
            background:
              'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.92))',
            backdropFilter: 'blur(12px)',
            color: 'white',
            padding: '22px 28px',
            borderRadius: '16px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '22px',
            boxShadow: '0 16px 32px rgba(2, 6, 23, 0.38)',
            border: '1px solid rgba(255, 255, 255, 0.14)'
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '11px',
                letterSpacing: '1.2px',
                textTransform: 'uppercase',
                color: '#38bdf8',
                fontWeight: '700'
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#38bdf8',
                  display: 'inline-block'
                }}
              />
              Panel de Control
            </div>
            <h1 style={{ margin: '4px 0 6px 0', fontSize: '26px', fontWeight: '700' }}>
              Hotel Lago Azul
            </h1>
            <div style={{ fontSize: '13.5px', color: '#cbd5e1' }}>
              Sesión iniciada como{' '}
              <span
                style={{
                  background: 'rgba(251, 191, 36, 0.16)',
                  color: '#fbbf24',
                  padding: '2px 9px',
                  borderRadius: '999px',
                  fontWeight: '700',
                  border: '1px solid rgba(251, 191, 36, 0.35)'
                }}
              >
                {nombreRol}
              </span>{' '}
              <span style={{ color: '#94a3b8' }}>({correo})</span>
            </div>
          </div>

          <button
            type="button"
            onClick={cerrarSesion}
            style={{
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              color: 'white',
              border: 'none',
              padding: '11px 20px',
              borderRadius: '10px',
              fontWeight: '700',
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: '0 6px 16px rgba(239, 68, 68, 0.35)'
            }}
          >
            Cerrar sesión
          </button>
        </div>

        {/* Indicadores rápidos (KPI) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            marginBottom: '24px'
          }}
        >
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(8px)',
              padding: '18px 22px',
              borderRadius: '14px',
              boxShadow: '0 8px 20px rgba(2, 6, 23, 0.18)',
              borderLeft: '4px solid #0f172a'
            }}
          >
            <div
              style={{
                fontSize: '12px',
                color: '#64748b',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              Habitaciones
            </div>
            <div
              style={{
                fontSize: '26px',
                fontWeight: '800',
                color: '#0f172a',
                marginTop: '6px'
              }}
            >
              {totalHabitaciones} Totales
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
              Numeradas del 1 al {totalHabitaciones}
            </div>
          </div>

          <div
            style={{
              background: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(8px)',
              padding: '18px 22px',
              borderRadius: '14px',
              boxShadow: '0 8px 20px rgba(2, 6, 23, 0.18)',
              borderLeft: '4px solid #0284c7'
            }}
          >
            <div
              style={{
                fontSize: '12px',
                color: '#64748b',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              Ocupación Actual
            </div>
            <div
              style={{
                fontSize: '26px',
                fontWeight: '800',
                color: '#0284c7',
                marginTop: '6px'
              }}
            >
              {ocupacionPorcentaje}%
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
              {habitacionesOcupadas} de {totalHabitaciones} habitaciones ocupadas
            </div>
          </div>

          <div
            style={{
              background: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(8px)',
              padding: '18px 22px',
              borderRadius: '14px',
              boxShadow: '0 8px 20px rgba(2, 6, 23, 0.18)',
              borderLeft: '4px solid #16a34a'
            }}
          >
            <div
              style={{
                fontSize: '12px',
                color: '#64748b',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              Estado del Sistema
            </div>
            <div
              style={{
                fontSize: '19px',
                fontWeight: '800',
                color: '#16a34a',
                marginTop: '8px'
              }}
            >
              ● Operativo
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
              Servicios activos en línea
            </div>
          </div>
        </div>

        {/* Tarjetas de áreas habilitadas */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '22px'
          }}
        >
          {areasVisibles.map((area) => (
            <div
              key={area.id}
              className="tarjeta-modulo"
              style={{
                background: 'rgba(255, 255, 255, 0.97)',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 12px 26px rgba(2, 6, 23, 0.25)',
                borderTop: `5px solid ${area.color}`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ position: 'relative' }}>
                  <img
                    src={area.imagen}
                    alt={area.nombre}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                    style={{
                      width: '100%',
                      height: '165px',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'rgba(15, 23, 42, 0.82)',
                      color: '#f8fafc',
                      fontSize: '11px',
                      fontWeight: '700',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      backdropFilter: 'blur(4px)'
                    }}
                  >
                    {area.badge}
                  </span>
                </div>

                <div style={{ padding: '20px 22px 10px 22px' }}>
                  <h3
                    style={{
                      margin: '0 0 8px 0',
                      color: '#0f172a',
                      fontSize: '19px',
                      fontWeight: '700'
                    }}
                  >
                    {area.nombre}
                  </h3>
                  <p
                    style={{
                      fontSize: '14px',
                      color: '#475569',
                      lineHeight: 1.55,
                      margin: 0
                    }}
                  >
                    {area.descripcion}
                  </p>
                </div>
              </div>

              <div style={{ padding: '14px 22px 22px 22px' }}>
                <a
                  href={area.ruta}
                  className="btn-accion"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: area.color,
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    fontWeight: '700',
                    fontSize: '14px',
                    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)'
                  }}
                >
                  Ingresar →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FondoHotel>
  );
}