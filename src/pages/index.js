import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import { estatisticas } from '../data/dias'

export default function Home() {
  return (
    <>
      <Head>
        <title>Namibia Overland 2026 — Uma travessia em família</title>
        <meta name="description" content="24 dias, 4000 km, 2 jipes. Uma travessia em família do Kalahari ao Etosha." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Nav />

      {/* Hero */}
      <section style={{
        position: 'relative',
        height: '100vh',
        minHeight: '600px',
        background: 'linear-gradient(160deg, #1A1208 0%, #2C1F0E 40%, #6B4226 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
        overflow: 'hidden',
      }}>
        {/* Hero image placeholder — substituir por imagem real */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'url(/images/hero.jpg) center/cover no-repeat',
          opacity: 0.4,
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--ochre)',
            marginBottom: '1.5rem',
          }}>
            Julho · Agosto 2026
          </p>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            color: 'var(--white)',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
          }}>
            Namibia Overland<br />
            <em>2026</em>
          </h1>

          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1rem, 2vw, 1.3rem)',
            color: 'var(--sand)',
            fontStyle: 'italic',
            marginBottom: '3rem',
          }}>
            Uma travessia em família do Kalahari ao Etosha
          </p>

          {/* Stats */}
          <div style={{
            display: 'flex',
            gap: '2.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '3rem',
          }}>
            {[
              { n: estatisticas.dias, label: 'dias' },
              { n: `${estatisticas.km.toLocaleString()} km`, label: 'percorridos' },
              { n: estatisticas.jipes, label: 'jipes' },
              { n: estatisticas.alojamentos, label: 'alojamentos' },
              { n: estatisticas.viajantes, label: 'viajantes' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2rem',
                  color: 'var(--ochre)',
                  lineHeight: 1,
                }}>
                  {s.n}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--grey-light)',
                  marginTop: '0.25rem',
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <Link href="/diario" style={{
            display: 'inline-block',
            padding: '1rem 2.5rem',
            background: 'var(--ochre)',
            color: 'var(--white)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            borderRadius: '2px',
            transition: 'background 0.2s',
          }}>
            Começar a Viagem
          </Link>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'var(--grey-light)',
          fontSize: '0.7rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          opacity: 0.6,
        }}>
          ↓
        </div>
      </section>

      {/* Teaser Section */}
      <section style={{
        maxWidth: 'var(--content-width)',
        margin: '0 auto',
        padding: 'var(--spacing-xl) var(--spacing-md)',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
          marginBottom: '1.5rem',
          color: 'var(--earth)',
        }}>
          Onde estivemos. O que vivemos.<br />
          <em>Porque valeu a pena.</em>
        </h2>
        <p style={{
          color: 'var(--grey)',
          fontSize: '1.05rem',
          maxWidth: '560px',
          margin: '0 auto 2.5rem',
          lineHeight: 2,
        }}>
          Do Kalahari às dunas de Sossusvlei, de Lüderitz ao coração de Etosha —
          24 dias de expedição em família pelo sudoeste africano.
        </p>
        <Link href="/diario" style={{
          fontSize: '0.85rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--ochre)',
          borderBottom: '1px solid var(--ochre)',
          paddingBottom: '2px',
        }}>
          Ver o Diário →
        </Link>
      </section>
    </>
  )
}
