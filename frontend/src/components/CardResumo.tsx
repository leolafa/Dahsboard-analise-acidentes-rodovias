import type { Resumo } from '../services/api'

interface Props {
  dados: Resumo
}

export default function CardResumo({ dados }: Props) {
  const cards: { key: keyof Resumo; label: string; cor: string }[] = [
    { key: 'total_acidentes', label: 'Total de Acidentes', cor: '#3b82f6' },
    { key: 'total_mortos', label: 'Total de Mortos', cor: '#e84040' },
    { key: 'total_feridos', label: 'Total de Feridos', cor: '#f59e0b' },
    { key: 'total_veiculos', label: 'Total de Veículos', cor: '#22c55e' },
  ]

  return (
    <div className="card">
      {cards.map(c => (
        <div
          key={c.key}
          className="card-resumo"
          style={{ '--accent-cor': c.cor, '--accent-dim': c.dim } as React.CSSProperties}
        >
          <p className="card-label">{c.label}</p>
          <p className="card-valor">{((dados[c.key] ?? 0) as number).toLocaleString('pt-BR')}</p>
        </div>
      ))}
    </div>
  )
}