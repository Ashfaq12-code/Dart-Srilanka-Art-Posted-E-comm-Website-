import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0a',
        color: '#ffffff',
        fontFamily: 'Inter, sans-serif',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <h1 style={{ fontSize: '6rem', fontWeight: 800, margin: 0, color: '#22c55e' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 600, margin: '1rem 0 0.5rem' }}>
        Page Not Found
      </h2>
      <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        style={{
          background: '#22c55e',
          color: '#000',
          padding: '0.75rem 2rem',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          fontWeight: 600,
        }}
      >
        Go Back Home
      </Link>
    </div>
  );
}
