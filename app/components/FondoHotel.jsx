'use client';

export default function FondoHotel({ children, imagenUrl }) {
  const fondoDefault =
    imagenUrl ||
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80';

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.68), rgba(15, 23, 42, 0.72)), url("${fondoDefault}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        fontFamily: 'Arial, sans-serif',
        padding: '28px 16px'
      }}
    >
      {children}
    </div>
  );
}