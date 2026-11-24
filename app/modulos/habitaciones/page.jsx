'use client';
import { useState } from 'react';
import FondoHotel from '../../components/FondoHotel';

export default function HabitacionesPage() {
  const [habitaciones, setHabitaciones] = useState([
    { id: 1, numero: '101', tipo: 'Simple', tarifa: 150, estado: 'Disponible', disponibleHasta: '2026-12-20', caracteristicas: '1 cama plaza y media, TV cable, baño privado' },
    { id: 2, numero: '202', tipo: 'Doble', tarifa: 250, estado: 'Ocupada', disponibleHasta: '2026-11-28', caracteristicas: '2 camas, vista al lago, Wi-Fi, calefacción' },
    { id: 3, numero: '305', tipo: 'Suite', tarifa: 420, estado: 'Disponible', disponibleHasta: '2026-12-31', caracteristicas: 'Cama king, sala de estar, jacuzzi, balcón' }
  ]);

  // registrar | tarifas | consultar | disponibilidad | estado | caracteristicas | baja
  const [vista, setVista] = useState('consultar');
  const [numero, setNumero] = useState('');
  const [tipo, setTipo] = useState('Simple');
  const [tarifa, setTarifa] = useState('');
  const [caracteristicas, setCaracteristicas] = useState('');
  const [fecha, setFecha] = useState('2026-11-25');
  const [mensaje, setMensaje] = useState('');

  const cambiarVista = (nuevaVista) => {
    setVista(nuevaVista);
    setMensaje('');
  };

  const registrarHabitacion = (e) => {
    e.preventDefault();
    setHabitaciones([...habitaciones, {
      id: Date.now(),
      numero,
      tipo,
      tarifa: Number(tarifa),
      estado: 'Disponible',
      disponibleHasta: '2026-12-31',
      caracteristicas: caracteristicas || 'Habitación equipada con baño privado'
    }]);
    setNumero('');
    setTarifa('');
    setCaracteristicas('');
    setMensaje('Habitación registrada.');
  };

  const actualizarTarifa = (id, nuevaTarifa) => {
    setHabitaciones(habitaciones.map(h => h.id === id ? { ...h, tarifa: Number(nuevaTarifa) } : h));
    setMensaje('Tarifa actualizada.');
  };

  const cambiarEstado = (id, nuevoEstado) => {
    setHabitaciones(habitaciones.map(h => h.id === id ? { ...h, estado: nuevoEstado } : h));
    setMensaje(`Estado actualizado a ${nuevoEstado}.`);
  };

  const darDeBaja = (id) => {
    setHabitaciones(habitaciones.filter(h => h.id !== id));
    setMensaje('Habitación dada de baja.');
  };

  const disponiblesFecha = habitaciones.filter(h => h.estado === 'Disponible' && h.disponibleHasta >= fecha);

  return (
    <FondoHotel imagenUrl="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=80">
      <div style={{ maxWidth: '980px', margin: '0 auto', background: 'rgba(255,255,255,0.96)', padding: '28px', borderRadius: '10px', boxShadow: '0 8px 24px rgba(0,0,0,0.22)' }}>
        <a href="/panel" style={{ color: '#0070f3', textDecoration: 'none', fontSize: '14px' }}>← Volver al panel</a>
        <h1 style={{ margin: '6px 0 18px 0', color: '#0f172a' }}>Gestión de Habitaciones</h1>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
          <button type="button" onClick={() => cambiarVista('registrar')} style={{ padding: '9px 13px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', background: vista === 'registrar' ? '#0070f3' : '#e2e8f0', color: vista === 'registrar' ? 'white' : '#0f172a' }}>
            Registrar habitación
          </button>
          <button type="button" onClick={() => cambiarVista('tarifas')} style={{ padding: '9px 13px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', background: vista === 'tarifas' ? '#d97706' : '#e2e8f0', color: vista === 'tarifas' ? 'white' : '#0f172a' }}>
            Modificar tarifas
          </button>
          <button type="button" onClick={() => cambiarVista('consultar')} style={{ padding: '9px 13px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', background: vista === 'consultar' ? '#16a34a' : '#e2e8f0', color: vista === 'consultar' ? 'white' : '#0f172a' }}>
            Consultar habitaciones
          </button>
          <button type="button" onClick={() => cambiarVista('disponibilidad')} style={{ padding: '9px 13px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', background: vista === 'disponibilidad' ? '#0ea5e9' : '#e2e8f0', color: vista === 'disponibilidad' ? 'white' : '#0f172a' }}>
            Disponibilidad por fechas
          </button>
          <button type="button" onClick={() => cambiarVista('estado')} style={{ padding: '9px 13px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', background: vista === 'estado' ? '#7c3aed' : '#e2e8f0', color: vista === 'estado' ? 'white' : '#0f172a' }}>
            Actualizar estado
          </button>
          <button type="button" onClick={() => cambiarVista('caracteristicas')} style={{ padding: '9px 13px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', background: vista === 'caracteristicas' ? '#0f766e' : '#e2e8f0', color: vista === 'caracteristicas' ? 'white' : '#0f172a' }}>
            Ver características
          </button>
          <button type="button" onClick={() => cambiarVista('baja')} style={{ padding: '9px 13px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', background: vista === 'baja' ? '#dc2626' : '#e2e8f0', color: vista === 'baja' ? 'white' : '#0f172a' }}>
            Dar de baja habitación
          </button>
        </div>

        {mensaje && (
          <div style={{ background: '#dcfce7', color: '#166534', padding: '12px', borderRadius: '6px', marginBottom: '18px', fontWeight: 'bold' }}>
            {mensaje}
          </div>
        )}

        {vista === 'registrar' && (
          <form onSubmit={registrarHabitacion} style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
            <h3 style={{ marginTop: 0 }}>Registrar nueva habitación</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <input type="text" placeholder="Número (ej. 401)" value={numero} onChange={e => setNumero(e.target.value)} required style={{ padding: '8px' }} />
              <select value={tipo} onChange={e => setTipo(e.target.value)} style={{ padding: '8px' }}>
                <option value="Simple">Simple</option>
                <option value="Doble">Doble</option>
                <option value="Suite">Suite</option>
              </select>
              <input type="number" placeholder="Tarifa por noche (Bs)" value={tarifa} onChange={e => setTarifa(e.target.value)} required style={{ padding: '8px' }} />
            </div>
            <div style={{ marginBottom: '14px' }}>
              <input type="text" placeholder="Características (camas, vista, servicios)" value={caracteristicas} onChange={e => setCaracteristicas(e.target.value)} style={{ width: '100%', padding: '8px' }} />
            </div>
            <button type="submit" style={{ background: '#0070f3', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
              Guardar habitación
            </button>
          </form>
        )}

        {vista === 'tarifas' && (
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
            <thead>
              <tr style={{ background: '#0f172a', color: 'white', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Habitación</th>
                <th style={{ padding: '10px' }}>Tipo</th>
                <th style={{ padding: '10px' }}>Tarifa (Bs)</th>
              </tr>
            </thead>
            <tbody>
              {habitaciones.map(h => (
                <tr key={h.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px', fontWeight: 'bold' }}>{h.numero}</td>
                  <td style={{ padding: '10px' }}>{h.tipo}</td>
                  <td style={{ padding: '10px' }}>
                    <input type="number" value={h.tarifa} onChange={e => actualizarTarifa(h.id, e.target.value)} style={{ width: '100px', padding: '6px' }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {vista === 'consultar' && (
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
            <thead>
              <tr style={{ background: '#0f172a', color: 'white', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Habitación</th>
                <th style={{ padding: '10px' }}>Tipo</th>
                <th style={{ padding: '10px' }}>Tarifa (Bs)</th>
                <th style={{ padding: '10px' }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {habitaciones.map(h => (
                <tr key={h.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px', fontWeight: 'bold' }}>{h.numero}</td>
                  <td style={{ padding: '10px' }}>{h.tipo}</td>
                  <td style={{ padding: '10px' }}>Bs {h.tarifa}</td>
                  <td style={{ padding: '10px' }}>{h.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {vista === 'disponibilidad' && (
          <div>
            <div style={{ marginBottom: '14px', display: 'flex', gap: '10px', alignItems: 'center' }}>
              <label style={{ fontWeight: 'bold' }}>Fecha:</label>
              <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} style={{ padding: '8px' }} />
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
              <thead>
                <tr style={{ background: '#0f172a', color: 'white', textAlign: 'left' }}>
                  <th style={{ padding: '10px' }}>Habitación</th>
                  <th style={{ padding: '10px' }}>Tipo</th>
                  <th style={{ padding: '10px' }}>Tarifa (Bs)</th>
                  <th style={{ padding: '10px' }}>Disponible hasta</th>
                </tr>
              </thead>
              <tbody>
                {disponiblesFecha.map(h => (
                  <tr key={h.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '10px', fontWeight: 'bold' }}>{h.numero}</td>
                    <td style={{ padding: '10px' }}>{h.tipo}</td>
                    <td style={{ padding: '10px' }}>Bs {h.tarifa}</td>
                    <td style={{ padding: '10px' }}>{h.disponibleHasta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {vista === 'estado' && (
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
            <thead>
              <tr style={{ background: '#0f172a', color: 'white', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Habitación</th>
                <th style={{ padding: '10px' }}>Tipo</th>
                <th style={{ padding: '10px' }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {habitaciones.map(h => (
                <tr key={h.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px', fontWeight: 'bold' }}>{h.numero}</td>
                  <td style={{ padding: '10px' }}>{h.tipo}</td>
                  <td style={{ padding: '10px' }}>
                    <select value={h.estado} onChange={e => cambiarEstado(h.id, e.target.value)} style={{ padding: '6px' }}>
                      <option value="Disponible">Disponible</option>
                      <option value="Ocupada">Ocupada</option>
                      <option value="Mantenimiento">Mantenimiento</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {vista === 'caracteristicas' && (
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
            <thead>
              <tr style={{ background: '#0f172a', color: 'white', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Habitación</th>
                <th style={{ padding: '10px' }}>Tipo</th>
                <th style={{ padding: '10px' }}>Características</th>
              </tr>
            </thead>
            <tbody>
              {habitaciones.map(h => (
                <tr key={h.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px', fontWeight: 'bold' }}>{h.numero}</td>
                  <td style={{ padding: '10px' }}>{h.tipo}</td>
                  <td style={{ padding: '10px' }}>{h.caracteristicas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {vista === 'baja' && (
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
            <thead>
              <tr style={{ background: '#0f172a', color: 'white', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Habitación</th>
                <th style={{ padding: '10px' }}>Tipo</th>
                <th style={{ padding: '10px' }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {habitaciones.map(h => (
                <tr key={h.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px', fontWeight: 'bold' }}>{h.numero}</td>
                  <td style={{ padding: '10px' }}>{h.tipo}</td>
                  <td style={{ padding: '10px' }}>
                    <button type="button" onClick={() => darDeBaja(h.id)} style={{ background: '#dc2626', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                      Dar de baja
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