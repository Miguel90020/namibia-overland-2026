import Head from 'next/head'
import Link from 'next/link'
import Nav from '../../components/Nav'
import { dias } from '../../data/dias'

export default function Diario() {
  return (
    <>
      <Head>
        <title>Diário de Viagem — Namibia Overland 2026</title>
        <meta name="description" content="24 dias de expedição pela Namíbia. Um diário completo, dia a dia." />
      </Head>

      <Nav />

      <main style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '4rem 2rem' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <p style={{
            fontSize: '0.75rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--ochre)',
            marginBottom: '1rem',
          }}>
            Julho · Agosto 2026
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: 'var(--earth)',
            marginBottom: '1rem',
          }}>
            Diário de Viagem
          </h1>
          <p style={{ color: 'var(--grey)', maxWidth: '480px', margin: '0 auto' }}>
            24 dias. Uma entrada por dia. A história da viagem tal como aconteceu.
          </p>
        </header>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '2px',
        }}>
          {dias.map(dia => (
            <Link
              key={dia.numero}
              href={`/diario/dia-${String(dia.numero).padStart(2, '0')}`}
              style={{ display: 'block', textDecoration: 'none' }}
            >
              <article style={{
                position: 'relative',
                aspectRatio: '4/3',
                background: 'var(--sand)',
                overflow: 'hidden',
                cursor: 'pointer',
              }}>
                {/* Photo placeholder */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `url(/images/dia-${String(dia.numero).padStart(2, '0')}/capa.jpg) center/cover no-repeat`,
                  transition: 'transform 0.4s ease',
                }} className="card-img" />

                {/* Overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(26,18,8,0.85) 0%, rgba(26,18,8,0.1) 60%)',
                }} />

                {/* Content */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '1.5rem',
                }}>
                  <p style={{
                    fontSize: '0.7rem', letterSpacing: '0.15em',
                    textTransform: 'uppercase', color: 'var(--ochre)',
                    marginBottom: '0.4rem',
                  }}>
                    Dia {dia.numero} · {dia.data}
                  </p>
                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.2rem', color: 'var(--white)',
                    lineHeight: 1.2, marginBottom: '0.3rem',
                  }}>
                    {dia.titulo}
                  </h2>
                  <p style={{
                    fontSize: '0.8rem', color: 'var(--sand)',
                    fontStyle: 'italic',
                  }}>
                    {dia.subtitulo}
                  </p>
                </div>

                {/* KM badge */}
                {dia.km > 0 && (
                  <div style={{
                    position: 'absolute', top: '1rem', right: '1rem',
                    background: 'rgba(200, 134, 58, 0.9)',
                    color: 'white', fontSize: '0.7rem',
                    padding: '0.2rem 0.6rem', borderRadius: '2px',
                    letterSpacing: '0.05em',
                  }}>
                    {dia.km} km
                  </div>
                )}
              </article>
            </Link>
          ))}
        </div>
      </main>

      <style jsx global>{`
        article:hover .card-img {
          transform: scale(1.04);
        }
      `}</style>
    </>
  )
}
