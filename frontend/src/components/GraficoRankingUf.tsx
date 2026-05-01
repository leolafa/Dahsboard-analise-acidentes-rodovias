import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import type { AcidentePorUF } from '../services/api'
import { tooltipStyle, axisProps, gridProps } from './ChartTooltip'

export default function GraficoRankingUF({ dados }: { dados: AcidentePorUF[] }) {
  const top5A = [...dados].sort((a, b) => b.total  - a.total ).slice(0, 5)
  const top5M = [...dados].sort((a, b) => b.mortos - a.mortos).slice(0, 5)

  const yAxis = { ...axisProps, tick: { fill: '#7a8fa8', fontSize: 12, fontWeight: 600 }, width: 28 }

  return (
    <div className="card">
      <p className="card-title">Ranking por UF</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
        <div>
          <p style={{ fontSize: 11, color: '#3b8ef0', marginBottom: 12, fontFamily: 'monospace' }}>TOP 5 — ACIDENTES</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={top5A} layout="vertical" barSize={14}>
              <CartesianGrid {...gridProps} horizontal={false} />
              <XAxis type="number" {...axisProps} />
              <YAxis dataKey="uf" type="category" {...yAxis} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="total" name="Acidentes" radius={[0,4,4,0]}>
                {top5A.map((_, i) => <Cell key={i} fill={i === 0 ? '#3b8ef0' : '#1e4d82'} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <p style={{ fontSize: 11, color: '#ef4444', marginBottom: 12, fontFamily: 'monospace' }}>TOP 5 — MORTES</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={top5M} layout="vertical" barSize={14}>
              <CartesianGrid {...gridProps} horizontal={false} />
              <XAxis type="number" {...axisProps} />
              <YAxis dataKey="uf" type="category" {...yAxis} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="mortos" name="Mortos" radius={[0,4,4,0]}>
                {top5M.map((_, i) => <Cell key={i} fill={i === 0 ? '#ef4444' : '#7a2020'} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}