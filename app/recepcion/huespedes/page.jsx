'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegistroHuespedesPage() {
  const router = useRouter();

  // Lista inicial de prueba
  const [listaHuespedes, setListaHuespedes] = useState([
    { id: 1, nombre: 'Juan Pérez', documento: '8123456 LP', telefono: '70123456', nacionalidad: 'Boliviana' },
    { id: 2, nombre: 'María Gómez', documento: '5987654 SC', telefono: '79876543', nacionalidad: 'Argentina' }
  ]);

  // Estados individuales para cada input del formulario
  const [nombre, setNombre] = useState('');
  const [documento, setDocumento] = useState('');
  const [telefono, setTelefono] = useState('');
  const [nacionalidad, setNacionalidad] = useState('');

  // Función que se ejecuta al presionar el botón de submit
  const handleAgregar = (e) => {
    e.preventDefault(); // Evita que la página se recargue por defecto

    if (!nombre.trim() || !documento.trim()) {
      alert('Por favor complete los campos obligatorios (Nombre y Documento).');
      return;
    }

    const nuevoHuesped = {
      id: Date.now(), // ID único basado en milisegundos
      nombre: nombre,
      documento: documento,
      telefono: telefono || 'Sin registro',
      nacionalidad: nacionalidad || 'Boliviana'
    };

    // Actualizamos el estado agregando el nuevo huésped al inicio de la lista
    setListaHuespedes([nuevoHuesped, ...listaHuespedes]);

    // Limpiamos los campos del formulario de manera limpia
    setNombre('');
    setDocumento('');
    setTelefono('');
    setNacionalidad('');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f1f5f9', display: 'flex', fontFamily: 'sans-serif' }}>
      
      {/* Barra lateral */}
      <aside style={{ width: '260px', backgroundColor: '#0f172a', color: '#ffffff', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ marginBottom: '2rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 'bold', letterSpacing: '1px' }}>HOTEL LAGO AZUL</span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '0.25rem 0 0 0' }}>Panel Recepción</h2>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button 
              onClick={() => router.push('/recepcion')}
              style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', border: 'none', backgroundColor: 'transparent', color: '#ffffff', textAlign: 'left', cursor: 'pointer', fontWeight: '500' }}
            >
              🏨 Habitaciones
            </button>
            <button 
              style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', border: 'none', backgroundColor: '#0284c7', color: '#ffffff', textAlign: 'left', cursor: 'pointer', fontWeight: '500' }}
            >
              👤 Registro Huéspedes
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
        <header style={{ marginBottom: '2rem', backgroundColor: '#ffffff', padding: '1.25rem 2rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>Módulo de Registro de Huéspedes</h1>
          <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0.25rem 0 0 0' }}>Administración e ingreso de clientes al sistema</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
          
          {/* Formulario de Registro */}
          <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', height: 'fit-content' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '1rem' }}>Formulario de Registro</h3>
            
            <form onSubmit={handleAgregar} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#334155', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Nombre Completo *
                </label>
                <input 
                  type="text" 
                  style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '0.375rem', fontSize: '0.875rem', boxSizing: 'border-box' }}
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej. Ana Torres"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#334155', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Documento de Identidad / C.I. *
                </label>
                <input 
                  type="text" 
                  style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '0.375rem', fontSize: '0.875rem', boxSizing: 'border-box' }}
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
                  placeholder="Ej. 1234567 LP"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#334155', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Teléfono / Celular
                </label>
                <input 
                  type="text" 
                  style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '0.375rem', fontSize: '0.875rem', boxSizing: 'border-box' }}
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="Ej. 71234567"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#334155', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Nacionalidad
                </label>
                <input 
                  type="text" 
                  style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '0.375rem', fontSize: '0.875rem', boxSizing: 'border-box' }}
                  value={nacionalidad}
                  onChange={(e) => setNacionalidad(e.target.value)}
                  placeholder="Ej. Boliviana"
                />
              </div>

              <button 
                type="submit"
                style={{ backgroundColor: '#0284c7', color: '#ffffff', padding: '0.75rem', border: 'none', borderRadius: '0.375rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '0.5rem' }}
              >
                Guardar Registro
              </button>
            </form>
          </div>

          {/* Lista de Registrados */}
          <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '1rem' }}>Lista de Personas Registradas</h3>
            
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b', fontSize: '0.875rem' }}>
                  <th style={{ padding: '0.75rem' }}>Nombre</th>
                  <th style={{ padding: '0.75rem' }}>C.I. / Documento</th>
                  <th style={{ padding: '0.75rem' }}>Teléfono</th>
                  <th style={{ padding: '0.75rem' }}>Nacionalidad</th>
                </tr>
              </thead>
              <tbody>
                {listaHuespedes.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9', color: '#334155', fontSize: '0.875rem' }}>
                    <td style={{ padding: '0.875rem 0.75rem', fontWeight: 'bold' }}>{item.nombre}</td>
                    <td style={{ padding: '0.875rem 0.75rem' }}>{item.documento}</td>
                    <td style={{ padding: '0.875rem 0.75rem' }}>{item.telefono}</td>
                    <td style={{ padding: '0.875rem 0.75rem' }}>{item.nacionalidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  );
}