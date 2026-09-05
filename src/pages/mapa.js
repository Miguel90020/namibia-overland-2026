import Head from 'next/head'
import dynamic from 'next/dynamic'
import Nav from '../components/Nav'
import { dias } from '../data/dias'

const FullMap = dynamic(() => import('../components/FullMap'), { ssr: false })

export default function MapaGlobal() {
  return (
    <>
      <Head>
        <title>Expedition Map — Namibia Overland 2026</title>
        <meta name="description" content="Full expedition map — 4000 km across Namibia." />
      </Head>
      <Nav />
      <main style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '4rem 2rem' }}>
        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ochre)', marginBottom: '1rem' }}>Full route</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--earth)' }}>Expedition Map</h1>
        </header>
        <FullMap dias={dias} />
        <p style={{
          marginTop: '1rem',
          fontSize: '0.78rem',
          color: 'var(--grey)',
          fontStyle: 'italic',
          textAlign: 'center',
        }}>
          Each marker represents a night's stay. The lines connecting them are a simplified representation of our route — not the exact roads we drove. For full details of each day, visit the diary.
        </p>
      </main>
    </>
  )
}
