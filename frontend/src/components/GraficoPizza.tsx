import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import type { FaseDia } from '../services/api'
import { tooltipStyle } from './ChartTooltip'

interface Props{
    // O array de dados para o gráfico, que deve ser do tipo FaseDia
    dados: FaseDia[]
}

// Cores para as fatias do gráfico de pizza, que serão usadas dpara cada fase do dia
const cores= ['#3b8ef0', '#f59e0b', '#ef4444', '#10b981']

// Componente para renderizar um gráfico de pizza usando a biblioteca Recharts
export default function GraficoPizza({dados}:Props){
    const total = dados.reduce((sum, d) => sum + d.total, 0)
    
    return(
        <div className="card">
            <p className="card-title">Acidentes por Fase do Dia</p>
            <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                    <Pie data={dados} dataKey="total" nameKey="fase_dia" cx="50%" cy="50%" outerRadius={90} label>
                        {dados.map((_,i)=>(
                            <Cell key={`cell-${i}`} fill={cores[i % cores.length]} />
                        ))}
                    </Pie>
                    <Tooltip {...tooltipStyle} />
                    <Legend wrapperStyle={{ fontSize: 12, color: '#a8bdd4' }} />
                </PieChart>
            </ResponsiveContainer>

            <div style={{display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8}}>
                {dados.map((d,i) => (
                    <div key={d.fase_dia} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{width:8, height:8, borderRadius:2, backgroundColor: cores[i % cores.length], display:'inline-block'}}></span>
                            <span style={{ color: '#7a8fa8' }}>{d.fase_dia}</span>
                        </span>
                        <span style={{color:'#e8eff8', fontFamily: 'monospace', fontSize: 11}}>{((d.total / total) * 100).toFixed(1)}%</span>
                    </div>
                ))}
            </div>
        </div>
    )
}