import { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function FullMap({ dias }) {
  const mapRef = useRef(null)
  const instanceRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (instanceRef.current) return

    import('leaflet').then(L => {
      delete L.default.Icon.Default.prototype._getIconUrl
      L.default.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      const map = L.default.map(mapRef.current, { scrollWheelZoom: true })
      instanceRef.current = map

      L.default.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap © CartoDB',
        maxZoom: 18,
      }).addTo(map)

      // All points in order
      const allCoords = []
      const allochados = new Set()

      dias.forEach(dia => {
        dia.pontos.forEach(p => {
          const key = `${p.lat},${p.lon}`
          if (!allochados.has(key)) {
            allCoords.push([p.lat, p.lon])
            allochados.add(key)
          }
        })
      })

      // Full route line
      L.default.polyline(allCoords, {
        color: '#C8863A',
        weight: 2,
        opacity: 0.7,
        dashArray: '6, 4',
      }).addTo(map)

      // Day markers — alojamentos only
      dias.forEach(dia => {
        const aloj = dia.pontos.find(p => p.tipo === 'alojamento' || p.tipo === 'chegada')
        if (!aloj) return

        const icon = L.default.divIcon({
          className: '',
          html: `<div style="
            width: 28px; height: 28px;
            background: var(--ochre, #C8863A);
            border: 2px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            display: flex; align-items: center; justify-content: center;
            font-size: 10px; font-weight: 600; color: white;
            font-family: serif;
          ">${dia.numero}</div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        })

        L.default.marker([aloj.lat, aloj.lon], { icon })
          .addTo(map)
          .bindPopup(`
            <strong style="font-family:serif;font-size:14px">Dia ${dia.numero} · ${dia.data}</strong><br>
            <span style="color:#8A7A6A">${dia.titulo}</span>
          `)
      })

      const bounds = L.default.latLngBounds(allCoords)
      map.fitBounds(bounds, { padding: [40, 40] })
    })

    return () => {
      if (instanceRef.current) {
        instanceRef.current.remove()
        instanceRef.current = null
      }
    }
  }, [dias])

  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <div
        ref={mapRef}
        style={{
          height: '75vh',
          minHeight: '500px',
          width: '100%',
          borderRadius: '8px',
          background: 'var(--sand)',
        }}
      />
    </>
  )
}
