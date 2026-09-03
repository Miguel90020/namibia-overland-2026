import Link from 'next/link'

export default function Nav() {
  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.25rem 2rem',
        background: 'rgba(253, 250, 245, 0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--grey-light)',
      }}>
        <Link href="/" style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--earth)' }}>
          Namibia Overland 2026
        </Link>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {[['Diário', '/diario'], ['Mapa', '/mapa'], ['Sobre', '/sobre']].map(([label, href]) => (
            <Link key={href} href={href} style={{
              fontSize: '0.85rem', letterSpacing: '0.08em',
              textTransform: 'uppercase', color: 'var(--grey)',
            }}>{label}</Link>
          ))}
        </div>
      </nav>
      <div style={{ height: '65px' }} />
    </>
  )
}
