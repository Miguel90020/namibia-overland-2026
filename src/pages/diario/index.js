import Head from 'next/head'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Nav from '../../components/Nav'
import { dias } from '../../data/dias'

export async function getStaticProps() {
  const fotos = {}
  dias.forEach(dia => {
    const slug = `dia-${String(dia.numero).padStart(2, '0')}`
    const mdPath = path.join(process.cwd(), 'content/dias', `${slug}.md`)
    if (fs.existsSync(mdPath)) {
      const { data } = matter(fs.readFileSync(mdPath, 'utf8'))
      fotos[dia.numero] = data.foto_capa || null
    }
  })
  return { props: { fotos } }
}

export default function Diario({ fotos }) {
  return (
    <>
      <Head>
        <title>Travel Diary — Namibia Overland 2026</title>
        <meta name="description" content="24 days of expedition through Namibia. A complete diary, day by day." />
      </Head>
      <Nav />
      <main style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '4rem 2rem' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ochre)', marginBottom: '1rem' }}>July · August 2026</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--earth)', marginBottom: '1rem' }}>Travel Diary</h1>
          <p style={{ color: 'var(--grey)', maxWidth: '480px', margin: '0 auto' }}>24 days. One entry per day. The story of the journey as it happened.</p>
        </header>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2px' }}>
          {dias.map(dia => {
            const fotoCapa = fotos[dia.numero]
            const bgImage = fotoCapa
              ? `url(${fotoCapa}) center/cover no-repeat`
              : 'linear-gradient(160deg, var(--night-soft) 0%, var(--earth) 100%)'
            return (
              <Link key={dia.numero} href={`/diario/dia-${String(dia.numero).padStart(2, '0')}`} style={{ display: 'block' }}>
                <article style={{ position: 'relative', aspectRatio: '4/3', background: 'var(--sand)', overflow: 'hidden', cursor: 'pointer' }}>
                  <div style={{ position: 'absolute', inset: 0, background: bgImage, transition: 'transform 0.4s ease' }} className="card-img" />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,18,8,0.85) 0%, rgba(26,18,8,0.1) 60%)' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem' }}>
                    <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ochre)', marginBottom: '0.4rem' }}>
                      Day {dia.numero} · {dia.data}
                    </p>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--white)', lineHeight: 1.2, marginBottom: '0.3rem' }}>{dia.titulo}</h2>
                    <p style={{ fontSize: '0.8rem', color: 'var(--sand)', fontStyle: 'italic' }}>{dia.subtitulo}</p>
                  </div>
                  {dia.km > 0 && (
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(200,134,58,0.9)', color: 'white', fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: '2px' }}>
                      {dia.km} km
                    </div>
                  )}
                </article>
              </Link>
            )
          })}
        </div>
      </main>
      <style jsx global>{`article:hover .card-img { transform: scale(1.04); }`}</style>
    </>
  )
}
