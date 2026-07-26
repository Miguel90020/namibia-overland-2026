import Link from 'next/link'
import { useState } from 'react'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.25rem 2rem',
        background: 'rgba(253, 250, 245, 0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--grey-light)',
      }}>
        <Link href="/" style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.1rem',
          letterSpacing: '0.02em',
          color: 'var(--earth)',
        }}>
          Namibia Overland 2026
        </Link>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href="/diario" style={navLink}>Diário</Link>
          <Link href="/mapa" style={navLink}>Mapa</Link>
          <Link href="/sobre" style={navLink}>Sobre</Link>
        </div>
      </nav>
      <div style={{ height: '65px' }} />
    </>
  )
}

const navLink = {
  fontSize: '0.85rem',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--grey)',
  transition: 'color 0.2s',
}
