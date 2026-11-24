'use client';
import { useState } from 'react';
import FondoHotel from '../../components/FondoHotel';

export default function ReportesPage() {
  // ocupacion | historial | ingresos | cancelaciones | exportar
  const [vista, setVista] = useState('ocupacion');
  const [mensajeExportar, setMensajeExportar] = useState('');

  const ocupacion = [
    { tipo: 'Habitaciones Simples', total: 10, ocupadas: 7, porcentaje: '70%' },
    { tipo: 'Habitaciones Dobles', total: 8, ocupadas: 6, porcentaje: '75%' },
    { tipo: 'Suites', total: 4, ocupadas: 3, porcentaje: '75%' }
  ];

  const historial = [
    { codigo: 'RES-001', huesped: 'Lucía Mamani', habitacion: '101', fechas: '2026-11-25 al 2026-11-28', estado: 'Confirmada', monto: 450 },
    { codigo: 'RES-002', huesped: 'Diego Quispe', habitacion: '305', fechas: '2026-12-01 al 2026-12-04', estado: 'Confirmada', monto: 1260 },
    { codigo: 'RES-003', huesped: 'María Condori', habitacion: '202', fechas: '2026-11-10 al 2026-11-12', estado: 'Completada', monto: 500 }
  ];

  const cancelaciones = [
    { codigo: 'RES-004', huesped: 'José Flores', habitacion: '104', motivo: 'Cambio de viaje' },
    { codigo: 'RES-005', huesped: 'Carla Mamani', habitacion: '201', motivo: 'Reprogramación de fecha' }
  ];

  const ingresos = [
    { concepto: 'Estadías confirmadas', monto: 1710 },
    { concepto: 'Estadías completadas', monto: 500 },
    { concepto: 'Servicios adicionales', monto: 180 }
  ];

  const totalIngresos = ingresos.reduce((acc, item) => acc + item.monto, 0);

  const generarResumen = () => {
    setMensajeExportar(`Resumen listo: 3 categorías de ocupación, ${historial.length} reservas y Bs ${totalIngresos} en ingresos registrados.`);
  };

  return (
    <FondoHotel imagenUrl="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1600&q=80">
      <div style={{ maxWidth: '980px', margin: '0 auto', background: 'rgba(255,255,255,0.96)', padding: '28px', borderRadius: '10px', boxShadow: '0 8px 24px rgba(0,0,0,0.22)' }}>
        <a href="/panel" style={{ color: '#0070f3', textDecoration: 'none', fontSize: '14px' }}>← Volver al panel</a>
        <h1 style={{ margin: '6px 0 18px 0', color: '#0f172a' }}>Reportes y Control Administrativo</h1>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
          <button type="button" onClick={() => setVista('ocupacion')} style={{ padding: '9px 13px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', background: vista === 'ocupacion' ? '#7c3aed' : '#e2e8f0', color: vista === 'ocupacion' ? 'white' : '#0f172a' }}>
            Generar reportes de ocupación
          </button>
          <button type="button" onClick={() => setVista('historial')} style={{ padding: '9px 13px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', background: vista === 'historial' ? '#0070f3' : '#e2e8f0', color: vista === 'historial' ? 'white' : '#0f172a' }}>
            Consultar historial de reservas
          </button>
          <button type="button" onClick={() => setVista('ingresos')} style={{ padding: '9px 13px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', background: vista === 'ingresos' ? '#16a34a' : '#e2e8f0', color: vista === 'ingresos' ? 'white' : '#0f172a' }}>
            Consultar ingresos registrados
          </button>
          <button type="button" onClick={() => setVista('cancelaciones')} style={{ padding: '9px 13px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', background: vista === 'cancelaciones' ? '#dc2626' : '#e2e8f0', color: vista === 'cancelaciones' ? 'white' : '#0f172a' }}>
            Consultar reporte de cancelaciones
          </button>
          <button type="button" onClick={() => setVista('exportar')} style={{ padding: '9px 13px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', background: vista === 'exportar' ? '#0ea5e9' : '#e2e8f0', color: vista === 'exportar' ? 'white' : '#0f172a' }}>
            Visualizar resumen ejecutivo
          </button>
        </div>

        {vista === 'ocupacion' && (
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
            <thead>
              <tr style={{ background: '#0f172a', color: 'white', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Categoría</th>
                <th style={{ padding: '10px' }}>Total</th>
                <th style={{ padding: '10px' }}>Ocupadas</th>
                <th style={{ padding: '10px' }}>Ocupación</th>
              </tr>
            </thead>
            <tbody>
              {ocupacion.map((item, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px', fontWeight: 'bold' }}>{item.tipo}</td>
                  <td style={{ padding: '10px' }}>{item.total}</td>
                  <td style={{ padding: '10px' }}>{item.ocupadas}</td>
                  <td style={{ padding: '10px', fontWeight: 'bold' }}>{item.porcentaje}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {vista === 'historial' && (
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
            <thead>
              <tr style={{ background: '#0f172a', color: 'white', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Código</th>
                <th style={{ padding: '10px' }}>Huésped</th>
                <th style={{ padding: '10px' }}>Habitación</th>
                <th style={{ padding: '10px' }}>Fechas</th>
                <th style={{ padding: '10px' }}>Estado</th>
                <th style={{ padding: '10px' }}>Monto</th>
              </tr>
            </thead>
            <tbody>
              {historial.map(r => (
                <tr key={r.codigo} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px', fontWeight: 'bold' }}>{r.codigo}</td>
                  <td style={{ padding: '10px' }}>{r.huesped}</td>
                  <td style={{ padding: '10px' }}>{r.habitacion}</td>
                  <td style={{ padding: '10px' }}>{r.fechas}</td>
                  <td style={{ padding: '10px' }}>{r.estado}</td>
                  <td style={{ padding: '10px' }}>Bs {r.monto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {vista === 'ingresos' && (
          <div>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', marginBottom: '15px' }}>
              <thead>
                <tr style={{ background: '#0f172a', color: 'white', textAlign: 'left' }}>
                  <th style={{ padding: '10px' }}>Concepto</th>
                  <th style={{ padding: '10px' }}>Monto</th>
                </tr>
              </thead>
              <tbody>
                {ingresos.map((ing, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '10px' }}>{ing.concepto}</td>
                    <td style={{ padding: '10px', fontWeight: 'bold' }}>Bs {ing.monto}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ background: '#dcfce7', color: '#166534', padding: '14px', borderRadius: '6px', fontWeight: 'bold' }}>
              Total ingresos registrados: Bs {totalIngresos}
            </div>
          </div>
        )}

        {vista === 'cancelaciones' && (
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
            <thead>
              <tr style={{ background: '#0f172a', color: 'white', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Código</th>
                <th style={{ padding: '10px' }}>Huésped</th>
                <th style={{ padding: '10px' }}>Habitación</th>
                <th style={{ padding: '10px' }}>Motivo</th>
              </tr>
            </thead>
            <tbody>
              {cancelaciones.map(c => (
                <tr key={c.codigo} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px', fontWeight: 'bold' }}>{c.codigo}</td>
                  <td style={{ padding: '10px' }}>{c.huesped}</td>
                  <td style={{ padding: '10px' }}>{c.habitacion}</td>
                  <td style={{ padding: '10px' }}>{c.motivo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {vista === 'exportar' && (
          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
            <h3 style={{ marginTop: 0 }}>Resumen ejecutivo del hotel</h3>
            <p style={{ color: '#475569' }}>Genera un consolidado rápido de ocupación, reservas e ingresos.</p>
            <button type="button" onClick={generarResumen} style={{ background: '#0ea5e9', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
              Generar resumen
            </button>
            {mensajeExportar && (
              <div style={{ marginTop: '14px', background: '#e0f2fe', color: '#075985', padding: '12px', borderRadius: '6px', fontWeight: 'bold' }}>
                {mensajeExportar}
              </div>
            )}
          </div>
        )}
      </div>
    </FondoHotel>
  );
}