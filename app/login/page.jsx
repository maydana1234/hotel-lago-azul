'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FondoHotel from '../components/FondoHotel';

export default function LoginPage() {
  const [modo, setModo] = useState('login'); // 'login' | 'registro' | 'recuperar' | 'otro'

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [codigoAcceso, setCodigoAcceso] = useState('');

  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensajeModal, setMensajeModal] = useState('');

  const router = useRouter();

  const entrarAlSistema = (rolDestino, correoDestino) => {
    localStorage.setItem('userRole', rolDestino);
    localStorage.setItem('userEmail', correoDestino);
    router.push('/panel');
  };

  const abrirModal = (texto) => {
    setMensajeModal(texto);
    setMostrarModal(true);
  };

  const detectarRolPorCredenciales = (correoIngresado, claveIngresada) => {
    const correoLimpio = correoIngresado.trim().toLowerCase();

    if (correoLimpio === 'admin@lagoazul.com' && claveIngresada === '123456') {
      return 'Administrador';
    }
    if (correoLimpio === 'recepcion@lagoazul.com' && claveIngresada === '123456') {
      return 'Recepcionista';
    }
    if (
      correoLimpio !== 'admin@lagoazul.com' &&
      correoLimpio !== 'recepcion@lagoazul.com'
    ) {
      return 'Huesped';
    }
    return null;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const rolDetectado = detectarRolPorCredenciales(email, password);

    if (!rolDetectado) {
      abrirModal('Usuario o contraseña incorrectos para el acceso asignado.');
      return;
    }

    entrarAlSistema(rolDetectado, email.trim());
  };

  const handleGoogle = () => {
    entrarAlSistema('Huesped', 'huesped.google@lagoazul.com');
  };

  const handleFacebook = () => {
    entrarAlSistema('Huesped', 'huesped.facebook@lagoazul.com');
  };

  const handleOtroMetodo = (e) => {
    e.preventDefault();
    const identificador = codigoAcceso.trim() || 'huesped.alterno@lagoazul.com';
    entrarAlSistema('Huesped', identificador);
  };

  const handleRegistro = (e) => {
    e.preventDefault();
    if (password !== confirmarPassword) {
      abrirModal('Las contraseñas no coinciden.');
      return;
    }
    if (!aceptaTerminos) {
      abrirModal('Debes aceptar los términos y condiciones.');
      return;
    }
    entrarAlSistema('Huesped', email.trim());
  };

  const handleRecuperar = (e) => {
    e.preventDefault();
    abrirModal(`Se envió un enlace de recuperación a ${email}.`);
  };

  return (
    <FondoHotel imagenUrl="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=80">
      <div style={{ minHeight: '92vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            background: 'rgba(255, 255, 255, 0.97)',
            borderRadius: '18px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.45)',
            width: '100%',
            maxWidth: '920px'
          }}
        >
          {/* Columna izquierda: Identidad visual del Hotel */}
          <div
            style={{
              backgroundImage:
                'linear-gradient(160deg, rgba(15, 23, 42, 0.78), rgba(2, 132, 199, 0.65)), url("https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: 'white',
              padding: '42px 36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <span
                style={{
                  display: 'inline-block',
                  padding: '5px 12px',
                  borderRadius: '999px',
                  background: 'rgba(255,255,255,0.16)',
                  fontSize: '12px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  marginBottom: '16px'
                }}
              >
                Sistema de Gestión Hotelera
              </span>
              <h1 style={{ margin: '0 0 12px 0', fontSize: '32px', lineHeight: 1.2 }}>
                Hotel Lago Azul
              </h1>
              <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6, color: '#e2e8f0' }}>
                Plataforma integral para reservas, atención a huéspedes, control de habitaciones y administración.
              </p>
            </div>

            <div style={{ marginTop: '30px', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '16px', fontSize: '13px', color: '#cbd5e1' }}>
              <div>• Atención y reservas en línea 24/7</div>
              <div style={{ marginTop: '6px' }}>• Control de disponibilidad en tiempo real</div>
            </div>
          </div>

          {/* Columna derecha: Formulario de acceso */}
          <div style={{ padding: '36px 34px' }}>
            <h2 style={{ margin: '0 0 4px 0', color: '#0f172a', fontSize: '22px' }}>Bienvenido</h2>
            <p style={{ margin: '0 0 20px 0', color: '#64748b', fontSize: '14px' }}>
              Ingresa tus credenciales o crea tu cuenta de huésped
            </p>

            {/* Pestañas limpias */}
            <div style={{ display: 'flex', gap: '6px', background: '#f1f5f9', padding: '4px', borderRadius: '10px', marginBottom: '22px' }}>
              <button
                type="button"
                onClick={() => setModo('login')}
                style={{
                  flex: 1,
                  padding: '8px 10px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  background: modo === 'login' ? '#ffffff' : 'transparent',
                  color: modo === 'login' ? '#0f172a' : '#64748b',
                  boxShadow: modo === 'login' ? '0 1px 4px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                Iniciar sesión
              </button>
              <button
                type="button"
                onClick={() => setModo('registro')}
                style={{
                  flex: 1,
                  padding: '8px 10px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  background: modo === 'registro' ? '#ffffff' : 'transparent',
                  color: modo === 'registro' ? '#0f172a' : '#64748b',
                  boxShadow: modo === 'registro' ? '0 1px 4px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                Crear cuenta
              </button>
              <button
                type="button"
                onClick={() => setModo('recuperar')}
                style={{
                  flex: 1,
                  padding: '8px 10px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  background: modo === 'recuperar' ? '#ffffff' : 'transparent',
                  color: modo === 'recuperar' ? '#0f172a' : '#64748b',
                  boxShadow: modo === 'recuperar' ? '0 1px 4px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                Recuperar
              </button>
            </div>

            {modo === 'login' && (
              <div>
                <form onSubmit={handleLogin}>
                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '5px', color: '#334155' }}>
                      Usuario o correo electrónico
                    </label>
                    <input
                      type="text"
                      placeholder="ejemplo@lagoazul.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{ width: '100%', padding: '10px 12px' }}
                    />
                  </div>
                  <div style={{ marginBottom: '18px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '5px', color: '#334155' }}>
                      Contraseña
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{ width: '100%', padding: '10px 12px' }}
                    />
                  </div>
                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'linear-gradient(135deg, #0f172a, #1e3a8a)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      fontSize: '14px',
                      boxShadow: '0 4px 12px rgba(30, 58, 138, 0.25)'
                    }}
                  >
                    Ingresar al sistema
                  </button>
                </form>

                <div style={{ display: 'flex', alignItems: 'center', margin: '18px 0', color: '#94a3b8', fontSize: '12px' }}>
                  <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
                  <span style={{ padding: '0 10px' }}>o continúa como huésped</span>
                  <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={handleGoogle}
                    style={{ width: '100%', padding: '10px 16px', background: '#ffffff', color: '#1e293b', border: '1px solid #cbd5e1', borderRadius: '999px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '14px' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.88c2.26-2.09 3.54-5.17 3.54-8.82z" />
                      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.27v3.09C3.24 21.31 7.31 24 12 24z" />
                      <path fill="#FBBC05" d="M5.28 14.29c-.24-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.27C.46 8.23 0 10.06 0 12s.46 3.77 1.27 5.38l4.01-3.09z" />
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.24 2.69 1.27 6.62l4.01 3.09c.95-2.85 3.6-4.96 6.72-4.96z" />
                    </svg>
                    Continuar con Google
                  </button>

                  <button
                    type="button"
                    onClick={handleFacebook}
                    style={{ width: '100%', padding: '10px 16px', background: '#1877f2', color: '#ffffff', border: 'none', borderRadius: '999px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '14px' }}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', borderRadius: '50%', background: '#ffffff', color: '#1877f2', fontWeight: '900', fontSize: '14px', lineHeight: 1 }}>
                      f
                    </span>
                    Continuar con Facebook
                  </button>

                  <button
                    type="button"
                    onClick={() => setModo('otro')}
                    style={{ width: '100%', padding: '10px 16px', background: '#f8fafc', color: '#334155', border: '1px solid #cbd5e1', borderRadius: '999px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}
                  >
                    Otro método
                  </button>
                </div>
              </div>
            )}

            {modo === 'otro' && (
              <form onSubmit={handleOtroMetodo}>
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '5px', color: '#334155' }}>
                    Código o usuario de huésped
                  </label>
                  <input
                    type="text"
                    placeholder="Ingresa tu código o correo"
                    value={codigoAcceso}
                    onChange={(e) => setCodigoAcceso(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button type="submit" style={{ flex: 1, padding: '11px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                    Entrar con este método
                  </button>
                  <button type="button" onClick={() => setModo('login')} style={{ padding: '11px 14px', background: '#e2e8f0', color: '#0f172a', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                    Volver
                  </button>
                </div>
              </form>
            )}

            {modo === 'registro' && (
              <form onSubmit={handleRegistro}>
                <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#15803d', fontWeight: '600' }}>
                  Registro de cuenta para huésped
                </p>
                <div style={{ marginBottom: '10px' }}>
                  <input type="text" placeholder="Nombre completo" value={nombre} onChange={(e) => setNombre(e.target.value)} required style={{ width: '100%', padding: '10px 12px' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px 12px' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '10px 12px' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <input type="password" placeholder="Confirmar contraseña" value={confirmarPassword} onChange={(e) => setConfirmarPassword(e.target.value)} required style={{ width: '100%', padding: '10px 12px' }} />
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', marginBottom: '14px', color: '#334155' }}>
                  <input type="checkbox" checked={aceptaTerminos} onChange={(e) => setAceptaTerminos(e.target.checked)} />
                  Acepto términos y condiciones
                </label>
                <button type="submit" style={{ width: '100%', padding: '11px', background: '#16a34a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                  Registrar cuenta
                </button>
              </form>
            )}

            {modo === 'recuperar' && (
              <form onSubmit={handleRecuperar}>
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '5px', color: '#334155' }}>
                    Correo registrado
                  </label>
                  <input type="email" placeholder="tu@correo.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px 12px' }} />
                </div>
                <button type="submit" style={{ width: '100%', padding: '11px', background: '#d97706', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                  Enviar solicitud
                </button>
              </form>
            )}
          </div>
        </div>

{mostrarModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 50 }}>
            <div style={{ background: 'white', padding: '26px', borderRadius: '12px', maxWidth: '380px', width: '100%', textAlign: 'center', boxShadow: '0 20px 25px rgba(0,0,0,0.25)' }}>
              <p style={{ marginTop: 0, color: '#0f172a', fontWeight: '600', fontSize: '15px' }}>{mensajeModal}</p>
              <button
                type="button"
                onClick={() => setMostrarModal(false)}
                style={{ background: '#0f172a', color: 'white', border: 'none', padding: '9px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Cerrar ventana emergente
              </button>
            </div>
          </div>
        )}
      </div>
    </FondoHotel>
  );
}