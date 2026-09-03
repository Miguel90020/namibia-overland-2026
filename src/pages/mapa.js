import Head from 'next/head'
import dynamic from 'next/dynamic'
import Nav from '../components/Nav'
import { dias } from '../data/dias'

const FullMap = dynamic(() => import('../components/FullMap'), { ssr: false })

export default function MapaGlobal() {
  return (
    <>
      <Head>
        <title>Mapa da Expedição — Namibia Overland 2026</title>
        <meta name="description" content="Mapa completo da expedição — 4000 km pela Namíbia." />
      </Head>
      <Nav />
      <main style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '4rem 2rem' }}>
        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ochre)', marginBottom: '1rem' }}>Rota completa</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--earth)' }}>Mapa da Expedição</h1>
        </header>
        <FullMap dias={dias} />
      </main>
    </>
  )
}
