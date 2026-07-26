import { useEffect, useRef } from 'react'

export default function DayMap({ pontos, height = 400 }) {
  const mapRef = useRef(null)
  const instanceRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (instanceRef.current) return
    if (!pontos || pontos.length === 0) return

    import('leaflet').then(L => {
      // Fix leaflet icon paths in Next.js
      delete L.default.Icon.Default.prototype._getIconUrl
      L.default.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      const map = L.default.map(mapRef.current, { zoomControl: true, scrollWheelZoom: false })
      instanceRef.current = map

      L.default.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap © CartoDB',
        maxZoom: 18,
      }).addTo(map)

      const coords = pontos.map(p => [p.lat, p.lon])

      // Draw route line
      if (coords.length > 1) {
        L.default.polyline(coords, {
          color: '#C8863A',
          weight: 2.5,
          opacity: 0.8,
          dashArray: '6, 4',
        }).addTo(map)
      }

      // Custom icons
      const makeIcon = (tipo) => {
        const colors = {
          partida: '#6B4226',
          chegada: '#6B4226',
          alojamento: '#C8863A',
          ponto: '#8A7A6A',
        }
        const color = colors[tipo] || colors.ponto
        return L.default.divIcon({
          className: '',
          html: `<div style="
            width: 10px; height: 10px;
            background: ${color};
            border: 2px solid white;
            border-radius: 50%;
            box-shadow: 0 1px 4px rgba(0,0,0,0.3);
          "></div>`,
          iconSize: [10, 10],
          iconAnchor: [5, 5],
        })
      }

      pontos.forEach(p => {
        L.default.marker([p.lat, p.lon], { icon: makeIcon(p.tipo) })
          .addTo(map)
          .bindPopup(`<strong style="font-family:serif">${p.nome}</strong>`)
      })

      // Fit bounds
      const bounds = L.default.latLngBounds(coords)
      map.fitBounds(bounds, { padding: [40, 40] })
    })

    return () => {
      if (instanceRef.current) {
        instanceRef.current.remove()
        instanceRef.current = null
      }
    }
  }, [pontos])

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <div
        ref={mapRef}
        style={{
          height: `${height}px`,
          width: '100%',
          borderRadius: '8px',
          background: 'var(--sand)',
        }}
      />
    </>
  )
}
