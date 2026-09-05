import Head from 'next/head'
import Nav from '../components/Nav'

export default function Sobre() {
  return (
    <>
      <Head>
        <title>About — Namibia Overland 2026</title>
      </Head>
      <Nav />
      <main style={{ maxWidth: 'var(--content-width)', margin: '0 auto', padding: '6rem 2rem' }}>
        <header style={{ marginBottom: '4rem' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ochre)', marginBottom: '1rem' }}>About the expedition</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--earth)' }}>
            Who we are.<br /><em>Why Namibia.</em>
          </h1>
        </header>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', lineHeight: 2, color: 'var(--night-soft)' }}>
          <p style={{ color: 'var(--grey)', fontStyle: 'italic', fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}>
            Coming soon...
          </p>
        </div>
      </main>
    </>
  )
}
