import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Success() {
  const router = useRouter()
  const { session_id } = router.query
  const [status, setStatus] = useState('loading') // loading | valid | invalid

  useEffect(() => {
    if (!session_id) return

    fetch(`/api/verify-session?session_id=${session_id}`)
      .then(res => res.json())
      .then(data => {
        if (data.valid) {
          setStatus('valid')
        } else {
          setStatus('invalid')
        }
      })
      .catch(() => setStatus('invalid'))
  }, [session_id])

  useEffect(() => {
    if (status === 'invalid') {
      router.replace('/roadbook')
    }
  }, [status])

  if (status === 'loading') {
    return (
      <>
        <Head>
          <title>Download ready — Far Gravel</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.svg" />
        </Head>
        <Nav />
        <section style={{
          minHeight: '80vh', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          background: 'linear-gradient(160deg, #1A1208 0%, #2C1F0E 50%, #6B4226 100%)',
        }}>
          <p style={{ color: 'var(--sand)', fontSize: '1rem' }}>A verificar pagamento…</p>
        </section>
      </>
    )
  }

  if (status === 'invalid') return null

  return (
    <>
      <Head>
        <title>Download ready — Far Gravel</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Nav />

      <section style={{
        minHeight: '80vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '6rem 2rem',
        background: 'linear-gradient(160deg, #1A1208 0%, #2C1F0E 50%, #6B4226 100%)',
      }}>
        <div style={{ maxWidth: '520px' }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '50%',
            background: 'var(--ochre)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 2rem', fontSize: '1.5rem', color: 'var(--white)',
          }}>
            ✓
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            color: 'var(--white)', marginBottom: '1.5rem', lineHeight: 1.2,
          }}>
            Payment confirmed
          </h1>
          <p style={{
            color: 'var(--sand)', fontSize: '1rem', lineHeight: 1.8,
            marginBottom: '3rem',
          }}>
            Your Namibia 2026 Roadbook is ready to download.
          </p>

          <a
            href="/downloads/namibia-2026-roadbook.pdf"
            download
            style={{
              display: 'inline-block', padding: '1rem 2.5rem',
              background: 'var(--ochre)', color: 'var(--white)',
              fontSize: '0.85rem', letterSpacing: '0.12em',
              textTransform: 'uppercase', borderRadius: '2px',
              textDecoration: 'none', marginBottom: '2rem',
            }}
          >
            Download PDF
          </a>

          <br />

          <Link href="/" style={{
            display: 'inline-block', padding: '0.85rem 2rem',
            border: '1px solid var(--ochre)', color: 'var(--ochre)',
            fontSize: '0.8rem', letterSpacing: '0.12em',
            textTransform: 'uppercase', borderRadius: '2px',
            textDecoration: 'none',
          }}>
            Back to Far Gravel
          </Link>
        </div>
      </section>
    </>
  )
}
