import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts'
import type { AcidentePorUF } from '../services/api'
import { tooltipStyle, axisProps, gridProps } from './ChartTooltip'

export default function GraficoBarrasUF({ dados }: { dados: AcidentePorUF[] }) {
  return (
    <div className="card">
      <p className="card-title">Acidentes por UF</p>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={dados} barSize={14}>
          <CartesianGrid {...gridProps} vertical={false} />
          <XAxis dataKey="uf" {...axisProps} />
          <YAxis {...axisProps} />
          <Tooltip {...tooltipStyle} />
          <Bar dataKey="total" name="Acidentes" radius={[4,4,0,0]}>
            {dados.map((_, i) => <Cell key={i} fill={i < 3 ? '#3b8ef0' : '#1e4570'} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}