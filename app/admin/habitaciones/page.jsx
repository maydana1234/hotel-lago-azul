'use client';
import { useState } from 'react';

export default function GestionHabitacionesPage() {
  // Lista inicial de habitaciones (R9: Consultar)
  const [habitaciones, setHabitaciones] = useState([
    { id: 1, numero: '101', tipo: 'Simple', tarifa: 50, estado: 'Disponible' },
    { id: 2, numero: '102', tipo: 'Doble', tarifa: 80, estado: 'Ocupada' },
    { id: 3, numero: '201', tipo: 'Suite', tarifa: 150, estado: 'Mantenimiento' }
  ]);

  const [numero, setNumero] = useState('');
  const [tipo, setTipo] = useState('Simple');
  const [tarifa, setTarifa] = useState('');
  const [estado, setEstado] = useState('Disponible');
  const [editandoId, setEditandoId] = useState(null);

  // Estados para consulta de disponibilidad por fechas (R10)
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);

  // Función para Registrar (R7) o Modificar (R8)
  const guardarHabitacion = (e) => {
    e.preventDefault();
    if (editandoId !== null) {
      // Modificar información y tarifas (R8) y estado (R11)
      setHabitaciones(habitaciones.map(h => h.id === editandoId ? { ...h, numero, tipo, tarifa: Number(tarifa), estado } : h));
      setEditandoId(null);
    } else {
      // Registrar nueva habitación (R7)
      const nueva = { id: Date.now(), numero, tipo, tarifa: Number(tarifa), estado };
      setHabitaciones([...habitaciones, nueva]);
    }
    setNumero('');
    setTipo('Simple');
    setTarifa('');
    setEstado('Disponible');
  };

  // Cargar datos para modificar (R8)
  const iniciarEdicion = (hab) => {
    setEditandoId(hab.id);
    setNumero(hab.numero);
    setTipo(hab.tipo);
    setTarifa(hab.tarifa);
    setEstado(hab.estado);
  };

  // Consultar disponibilidad por fechas (R10)
  const consultarDisponibilidad = (e) => {
    e.preventDefault();
    if (!fechaInicio || !fechaFin) {
      alert('Por favor selecciona ambas fechas.');
      return;
    }
    setBusquedaRealizada(true);
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      
      {/* Cabecera y Enlace secuencial con el Módulo 1 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
        <div>
          <span style={{ fontSize: '12px', color: '#888', fontWeight: 'bold', textTransform: 'uppercase' }}>Módulo 2</span>
          <h1 style={{ margin: '0', color: '#333' }}>Gestión de Habitaciones</h1>
        </div>
        <a href="/admin/usuarios" style={{ background: '#0070f3', color: 'white', padding: '8px 15px', borderRadius: '4px', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
          ← Volver a Administración de Usuarios (Módulo 1)
        </a>
      </div>

      {/* Sección R10: Consultar disponibilidad según fechas */}
      <div style={{ background: '#e6f7ff', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #91d5ff' }}>
        <h3 style={{ marginTop: '0', color: '#0050b3' }}>Consultar Disponibilidad por Fechas (R10)</h3>
        <form onSubmit={consultarDisponibilidad} style={{ display: 'flex', gap: '15px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px', fontWeight: 'bold' }}>Fecha de Entrada:</label>
            <input type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px', fontWeight: 'bold' }}>Fecha de Salida:</label>
            <input type="date" value={fechaFin} onChange={e => setFechaFin(e.target.value)} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <button type="submit" style={{ background: '#1890ff', color: 'white', border: 'none', padding: '9px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Ver Disponibles
          </button>
        </form>

        {busquedaRealizada && (
          <div style={{ marginTop: '15px' }}>
            <p style={{ fontWeight: 'bold', color: '#0050b3' }}>Habitaciones disponibles del {fechaInicio} al {fechaFin}:</p>
            <ul style={{ margin: '5px 0 0 20px' }}>
              {habitaciones.filter(h => h.estado === 'Disponible').map(h => (
                <li key={h.id}>Habitación {h.numero} ({h.tipo}) - ${h.tarifa} por noche</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Formulario para Registrar (R7) o Modificar (R8) */}
      <form onSubmit={guardarHabitacion} style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #ddd' }}>
        <h3 style={{ marginTop: '0' }}>{editandoId !== null ? 'Modificar Información y Tarifas (R8)' : 'Registrar Nueva Habitación (R7)'}</h3>
        
        <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '180px' }}>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px' }}>N° de Habitación:</label>
            <input type="text" value={numero} onChange={e => setNumero(e.target.value)} required placeholder="Ej. 103" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ flex: 1, minWidth: '180px' }}>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px' }}>Tipo:</label>
            <select value={tipo} onChange={e => setTipo(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
              <option value="Simple">Simple</option>
              <option value="Doble">Doble</option>
              <option value="Suite">Suite</option>
            </select>
          </div>
          <div style={{ flex: 1, minWidth: '180px' }}>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px' }}>Tarifa ($ por noche):</label>
            <input type="number" value={tarifa} onChange={e => setTarifa(e.target.value)} required placeholder="50" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ flex: 1, minWidth: '180px' }}>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px' }}>Estado (R11):</label>
            <select value={estado} onChange={e => setEstado(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
              <option value="Disponible">Disponible</option>
              <option value="Ocupada">Ocupada</option>
              <option value="Mantenimiento">Mantenimiento</option>
            </select>
          </div>
        </div>

        <button type="submit" style={{ background: '#52c41a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          {editandoId !== null ? 'Actualizar Habitación' : 'Registrar Habitación'}
        </button>
        {editandoId !== null && (
          <button type="button" onClick={() => { setEditandoId(null); setNumero(''); setTarifa(''); }} style={{ marginLeft: '10px', background: '#ccc', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }}>
            Cancelar
          </button>
        )}
      </form>

      {/* Tabla de Consulta de Habitaciones (R9) */}
      <h3 style={{ color: '#333' }}>Consulta de Habitaciones Registradas (R9)</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ background: '#0070f3', color: 'white', textAlign: 'left' }}>
            <th style={{ padding: '10px' }}>Número</th>
            <th style={{ padding: '10px' }}>Tipo</th>
            <th style={{ padding: '10px' }}>Tarifa</th>
            <th style={{ padding: '10px' }}>Estado (R11)</th>
            <th style={{ padding: '10px' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {habitaciones.map(h => (
            <tr key={h.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{h.numero}</td>
              <td style={{ padding: '10px' }}>{h.tipo}</td>
              <td style={{ padding: '10px' }}>${h.tarifa}</td>
              <td style={{ padding: '10px' }}>
                <span style={{ 
                  padding: '4px 8px', borderRadius: '4px', color: 'white', fontSize: '12px', fontWeight: 'bold',
                  backgroundColor: h.estado === 'Disponible' ? '#52c41a' : h.estado === 'Ocupada' ? '#ff4d4f' : '#faad14'
                }}>
                  {h.estado}
                </span>
              </td>
              <td style={{ padding: '10px' }}>
                <button onClick={() => iniciarEdicion(h)} style={{ background: '#faad14', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Modificar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}