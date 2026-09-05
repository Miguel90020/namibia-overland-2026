import { useEffect, useRef } from 'react'
import { rotaGlobal } from '../data/dias'

export default function FullMap({ dias }) {
  const mapRef = useRef(null)
  const instanceRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined' || instanceRef.current) return

    import('leaflet').then(L => {
      delete L.default.Icon.Default.prototype._getIconUrl
      L.default.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      const map = L.default.map(mapRef.current, { scrollWheelZoom: true })
      instanceRef.current = map

      // OpenStreetMap — sem API key
      L.default.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map)

      const allCoords = rotaGlobal.map(p => [p.lat, p.lon])

      L.default.polyline(allCoords, {
        color: '#C8863A', weight: 2, opacity: 0.7, dashArray: '6, 4',
      }).addTo(map)

      // Agrupar dias pelo mesmo alojamento e mostrar números combinados
      const locais = {}
      dias.forEach(dia => {
        const aloj = dia.pontos.find(p => p.tipo === 'alojamento') ||
                     dia.pontos.find(p => p.tipo === 'chegada') ||
                     dia.pontos.find(p => p.tipo === 'partida')
        if (!aloj) return
        const key = `${aloj.lat},${aloj.lon}`
        if (!locais[key]) locais[key] = { lat: aloj.lat, lon: aloj.lon, dias: [] }
        locais[key].dias.push(dia)
      })

      Object.values(locais).forEach(local => {
        const numeros = local.dias.map(d => d.numero).join('-')
        const charCount = numeros.length
        const fontSize = charCount >= 5 ? '7px' : charCount >= 3 ? '8px' : '10px'
        const width = charCount >= 5 ? 42 : charCount >= 3 ? 36 : 28

        const icon = L.default.divIcon({
          className: '',
          html: `<div style="width:${width}px;height:28px;background:#C8863A;border:2px solid white;border-radius:14px;box-shadow:0 2px 6px rgba(0,0,0,0.3);text-align:center;line-height:24px;font-size:${fontSize};font-weight:700;color:white;font-family:Georgia,serif;padding:0 6px;white-space:nowrap;">${numeros}</div>`,
          iconSize: [width, 28],
          iconAnchor: [width / 2, 14],
        })

        const popupContent = local.dias.map(d =>
          `<strong style="font-family:serif;font-size:13px">Dia ${d.numero} · ${d.data}</strong><br><span style="color:#8A7A6A;font-size:12px">${d.titulo}</span>`
        ).join('<hr style="margin:6px 0;border-color:#D4C9B8">')

        L.default.marker([local.lat, local.lon], { icon })
          .addTo(map)
          .bindPopup(popupContent)
      })

      map.fitBounds(L.default.latLngBounds(allCoords), { padding: [40, 40] })
    })

    return () => { if (instanceRef.current) { instanceRef.current.remove(); instanceRef.current = null } }
  }, [dias])

  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <div ref={mapRef} style={{ height: '75vh', minHeight: '500px', width: '100%', borderRadius: '8px', background: 'var(--sand)' }} />
    </>
  )
}
