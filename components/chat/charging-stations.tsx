'use client'

import { Zap, Clock, Navigation } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ChargingStation {
  name: string
  location: string
  network?: string | null
  ports?: number | null
  maxKw?: number | null
  distanceFromRoute?: string | null
  estimatedChargingTime?: string | null
  amenitiesNearby?: string[] | null
}

export interface ChargingStationsProps {
  stations: ChargingStation[]
  title?: string
  state?: 'input-streaming' | 'input-available' | 'output-available'
}

const networkColors: Record<string, string> = {
  Tesla: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  Supercharger: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  Electrify: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  'Electrify America': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  ChargePoint: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  EVgo: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Blink: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
}

function getNetworkColor(network?: string | null) {
  if (!network) return 'bg-muted text-muted-foreground'
  for (const key of Object.keys(networkColors)) {
    if (network.toLowerCase().includes(key.toLowerCase())) {
      return networkColors[key]
    }
  }
  return 'bg-muted text-muted-foreground'
}

export function ChargingStations({
  stations,
  title = 'Charging stations along the way',
  state = 'input-available',
}: ChargingStationsProps) {
  if (state === 'input-streaming') {
    return (
      <div className="flex flex-col gap-3 max-w-sm w-full">
        <div className="h-3.5 w-40 bg-muted rounded animate-pulse" />
        {[1, 2].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-border bg-card p-4 flex gap-3 animate-pulse"
          >
            <div className="h-9 w-9 rounded-full bg-muted shrink-0" />
            <div className="flex flex-col gap-2 flex-1">
              <div className="h-3 w-28 bg-muted rounded" />
              <div className="h-2.5 w-20 bg-muted rounded" />
              <div className="h-2.5 w-24 bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 max-w-sm w-full">
      <div className="flex items-center gap-2">
        <Zap className="h-4 w-4 text-muted-foreground" />
        <p className="text-sm font-medium text-foreground">{title}</p>
      </div>

      <div className="flex flex-col gap-2">
        {stations.map((station, index) => (
          <div
            key={index}
            className="rounded-xl border border-border bg-card p-4 flex gap-3 hover:bg-muted/20 transition-colors"
          >
            {/* Icon */}
            <div className="flex items-center justify-center h-9 w-9 rounded-full bg-muted shrink-0">
              <Zap className="h-4 w-4 text-foreground" />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-1 min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium text-foreground truncate">{station.name}</p>
                {station.network && (
                  <span
                    className={cn(
                      'text-[10px] font-semibold px-1.5 py-0.5 rounded-full shrink-0',
                      getNetworkColor(station.network)
                    )}
                  >
                    {station.network}
                  </span>
                )}
              </div>

              <p className="text-xs text-muted-foreground truncate">{station.location}</p>

              <div className="flex items-center gap-3 mt-1">
                {station.maxKw && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    {station.maxKw} kW
                  </span>
                )}
                {station.ports && (
                  <span className="text-xs text-muted-foreground">
                    {station.ports} ports
                  </span>
                )}
                {station.estimatedChargingTime && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {station.estimatedChargingTime}
                  </span>
                )}
                {station.distanceFromRoute && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Navigation className="h-3 w-3" />
                    {station.distanceFromRoute}
                  </span>
                )}
              </div>

              {station.amenitiesNearby && station.amenitiesNearby.length > 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  Nearby: {station.amenitiesNearby.join(', ')}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
