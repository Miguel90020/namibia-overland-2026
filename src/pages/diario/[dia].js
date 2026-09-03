import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Nav from '../../components/Nav'
import { dias } from '../../data/dias'

const DayMap = dynamic(() => import('../../components/DayMap'), { ssr: false })

export async function getStaticPaths() {
  const paths = dias.map(d => ({ params: { dia: `dia-${String(d.numero).padStart(2, '0')}` } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const numero = parseInt(params.dia.replace('dia-', ''), 10)
  const dia = dias.find(d => d.numero === numero)
  const anterior = dias.find(d => d.numero === numero - 1) || null
  const proximo = dias.find(d => d.numero === numero + 1) || null

  // Ler ficheiro Markdown individual do dia
  const mdPath = path.join(process.cwd(), 'content/dias', `${params.dia}.md`)
  let frontmatter = {}
  if (fs.existsSync(mdPath)) {
    const { data } = matter(fs.readFileSync(mdPath, 'utf8'))
    frontmatter = data
  }

  return { props: { dia, anterior, proximo, frontmatter } }
}

export default function DiaPage({ dia, anterior, proximo, frontmatter }) {
  const diaSlug = `dia-${String(dia.numero).padStart(2, '0')}`
  const fotoCapa = frontmatter.foto_capa || null
  const fotoDestaque = frontmatter.foto_destaque || null
  const video = frontmatter.video || null
  const galerias = frontmatter.galerias || []
  const resumo = frontmatter.resumo || null
  const sabias_que = frontmatter.sabias_que || null
  const dicas = frontmatter.dicas || null
  const animais = frontmatter.animais || null
  const temperatura = frontmatter.temperatura || null

  return (
    <>
      <Head>
        <title>Dia {dia.numero} — {dia.titulo} · Namibia Overland 2026</title>
        <meta name="description" content={`${dia.data} — ${dia.subtitulo}. ${dia.titulo}.`} />
      </Head>
      <Nav />

      {/* Hero */}
      <section style={{
        position: 'relative', height: '70vh', minHeight: '480px',
        background: 'linear-gradient(160deg, var(--night) 0%, var(--earth) 100%)', overflow: 'hidden',
      }}>
        {fotoCapa && <div style={{ position: 'absolute', inset: 0, background: `url(${fotoCapa}) center/cover no-repeat`, opacity: 0.6 }} />}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,18,8,0.9) 0%, rgba(26,18,8,0.1) 70%)' }} />
        <div style={{ position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', width: '100%', padding: '0 2rem' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ochre)', marginBottom: '1rem' }}>
            Dia {dia.numero} · {dia.data}
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--white)', marginBottom: '0.75rem' }}>{dia.titulo}</h1>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--sand)' }}>{dia.subtitulo}</p>
        </div>
      </section>

      {/* Quick stats */}
      <div style={{ background: 'var(--night-soft)', padding: '1rem 2rem', display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
        {[
          { label: 'Destino', value: dia.destino },
          { label: 'Região', value: dia.regiao },
          dia.km > 0 && { label: 'Distância', value: `${dia.km} km` },
          temperatura && { label: 'Temperatura', value: temperatura },
          animais && { label: 'Fauna', value: animais },
        ].filter(Boolean).map(s => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ochre)', marginBottom: '0.2rem' }}>{s.label}</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--sand)', fontFamily: 'var(--font-display)' }}>{s.value}</div>
          </div>
        ))}
      </div>

      <main style={{ maxWidth: 'var(--content-width)', margin: '0 auto', padding: '4rem 2rem' }}>

        {/* Mapa */}
        <section style={{ marginBottom: '4rem' }}>
          <Label>Percurso do dia</Label>
          <DayMap pontos={dia.pontos} height={380} />
          <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {dia.pontos.map(p => (
              <span key={p.nome} style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', background: 'var(--sand)', borderRadius: '2px', color: 'var(--earth)' }}>{p.nome}</span>
            ))}
          </div>
        </section>

        {/* Resumo */}
        <section style={{ marginBottom: '4rem' }}>
          <Label>O que vivemos</Label>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', lineHeight: 2, color: 'var(--night-soft)', borderLeft: '3px solid var(--ochre)', paddingLeft: '1.5rem' }}>
            {resumo
              ? resumo.split('\n').map((p, i) => <p key={i} style={{ marginBottom: '1rem' }}>{p}</p>)
              : <p style={{ color: 'var(--grey)', fontStyle: 'italic', fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}>Em breve...</p>
            }
          </div>
        </section>

        {/* Foto destaque */}
        {fotoDestaque && (
          <section style={{ marginBottom: '4rem' }}>
            <Label>Fotografia do dia</Label>
            <img src={fotoDestaque} alt={dia.titulo} style={{ width: '100%', borderRadius: '4px', aspectRatio: '3/2', objectFit: 'cover' }} />
          </section>
        )}

        {/* Vídeo */}
        {video && (
          <section style={{ marginBottom: '4rem' }}>
            <Label>Vídeo</Label>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '8px' }}>
              <iframe
                src={video.includes('youtube') ? video.replace('watch?v=', 'embed/') : video.replace('vimeo.com/', 'player.vimeo.com/video/')}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>
          </section>
        )}

        {/* Galeria */}
        {galerias.length > 0 && (
          <section style={{ marginBottom: '4rem' }}>
            <Label>Galeria</Label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '4px' }}>
              {galerias.map((url, i) => (
                <img key={i} src={url} alt={`${dia.titulo} ${i + 1}`}
                  style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: '2px' }} />
              ))}
            </div>
          </section>
        )}

        {/* Dicas */}
        {dicas && (
          <section style={{ marginBottom: '4rem', background: 'var(--sand-dark)', padding: '2rem', borderRadius: '4px' }}>
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ochre)', marginBottom: '0.75rem' }}>
              📍 As nossas dicas
            </p>
            <p style={{ color: 'var(--night-soft)', fontSize: '0.95rem', lineHeight: 1.8 }}>{dicas}</p>
          </section>
        )}

        {/* Sabias que */}
        {sabias_que && (
          <section style={{ marginBottom: '4rem', background: 'var(--sand)', padding: '2rem', borderRadius: '4px' }}>
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ochre)', marginBottom: '0.75rem' }}>
              💡 Sabias que?
            </p>
            <p style={{ color: 'var(--night-soft)', fontSize: '0.95rem', lineHeight: 1.8 }}>{sabias_que}</p>
          </section>
        )}

        {/* Amanhã */}
        {dia.amanha && (
          <section style={{ borderTop: '1px solid var(--grey-light)', paddingTop: '2rem', marginBottom: '4rem', textAlign: 'right' }}>
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--grey)', marginBottom: '0.5rem' }}>Amanhã seguimos para…</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--earth)', fontStyle: 'italic' }}>{dia.amanha}</p>
          </section>
        )}

        {/* Navegação */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', paddingTop: '2rem', borderTop: '1px solid var(--grey-light)' }}>
          {anterior
            ? <Link href={`/diario/dia-${String(anterior.numero).padStart(2, '0')}`} style={{ color: 'var(--grey)', fontSize: '0.85rem' }}>← Dia {anterior.numero}</Link>
            : <span />}
          <Link href="/diario" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ochre)' }}>Todos os dias</Link>
          {proximo
            ? <Link href={`/diario/dia-${String(proximo.numero).padStart(2, '0')}`} style={{ color: 'var(--grey)', fontSize: '0.85rem' }}>Dia {proximo.numero} →</Link>
            : <span />}
        </nav>
      </main>
    </>
  )
}

function Label({ children }) {
  return <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ochre)', marginBottom: '1.25rem' }}>{children}</p>
}
