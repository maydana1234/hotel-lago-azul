'use client';
import { useState } from 'react';

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: 'Carlos Pérez', email: 'carlos@lagoazul.com', rol: 'Administrador' },
    { id: 2, nombre: 'Ana Gómez', email: 'ana@lagoazul.com', rol: 'Recepcionista' }
  ]);

  const [vista, setVista] = useState('consultar'); // registrar | modificar | consultar | roles
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('Recepcionista');
  const [editandoId, setEditandoId] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const registrarUsuario = (e) => {
    e.preventDefault();
    setUsuarios([...usuarios, { id: Date.now(), nombre, email, rol }]);
    setNombre('');
    setEmail('');
    setRol('Recepcionista');
    setMensaje('Usuario registrado correctamente.');
  };

  const seleccionarParaModificar = (u) => {
    setEditandoId(u.id);
    setNombre(u.nombre);
    setEmail(u.email);
    setRol(u.rol);
  };

  const guardarModificacion = (e) => {
    e.preventDefault();
    setUsuarios(usuarios.map(u => u.id === editandoId ? { ...u, nombre, email, rol } : u));
    setEditandoId(null);
    setNombre('');
    setEmail('');
    setMensaje('Datos del usuario modificados.');
  };

  const cambiarRol = (id, nuevoRol) => {
    setUsuarios(usuarios.map(u => u.id === id ? { ...u, rol: nuevoRol } : u));
    setMensaje(`Rol actualizado a ${nuevoRol}.`);
  };

  const cambiarVista = (nuevaVista) => {
    setVista(nuevaVista);
    setMensaje('');
    setEditandoId(null);
    setNombre('');
    setEmail('');
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '920px', margin: '0 auto' }}>
      <a href="/panel" style={{ color: '#0070f3', textDecoration: 'none', fontSize: '14px' }}>← Volver al panel</a>
      <h1 style={{ margin: '6px 0 20px 0' }}>Administración de Usuarios</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
        <button type="button" onClick={() => cambiarVista('registrar')} style={{ padding: '10px 14px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold', background: vista === 'registrar' ? '#0070f3' : '#e2e8f0', color: vista === 'registrar' ? 'white' : '#0f172a' }}>
          Registrar usuario
        </button>
        <button type="button" onClick={() => cambiarVista('modificar')} style={{ padding: '10px 14px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold', background: vista === 'modificar' ? '#d97706' : '#e2e8f0', color: vista === 'modificar' ? 'white' : '#0f172a' }}>
          Modificar datos
        </button>
        <button type="button" onClick={() => cambiarVista('consultar')} style={{ padding: '10px 14px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold', background: vista === 'consultar' ? '#16a34a' : '#e2e8f0', color: vista === 'consultar' ? 'white' : '#0f172a' }}>
          Consultar usuarios
        </button>
        <button type="button" onClick={() => cambiarVista('roles')} style={{ padding: '10px 14px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold', background: vista === 'roles' ? '#7c3aed' : '#e2e8f0', color: vista === 'roles' ? 'white' : '#0f172a' }}>
          Asignar roles
        </button>
      </div>

      {mensaje && (
        <div style={{ background: '#dcfce7', color: '#166534', padding: '12px', borderRadius: '6px', marginBottom: '20px', fontWeight: 'bold' }}>
          {mensaje}
        </div>
      )}

      {vista === 'registrar' && (
        <form onSubmit={registrarUsuario} style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
          <h3 style={{ marginTop: 0 }}>Registrar usuario</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '15px' }}>
            <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required style={{ padding: '8px' }} />
            <input type="email" placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} required style={{ padding: '8px' }} />
            <select value={rol} onChange={e => setRol(e.target.value)} style={{ padding: '8px' }}>
              <option value="Administrador">Administrador</option>
              <option value="Recepcionista">Recepcionista</option>
            </select>
          </div>
          <button type="submit" style={{ background: '#0070f3', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            Guardar usuario
          </button>
        </form>
      )}

      {vista === 'modificar' && (
        <div>
          {editandoId !== null ? (
            <form onSubmit={guardarModificacion} style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
              <h3 style={{ marginTop: 0 }}>Modificar datos de usuario</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '15px' }}>
                <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} required style={{ padding: '8px' }} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ padding: '8px' }} />
                <select value={rol} onChange={e => setRol(e.target.value)} style={{ padding: '8px' }}>
                  <option value="Administrador">Administrador</option>
                  <option value="Recepcionista">Recepcionista</option>
                </select>
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
                  <th style={{ padding: '10px' }}>Correo</th>
                  <th style={{ padding: '10px' }}>Editar</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map(u => (
                  <tr key={u.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '10px' }}>{u.nombre}</td>
                    <td style={{ padding: '10px' }}>{u.email}</td>
                    <td style={{ padding: '10px' }}>
                      <button type="button" onClick={() => seleccionarParaModificar(u)} style={{ background: '#d97706', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                        Editar
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
              <th style={{ padding: '10px' }}>Correo</th>
              <th style={{ padding: '10px' }}>Rol</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(u => (
              <tr key={u.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '10px' }}>{u.nombre}</td>
                <td style={{ padding: '10px' }}>{u.email}</td>
                <td style={{ padding: '10px' }}>{u.rol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {vista === 'roles' && (
        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
          <thead>
            <tr style={{ background: '#0f172a', color: 'white', textAlign: 'left' }}>
              <th style={{ padding: '10px' }}>Usuario</th>
              <th style={{ padding: '10px' }}>Rol asignado</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(u => (
              <tr key={u.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '10px' }}>{u.nombre} ({u.email})</td>
                <td style={{ padding: '10px' }}>
                  <select value={u.rol} onChange={e => cambiarRol(u.id, e.target.value)} style={{ padding: '6px' }}>
                    <option value="Administrador">Administrador</option>
                    <option value="Recepcionista">Recepcionista</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}