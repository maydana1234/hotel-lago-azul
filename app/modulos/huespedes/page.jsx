'use client';
import { useState } from 'react';
import FondoHotel from '../../components/FondoHotel';

export default function HuespedesPage() {
  const [huespedes, setHuespedes] = useState([
    { id: 1, nombre: 'Lucía Mamani', ci: '8492014', telefono: '71234567', correo: 'lucia@correo.com', estadias: 3 },
    { id: 2, nombre: 'Diego Quispe', ci: '6543219', telefono: '76543210', correo: 'diego@correo.com', estadias: 1 }
  ]);

  // registrar | modificar | consultar | buscar | estadias
  const [vista, setVista] = useState('consultar');
  const [nombre, setNombre] = useState('');
  const [ci, setCi] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [mensaje, setMensaje] = useState('');

  const cambiarVista = (nuevaVista) => {
    setVista(nuevaVista);
    setMensaje('');
    setEditandoId(null);
    setNombre('');
    setCi('');
    setTelefono('');
    setCorreo('');
  };

  const registrarHuesped = (e) => {
    e.preventDefault();
    setHuespedes([...huespedes, { id: Date.now(), nombre, ci, telefono, correo, estadias: 1 }]);
    setNombre('');
    setCi('');
    setTelefono('');
    setCorreo('');
    setMensaje('Huésped registrado correctamente.');
  };

  const seleccionarHuesped = (h) => {
    setEditandoId(h.id);
    setNombre(h.nombre);
    setCi(h.ci);
    setTelefono(h.telefono);
    setCorreo(h.correo);
  };

  const guardarModificacion = (e) => {
    e.preventDefault();
    setHuespedes(huespedes.map(h => h.id === editandoId ? { ...h, nombre, ci, telefono, correo } : h));
    setEditandoId(null);
    setMensaje('Datos del huésped actualizados.');
  };

  const filtrados = huespedes.filter(h =>
    h.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    h.ci.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <FondoHotel imagenUrl="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1600&q=80">
      <div style={{ maxWidth: '950px', margin: '0 auto', background: 'rgba(255,255,255,0.96)', padding: '28px', borderRadius: '10px', boxShadow: '0 8px 24px rgba(0,0,0,0.22)' }}>
        <a href="/panel" style={{ color: '#0070f3', textDecoration: 'none', fontSize: '14px' }}>← Volver al panel</a>
        <h1 style={{ margin: '6px 0 18px 0', color: '#0f172a' }}>Gestión de Huéspedes</h1>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
          <button type="button" onClick={() => cambiarVista('registrar')} style={{ padding: '9px 13px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', background: vista === 'registrar' ? '#16a34a' : '#e2e8f0', color: vista === 'registrar' ? 'white' : '#0f172a' }}>
            Registrar huésped
          </button>
          <button type="button" onClick={() => cambiarVista('modificar')} style={{ padding: '9px 13px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', background: vista === 'modificar' ? '#d97706' : '#e2e8f0', color: vista === 'modificar' ? 'white' : '#0f172a' }}>
            Modificar información
          </button>
          <button type="button" onClick={() => cambiarVista('consultar')} style={{ padding: '9px 13px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', background: vista === 'consultar' ? '#0070f3' : '#e2e8f0', color: vista === 'consultar' ? 'white' : '#0f172a' }}>
            Consultar huéspedes
          </button>
          <button type="button" onClick={() => cambiarVista('buscar')} style={{ padding: '9px 13px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', background: vista === 'buscar' ? '#0ea5e9' : '#e2e8f0', color: vista === 'buscar' ? 'white' : '#0f172a' }}>
            Buscar por documento
          </button>
          <button type="button" onClick={() => cambiarVista('estadias')} style={{ padding: '9px 13px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', background: vista === 'estadias' ? '#7c3aed' : '#e2e8f0', color: vista === 'estadias' ? 'white' : '#0f172a' }}>
            Historial de estadías
          </button>
        </div>

        {mensaje && (
          <div style={{ background: '#dcfce7', color: '#166534', padding: '12px', borderRadius: '6px', marginBottom: '18px', fontWeight: 'bold' }}>
            {mensaje}
          </div>
        )}

        {vista === 'registrar' && (
          <form onSubmit={registrarHuesped} style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
            <h3 style={{ marginTop: 0 }}>Registrar datos personales</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
              <input type="text" placeholder="Nombre completo" value={nombre} onChange={e => setNombre(e.target.value)} required style={{ padding: '8px' }} />
              <input type="text" placeholder="CI / Documento" value={ci} onChange={e => setCi(e.target.value)} required style={{ padding: '8px' }} />
              <input type="text" placeholder="Teléfono" value={telefono} onChange={e => setTelefono(e.target.value)} required style={{ padding: '8px' }} />
              <input type="email" placeholder="Correo" value={correo} onChange={e => setCorreo(e.target.value)} required style={{ padding: '8px' }} />
            </div>
            <button type="submit" style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
              Guardar huésped
            </button>
          </form>
        )}

        {vista === 'modificar' && (
          <div>
            {editandoId !== null ? (
              <form onSubmit={guardarModificacion} style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                <h3 style={{ marginTop: 0 }}>Modificar información del huésped</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                  <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} required style={{ padding: '8px' }} />
                  <input type="text" value={ci} onChange={e => setCi(e.target.value)} required style={{ padding: '8px' }} />
                  <input type="text" value={telefono} onChange={e => setTelefono(e.target.value)} required style={{ padding: '8px' }} />
                  <input type="email" value={correo} onChange={e => setCorreo(e.target.value)} required style={{ padding: '8px' }} />
                </div>
                <button type="submit" style={{ background: '#d97706', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Guardar cambios
                </button>
              </form>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
                <thead>
                  <tr style={{ background: '#0f172a', color: 'white', textAlign: 'left' }}>
                    <th style={{ padding: '10px' }}>Nombre</th>
                    <th style={{ padding: '10px' }}>CI</th>
                    <th style={{ padding: '10px' }}>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {huespedes.map(h => (
                    <tr key={h.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '10px' }}>{h.nombre}</td>
                      <td style={{ padding: '10px' }}>{h.ci}</td>
                      <td style={{ padding: '10px' }}>
                        <button type="button" onClick={() => seleccionarHuesped(h)} style={{ background: '#d97706', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                          Modificar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {vista === 'consultar' && (
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
            <thead>
              <tr style={{ background: '#0f172a', color: 'white', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Nombre</th>
                <th style={{ padding: '10px' }}>CI</th>
                <th style={{ padding: '10px' }}>Teléfono</th>
                <th style={{ padding: '10px' }}>Correo</th>
              </tr>
            </thead>
            <tbody>
              {huespedes.map(h => (
                <tr key={h.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px', fontWeight: 'bold' }}>{h.nombre}</td>
                  <td style={{ padding: '10px' }}>{h.ci}</td>
                  <td style={{ padding: '10px' }}>{h.telefono}</td>
                  <td style={{ padding: '10px' }}>{h.correo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {vista === 'buscar' && (
          <div>
            <input type="text" placeholder="Escribe CI o nombre..." value={busqueda} onChange={e => setBusqueda(e.target.value)} style={{ width: '100%', maxWidth: '340px', padding: '8px', marginBottom: '14px' }} />
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
              <thead>
                <tr style={{ background: '#0f172a', color: 'white', textAlign: 'left' }}>
                  <th style={{ padding: '10px' }}>CI</th>
                  <th style={{ padding: '10px' }}>Nombre</th>
                  <th style={{ padding: '10px' }}>Teléfono</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map(h => (
                  <tr key={h.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '10px', fontWeight: 'bold' }}>{h.ci}</td>
                    <td style={{ padding: '10px' }}>{h.nombre}</td>
                    <td style={{ padding: '10px' }}>{h.telefono}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {vista === 'estadias' && (
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
            <thead>
              <tr style={{ background: '#0f172a', color: 'white', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Huésped</th>
                <th style={{ padding: '10px' }}>CI</th>
                <th style={{ padding: '10px' }}>Estadías registradas</th>
              </tr>
            </thead>
            <tbody>
              {huespedes.map(h => (
                <tr key={h.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px', fontWeight: 'bold' }}>{h.nombre}</td>
                  <td style={{ padding: '10px' }}>{h.ci}</td>
                  <td style={{ padding: '10px' }}>{h.estadias} estadías</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </FondoHotel>
  );
}