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
          <p style={{ marginBottom: '1.5rem' }}>In July 2026, five people set off from Windhoek in two self-drive 4x4s with a loose itinerary, a lot of supplies, and no fixed expectations. Twenty-four days later, they returned having covered roughly 5,000 kilometres of Namibian road, sand, salt and gravel.</p>
          <p style={{ marginBottom: '1.5rem' }}>This site is the record of that journey — written as it happened, day by day, without the benefit of hindsight. It is not a travel guide, though you may find it useful if you are planning something similar. It is not a highlight reel. It is an attempt to document what a 24-day overland expedition through Namibia actually looks and feels like: the long drives and the flat tyres, the lodges that exceeded every expectation and the nights beside a fire with no one else around, the wildlife and the silence and the extraordinary landscapes that make this country unlike anywhere else on Earth.</p>
          <p style={{ marginBottom: '1.5rem' }}>If you are here because you are considering a similar trip, you will find practical information alongside the diary entries — tips, distances, costs where relevant, and honest assessments of what worked and what we would do differently. If you are here simply to read, we hope the writing does the journey some justice.</p>
          <p>Namibia has a way of staying with you. This is our attempt to explain why.</p>
        </div>
      </main>
    </>
  )
}
