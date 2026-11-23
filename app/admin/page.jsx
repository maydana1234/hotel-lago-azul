'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [userRole, setUserRole] = useState('');
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem('userRole') || 'Administrador';
    setUserRole(role);
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('userRole');
    router.push('/login');
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      
      {/* Cabecera con bienvenida y botón de salir */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid #ddd', paddingBottom: '20px' }}>
        <div>
          <h1 style={{ margin: '0 0 5px 0', color: '#333' }}>Hotel Lago Azul - Panel Principal</h1>
          <p style={{ margin: '0', color: '#666' }}>Bienvenido al sistema. Rol activo: <strong>{userRole}</strong></p>
        </div>
        <button onClick={cerrarSesion} style={{ background: '#ff4d4f', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Cerrar Sesión
        </button>
      </div>

      <h2>Módulos del Sistema</h2>
      <p style={{ color: '#555', marginBottom: '20px' }}>Selecciona el módulo al que deseas ingresar:</p>

      {/* Tarjetas de acceso a los módulos */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        
        {/* Módulo 1 */}
        <div style={{ background: '#f9f9f9', border: '1px solid #ddd', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
          <span style={{ fontSize: '12px', color: '#0070f3', fontWeight: 'bold' }}>MÓDULO 1</span>
          <h3 style={{ margin: '10px 0' }}>Administración de Usuarios</h3>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>Gestiona los usuarios, credenciales, datos y asignación de roles.</p>
          <a href="/admin/usuarios" style={{ display: 'inline-block', background: '#0070f3', color: 'white', padding: '10px 15px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
            Ingresar al Módulo 1 →
          </a>
        </div>

        {/* Módulo 2 */}
        <div style={{ background: '#f9f9f9', border: '1px solid #ddd', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
          <span style={{ fontSize: '12px', color: '#52c41a', fontWeight: 'bold' }}>MÓDULO 2</span>
          <h3 style={{ margin: '10px 0' }}>Gestión de Habitaciones</h3>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>Control de inventario, tarifas, consulta de disponibilidad y estados.</p>
          <a href="/admin/habitaciones" style={{ display: 'inline-block', background: '#52c41a', color: 'white', padding: '10px 15px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
            Ingresar al Módulo 2 →
          </a>
        </div>

      </div>
    </div>
  );
}