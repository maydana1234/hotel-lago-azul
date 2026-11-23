'use client';
import { useState } from 'react';

export default function AdminUsuariosPage() {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: 'Carlos Pérez', email: 'carlos@hotel.com', rol: 'Administrador' },
    { id: 2, nombre: 'Ana Gómez', email: 'ana@hotel.com', rol: 'Administrador' }
  ]);

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('Recepcionista');
  const [editandoId, setEditandoId] = useState(null);

  const guardarUsuario = (e) => {
    e.preventDefault();
    if (editandoId !== null) {
      setUsuarios(usuarios.map(u => u.id === editandoId ? { ...u, nombre, email, rol } : u));
      setEditandoId(null);
    } else {
      const nuevo = { id: Date.now(), nombre, email, rol };
      setUsuarios([...usuarios, nuevo]);
    }
    setNombre('');
    setEmail('');
    setRol('Recepcionista');
  };

  const iniciarEdicion = (usu) => {
    setEditandoId(usu.id);
    setNombre(usu.nombre);
    setEmail(usu.email);
    setRol(usu.rol);
  };

  const cerrarSesion = () => {
    localStorage.removeItem('userRole');
    window.location.href = '/login';
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <a href="/admin" style={{ display: 'inline-block', marginBottom: '10px', color: '#0070f3', textDecoration: 'none', fontSize: '14px' }}>← Volver al Panel Principal</a>
          <h1 style={{ margin: 0 }}>Administración de Usuarios</h1>
        </div>
        <button onClick={cerrarSesion} style={{ background: '#ff4d4f', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' }}>
          Cerrar Sesión
        </button>
      </div>

      <form onSubmit={guardarUsuario} style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #ddd' }}>
        <h3>{editandoId !== null ? 'Modificar Usuario' : 'Registrar Nuevo Usuario'}</h3>
        
        <div style={{ marginBottom: '10px' }}>
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Correo:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Rol y Permisos:</label>
          <select value={rol} onChange={e => setRol(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
            <option value="Administrador">Administrador</option>
            <option value="Recepcionista">Recepcionista</option>
          </select>
        </div>

        <button type="submit" style={{ background: '#52c41a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          {editandoId !== null ? 'Actualizar Usuario' : 'Registrar Usuario'}
        </button>
        {editandoId !== null && (
          <button type="button" onClick={() => { setEditandoId(null); setNombre(''); setEmail(''); }} style={{ marginLeft: '10px', background: '#ccc', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }}>
            Cancelar
          </button>
        )}
      </form>

      <h3>Consulta e Información de Usuarios</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ background: '#0070f3', color: 'white', textAlign: 'left' }}>
            <th style={{ padding: '10px' }}>Nombre</th>
            <th style={{ padding: '10px' }}>Correo</th>
            <th style={{ padding: '10px' }}>Rol</th>
            <th style={{ padding: '10px' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{u.nombre}</td>
              <td style={{ padding: '10px' }}>{u.email}</td>
              <td style={{ padding: '10px' }}>{u.rol}</td>
              <td style={{ padding: '10px' }}>
                <button onClick={() => iniciarEdicion(u)} style={{ background: '#faad14', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>
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