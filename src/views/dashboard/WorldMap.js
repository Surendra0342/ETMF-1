import React from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps'

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const WorldMap = () => {
  // Country data with study counts - using ISO country codes
  const countryData = {
    'USA': 15,
    'CAN': 15,
    'BRA': 8,
    'GBR': 5,
    'FRA': 5,
    'DEU': 5,
    'RUS': 7,
    'CHN': 12,
    'IND': 10,
    'AUS': 6,
    'ZAF': 4,
    'UGA': 7,
    'MDA': 5,
    'PRY': 4
  }

  // Function to get color based on study count
  const getColor = (geo) => {
    const isoCode = geo.properties.ISO_A3
    const count = countryData[isoCode]

    if (!count) return '#e5e7eb' // Light gray for countries with no data
    if (count >= 12) return '#166534' // Dark green
    if (count >= 8) return '#16a34a'  // Medium green
    if (count >= 5) return '#22c55e'  // Light green
    return '#86efac' // Very light green
  }

  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{
        scale: 120,
        center: [0, 20]
      }}
      style={{ width: '100%', height: '100%' }}
    >
      <ZoomableGroup>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isoCode = geo.properties.ISO_A3
              const count = countryData[isoCode]

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={getColor(geo)}
                  stroke="#ffffff"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: {
                      fill: count ? '#15803d' : '#d1d5db',
                      outline: 'none',
                      cursor: count ? 'pointer' : 'default'
                    },
                    pressed: { outline: 'none' }
                  }}
                >
                  {count && (
                    <title>{geo.properties.NAME} - {count} studies</title>
                  )}
                </Geography>
              )
            })
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  )
}

export default WorldMap
