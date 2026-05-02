import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import type { AcidentePorMes } from '../services/api'
import { tooltipStyle, axisProps, gridProps } from './ChartTooltip'

export default function GraficoLinha({ dados }: { dados: AcidentePorMes[] }) {
  const data = dados.map(d => ({
    ...d,
    mes: new Date(d.mes).toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' })
  }))
  const showDot = data.length <= 1

  return (
    <div className="card">
      <p className="card-title">Evolução Mensal</p>
      {data.length === 0 && <p style={{ color: '#ef4444', padding: 10 }}>⚠️ Nenhum dado disponível para o período</p>}
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid {...gridProps} vertical={false} />
          <XAxis dataKey="mes" {...axisProps} />
          <YAxis {...axisProps} />
          <Tooltip {...tooltipStyle} />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, color: '#a8bdd4' }} />
          <Line type="monotone" dataKey="total" name="Acidentes" stroke="#3b8ef0" dot={showDot} strokeWidth={2.5} />
          <Line type="monotone" dataKey="mortos" name="Mortos" stroke="#ef4444" dot={showDot} strokeWidth={2.5} strokeDasharray="4 2" />
        </LineChart>
      </ResponsiveContainer>
      <p style={{ fontSize: 11, color: '#7a8fa3', textAlign: 'center', marginTop: 5 }}>{data.length} ponto(s)</p>
    </div>
  )
}