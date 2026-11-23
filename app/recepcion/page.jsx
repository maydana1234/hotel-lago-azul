'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RecepcionDashboard() {
  const router = useRouter();
  const [moduloActivo, setModuloActivo] = useState('habitaciones');

  const habitacionesDemo = [
    { id: 101, tipo: 'Simple', precio: 150, estado: 'Disponible', huesped: '-' },
    { id: 102, tipo: 'Matrimonial', precio: 250, estado: 'Ocupada', huesped: 'Juan Pérez' },
    { id: 201, tipo: 'Suite', precio: 450, estado: 'Mantenimiento', huesped: '-' },
    { id: 202, tipo: 'Doble', precio: 300, estado: 'Disponible', huesped: '-' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f1f5f9', display: 'flex', fontFamily: 'sans-serif' }}>
      
      {/* Barra Lateral / Navegación */}
      <aside style={{ width: '260px', backgroundColor: '#0f172a', color: '#ffffff', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ marginBottom: '2rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 'bold', letterSpacing: '1px' }}>HOTEL LAGO AZUL</span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '0.25rem 0 0 0' }}>Panel Recepción</h2>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button 
              onClick={() => setModuloActivo('habitaciones')}
              style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', border: 'none', backgroundColor: moduloActivo === 'habitaciones' ? '#0284c7' : 'transparent', color: '#ffffff', textAlign: 'left', cursor: 'pointer', fontWeight: '500' }}
            >
              🏨 Habitaciones (R10)
            </button>
            <button 
              onClick={() => router.push('/recepcion/huespedes')}
              style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', border: 'none', backgroundColor: 'transparent', color: '#ffffff', textAlign: 'left', cursor: 'pointer', fontWeight: '500' }}
            >
              👤 Registro Huéspedes
            </button>
            <button 
              onClick={() => setModuloActivo('estadias')}
              style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', border: 'none', backgroundColor: moduloActivo === 'estadias' ? '#0284c7' : 'transparent', color: '#ffffff', textAlign: 'left', cursor: 'pointer', fontWeight: '500' }}
            >
              🔑 Check-In / Check-Out
            </button>
          </nav>
        </div>

        <button 
          onClick={() => router.push('/login')}
          style={{ padding: '0.75rem', backgroundColor: '#ef4444', color: '#ffffff', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Cerrar Sesión
        </button>
      </aside>

      {/* Contenido Principal */}
      <main style={{ flex: 1, padding: '2rem' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', backgroundColor: '#ffffff', padding: '1.25rem 2rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>Gestión de Habitaciones y Reservas</h1>
            <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0.25rem 0 0 0' }}>Estado en tiempo real del Hotel Lago Azul</p>
          </div>
          <button style={{ backgroundColor: '#0284c7', color: '#ffffff', border: 'none', padding: '0.75rem 1.25rem', borderRadius: '0.5rem', fontWeight: '600', cursor: 'pointer' }}>
            + Nueva Reserva
          </button>
        </header>

        {/* Tabla Real de Datos */}
        <section style={{ backgroundColor: '#ffffff', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '1rem' }}>Estado de Habitaciones</h3>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b', fontSize: '0.875rem' }}>
                <th style={{ padding: '0.75rem' }}>N° Habitación</th>
                <th style={{ padding: '0.75rem' }}>Tipo</th>
                <th style={{ padding: '0.75rem' }}>Precio / Noche</th>
                <th style={{ padding: '0.75rem' }}>Estado</th>
                <th style={{ padding: '0.75rem' }}>Huésped Actual</th>
                <th style={{ padding: '0.75rem' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {habitacionesDemo.map((hab) => (
                <tr key={hab.id} style={{ borderBottom: '1px solid #f1f5f9', color: '#334155', fontSize: '0.875rem' }}>
                  <td style={{ padding: '1rem 0.75rem', fontWeight: 'bold' }}>Habitación {hab.id}</td>
                  <td style={{ padding: '1rem 0.75rem' }}>{hab.tipo}</td>
                  <td style={{ padding: '1rem 0.75rem' }}>Bs. {hab.precio}</td>
                  <td style={{ padding: '1rem 0.75rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '9999px', 
                      fontSize: '0.75rem', 
                      fontWeight: 'bold',
                      backgroundColor: hab.estado === 'Disponible' ? '#dcfce7' : hab.estado === 'Ocupada' ? '#fee2e2' : '#fef3c7',
                      color: hab.estado === 'Disponible' ? '#166534' : hab.estado === 'Ocupada' ? '#991b1b' : '#92400e'
                    }}>
                      {hab.estado}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 0.75rem' }}>{hab.huesped}</td>
                  <td style={{ padding: '1rem 0.75rem' }}>
                    <button style={{ backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.4rem 0.75rem', borderRadius: '0.375rem', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '600' }}>
                      Gestionar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}