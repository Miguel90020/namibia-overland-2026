import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import { useState } from 'react'

export default function Roadbook() {
  const [loading, setLoading] = useState(false)

  async function handleBuy() {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', { method: 'POST' })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }

  const buyButton = (variant = 'primary') => (
    <button
      onClick={handleBuy}
      disabled={loading}
      style={{
        display: 'inline-block', padding: '1rem 2.5rem',
        background: variant === 'primary' ? 'var(--ochre)' : 'var(--earth)',
        color: 'var(--white)',
        fontSize: '0.85rem', letterSpacing: '0.12em',
        textTransform: 'uppercase', borderRadius: '2px',
        border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.7 : 1,
        transition: 'background 0.2s',
      }}
    >
      {loading ? 'Redirecting…' : 'Download — €20'}
    </button>
  )

  return (
    <>
      <Head>
        <title>Namibia 2026 Roadbook — Far Gravel</title>
        <meta name="description" content="76 pages. 4 000 km. 24 days. 4 main maps, daily mini-maps, a full packing checklist, budget breakdown and every waypoint from the Kalahari to the Waterberg." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Namibia 2026 Roadbook — Far Gravel" />
        <meta property="og:description" content="76 pages. 4 000 km. 24 days. The complete self-drive guide to Namibia." />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Nav />

      {/* Hero */}
      <section style={{
        position: 'relative',
        minHeight: '70vh',
        background: 'linear-gradient(160deg, #1A1208 0%, #2C1F0E 50%, #6B4226 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '6rem 2rem 4rem',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'url(/images/hero.jpg) center/cover no-repeat', opacity: 0.3 }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '680px' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--ochre)', marginBottom: '1.5rem' }}>
            Far Gravel · Namibia 2026
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            color: 'var(--white)', lineHeight: 1.15, marginBottom: '1.5rem',
          }}>
            The Roadbook
          </h1>
          <p style={{
            fontFamily: 'var(--font-display)', fontStyle: 'italic',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'var(--sand)', marginBottom: '3rem', lineHeight: 1.7,
          }}>
            76 pages. 4 000 km. Every track, camp and waypoint<br />from the Kalahari to the Waterberg.
          </p>
          {buyButton('primary')}
        </div>
      </section>

      {/* What's inside */}
      <section style={{ maxWidth: 'var(--content-width)', margin: '0 auto', padding: '7rem 2rem' }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
          color: 'var(--earth)', marginBottom: '1rem', textAlign: 'center',
        }}>
          What's inside
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--grey)', fontSize: '0.95rem', marginBottom: '3.5rem' }}>
          A crossing from the Kalahari to the Waterberg — designed for two 4x4s, five people, 24 days.
        </p>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
        }}>
          {[
            {
              icon: '⟁',
              title: 'Route & Maps',
              body: 'A mini-map for every driving day, with GPS waypoints listed in order, departure times and distance per stage. Essential navigation without the noise.',
            },
            {
              icon: '⌾',
              title: 'Camps & Lodges',
              body: '13 base camps, from luxury lodges to wild bush camps. Coordinates, booking notes, board basis and what to expect at each overnight stop.',
            },
            {
              icon: '◈',
              title: 'Budget & Costs',
              body: 'Full cost breakdown for the trip — fuel, park permits, food and daily expenses — with approximate values in EUR. No surprises on the road.',
            },
            {
              icon: '◻',
              title: 'Checklists & Logistics',
              body: 'Packing checklist per person, first supermarket shop, fuel and meals reference, useful Afrikaans phrases, and emergency contacts for the whole route.',
            },
          ].map(item => (
            <div key={item.title} style={{ padding: '0.5rem 0' }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: '1.6rem',
                color: 'var(--ochre)', marginBottom: '0.75rem',
              }}>{item.icon}</div>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: '1.1rem',
                color: 'var(--earth)', marginBottom: '0.6rem',
              }}>{item.title}</h3>
              <p style={{ color: 'var(--grey)', fontSize: '0.95rem', lineHeight: 1.8 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats strip */}
      <section style={{
        background: 'var(--night-soft)',
        padding: '4rem 2rem',
      }}>
        <div style={{
          maxWidth: 'var(--max-width)', margin: '0 auto',
          display: 'flex', justifyContent: 'center',
          flexWrap: 'wrap', gap: '3rem',
        }}>
          {[
            { n: '76', label: 'pages' },
            { n: '4 000 km', label: 'of route' },
            { n: '24', label: 'days' },
            { n: '24', label: 'daily maps' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--ochre)', lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--grey-light)', marginTop: '0.4rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section style={{ maxWidth: 'var(--content-width)', margin: '0 auto', padding: '7rem 2rem', textAlign: 'center' }}>
        <blockquote style={{
          fontFamily: 'var(--font-display)', fontStyle: 'italic',
          fontSize: 'clamp(1.2rem, 2.5vw, 1.7rem)',
          color: 'var(--earth)', lineHeight: 1.6,
          borderLeft: '3px solid var(--ochre)', paddingLeft: '2rem',
          textAlign: 'left', maxWidth: '560px', margin: '0 auto',
        }}>
          "As always, the road will teach us that what matters is not mastering the route, but walking with clarity, gratitude and courage."
        </blockquote>
        <p style={{ marginTop: '1.5rem', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--grey)' }}>
          — Namibia 2026 Roadbook, p. 76
        </p>
      </section>

      {/* CTA final */}
      <section style={{
        background: 'var(--sand)',
        padding: '6rem 2rem',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ochre)', marginBottom: '1rem' }}>
          PDF · Instant download
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
          color: 'var(--earth)', marginBottom: '1rem',
        }}>
          Ready to plan your expedition?
        </h2>
        <p style={{ color: 'var(--grey)', marginBottom: '3.5rem', fontSize: '1rem', maxWidth: '480px', margin: '0 auto 3.5rem' }}>
          One payment. No subscription. Yours forever.
        </p>

        <div style={{ maxWidth: '420px', margin: '0 auto' }}>
          {buyButton('secondary')}
        </div>

        <p style={{ marginTop: '2rem', fontSize: '0.8rem', color: 'var(--grey)' }}>
          Secure payment via Stripe
        </p>
      </section>
    </>
  )
}
