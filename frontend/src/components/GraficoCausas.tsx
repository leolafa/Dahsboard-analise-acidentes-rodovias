import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { Causa } from '../services/api'
import { tooltipStyle, axisProps, gridProps } from './ChartTooltip'

const truncar = (s: string, n = 28) => s.length > n ? s.slice(0, n) + '…' : s

export default function GraficoCausas({ dados }: { dados: Causa[] }) {
  const data = dados.map(d => ({ ...d, causa_acidente: truncar(d.causa_acidente) }))

  return (
    <div className="card">
      <p className="card-title">Top 10 Causas</p>
      <ResponsiveContainer width="100%" height={290}>
        <BarChart data={data} layout="vertical" barSize={12}>
          <CartesianGrid {...gridProps} horizontal={false} />
          <XAxis type="number" {...axisProps} />
          <YAxis dataKey="causa_acidente" type="category" {...axisProps} tick={{ fill: '#7a8fa8', fontSize: 10 }} width={150} />
          <Tooltip {...tooltipStyle} />
          <Bar dataKey="total" name="Acidentes" fill="#f59e0b" radius={[0,4,4,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}