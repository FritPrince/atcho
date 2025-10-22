import * as React from "react"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"

interface ChartProps {
  data: Array<{
    month: string
    revenue: number
  }>
  className?: string
}

export function RevenueChart({ data, className }: ChartProps) {
  const maxRevenue = Math.max(...data.map(d => d.revenue))
  const minRevenue = Math.min(...data.map(d => d.revenue))
  const range = maxRevenue - minRevenue
  const growth = ((data[data.length - 1]?.revenue || 0) - (data[data.length - 2]?.revenue || 0)) / (data[data.length - 2]?.revenue || 1) * 100

  // Créer une courbe sinusoïdale fluide
  const createSmoothPath = (points: Array<{x: number, y: number}>) => {
    if (points.length < 2) return ""
    
    let path = `M ${points[0].x} ${points[0].y}`
    
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1]
      const curr = points[i]
      const next = points[i + 1]
      
      if (next) {
        // Courbe de Bézier cubique pour une transition fluide
        const cp1x = prev.x + (curr.x - prev.x) / 3
        const cp1y = prev.y
        const cp2x = curr.x - (next.x - curr.x) / 3
        const cp2y = curr.y
        
        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`
      } else {
        // Dernier point avec une courbe douce
        const cp1x = prev.x + (curr.x - prev.x) / 2
        const cp1y = prev.y
        path += ` Q ${cp1x} ${cp1y}, ${curr.x} ${curr.y}`
      }
    }
    
    return path
  }

  // Calculer les points pour la courbe
  const curvePoints = data.map((d, i) => {
    const x = 80 + (i / (data.length - 1)) * 640
    const y = 260 - ((d.revenue - minRevenue) / range) * 200
    return { x, y, revenue: d.revenue }
  })

  // Créer la zone sous la courbe
  const areaPath = createSmoothPath(curvePoints) + 
    ` L ${curvePoints[curvePoints.length - 1].x} 260 L ${curvePoints[0].x} 260 Z`

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-sidebar-primary flex items-center justify-center shadow-lg">
            <Activity className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-sidebar-foreground">Évolution des Revenus</h3>
            <p className="text-sm text-muted-foreground">Performance financière mensuelle</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-2xl font-bold text-sidebar-foreground">
              €{data[data.length - 1]?.revenue.toLocaleString() || '0'}
            </div>
            <div className="text-sm text-muted-foreground">Dernier mois</div>
          </div>
          <div className={`flex items-center px-3 py-1 rounded-full ${growth >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {growth >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
            <span className="text-sm font-medium">{growth >= 0 ? '+' : ''}{growth.toFixed(1)}%</span>
          </div>
        </div>
      </div>
      
      <div className="relative h-96 w-full bg-gradient-to-br from-sidebar-accent/20 to-transparent rounded-xl p-6 overflow-hidden">
        {/* Grille de fond animée */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 800 300">
            <defs>
              <pattern id="animatedGrid" width="40" height="20" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1"/>
              </pattern>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="oklch(0.7 0.15 240)" stopOpacity="0.4"/>
                <stop offset="50%" stopColor="oklch(0.6 0.2 260)" stopOpacity="0.2"/>
                <stop offset="100%" stopColor="oklch(0.5 0.25 280)" stopOpacity="0.05"/>
              </linearGradient>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="oklch(0.7 0.15 240)"/>
                <stop offset="50%" stopColor="oklch(0.6 0.2 260)"/>
                <stop offset="100%" stopColor="oklch(0.5 0.25 280)"/>
              </linearGradient>
            </defs>
            
            <rect width="100%" height="100%" fill="url(#animatedGrid)" />
            
            {/* Axes subtils */}
            <line x1="60" y1="40" x2="60" y2="260" stroke="currentColor" strokeWidth="1" opacity="0.15"/>
            <line x1="60" y1="260" x2="740" y2="260" stroke="currentColor" strokeWidth="1" opacity="0.15"/>
            
            {/* Lignes de grille horizontales */}
            {[0, 25, 50, 75, 100].map((percent, i) => {
              const y = 40 + (percent / 100) * 220
              return (
                <line
                  key={i}
                  x1="60"
                  y1={y}
                  x2="740"
                  y2={y}
                  stroke="currentColor"
                  strokeWidth="0.5"
                  opacity="0.08"
                />
              )
            })}
          </svg>
        </div>

        {/* Graphique principal */}
        <svg className="h-full w-full relative z-10" viewBox="0 0 800 300">
          {/* Zone sous la courbe avec gradient */}
          <path
            d={areaPath}
            fill="url(#areaGradient)"
            className="animate-pulse"
            style={{ animationDuration: '3s' }}
          />
          
          {/* Courbe sinusoïdale principale */}
          <path
            d={createSmoothPath(curvePoints)}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-lg"
          />
          
          {/* Courbe de brillance (effet de lumière) */}
          <path
            d={createSmoothPath(curvePoints)}
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.6"
            className="blur-sm"
          />
          
          {/* Points interactifs avec animation */}
          {curvePoints.map((point, i) => (
            <g key={i}>
              {/* Cercle externe animé */}
              <circle
                cx={point.x}
                cy={point.y}
                r="8"
                fill="oklch(0.7 0.15 240)"
                opacity="0.2"
                className="animate-ping"
                style={{ animationDuration: '2s', animationDelay: `${i * 0.2}s` }}
              />
              
              {/* Cercle principal */}
              <circle
                cx={point.x}
                cy={point.y}
                r="6"
                fill="oklch(0.7 0.15 240)"
                stroke="white"
                strokeWidth="3"
                className="hover:r-8 transition-all duration-300 cursor-pointer"
              />
              
              {/* Valeur au-dessus du point */}
              <text
                x={point.x}
                y={point.y - 15}
                textAnchor="middle"
                className="text-xs font-bold fill-sidebar-foreground"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
              >
                €{(point.revenue / 1000).toFixed(0)}k
              </text>
              
              {/* Label du mois */}
              <text
                x={point.x}
                y="280"
                textAnchor="middle"
                className="text-xs font-medium fill-muted-foreground"
              >
                {new Date(data[i].month + '-01').toLocaleDateString('fr-FR', { month: 'short' })}
              </text>
            </g>
          ))}
        </svg>
        
        {/* Effet de particules flottantes */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-sidebar-primary rounded-full opacity-20 animate-bounce"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: '3s'
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Statistiques avec design amélioré */}
      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="text-center p-6 bg-gradient-to-br from-sidebar-accent/60 to-sidebar-accent/30 rounded-xl border border-sidebar-border/50 hover:shadow-lg transition-all duration-300">
          <div className="text-3xl font-bold text-sidebar-foreground mb-1">
            €{Math.round(data.reduce((sum, d) => sum + d.revenue, 0) / data.length).toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground font-medium">Moyenne mensuelle</div>
        </div>
        <div className="text-center p-6 bg-gradient-to-br from-sidebar-accent/60 to-sidebar-accent/30 rounded-xl border border-sidebar-border/50 hover:shadow-lg transition-all duration-300">
          <div className="text-3xl font-bold text-sidebar-foreground mb-1">
            €{maxRevenue.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground font-medium">Meilleur mois</div>
        </div>
        <div className="text-center p-6 bg-gradient-to-br from-sidebar-accent/60 to-sidebar-accent/30 rounded-xl border border-sidebar-border/50 hover:shadow-lg transition-all duration-300">
          <div className="text-3xl font-bold text-sidebar-foreground mb-1">
            €{data.reduce((sum, d) => sum + d.revenue, 0).toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground font-medium">Total période</div>
        </div>
      </div>
    </div>
  )
}
