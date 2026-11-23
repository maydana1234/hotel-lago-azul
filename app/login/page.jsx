'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulación de validación de inicio de sesión (R1)
    if (email === 'admin@hotel.com' && password === '1234') {
      localStorage.setItem('userRole', 'Administrador');
      router.push('/admin'); // Redirige al panel de administración
    } else if (email === 'recepcion@hotel.com' && password === '1234') {
      localStorage.setItem('userRole', 'Recepcionista');
      router.push('/recepcion'); // Redirige al panel de recepción
    } else {
      alert('Credenciales incorrectas. Usa admin@hotel.com o recepcion@hotel.com (contraseña: 1234)');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f4f9' }}>
      <form onSubmit={handleLogin} style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', width: '350px' }}>
        <h2 style={{ marginBottom: '20px', textAlign: 'center', color: '#333' }}>Hotel Lago Azul - Login</h2>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Correo Electrónico:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            placeholder="admin@hotel.com"
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Contraseña:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            placeholder="******"
          />
        </div>

        <button type="submit" style={{ width: '100%', padding: '10px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}