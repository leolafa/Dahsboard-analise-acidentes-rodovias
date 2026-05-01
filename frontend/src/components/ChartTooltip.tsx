export const tooltipStyle = {
  contentStyle: {
    background: '#111c2e',
    border: '1px solid #243450',
    borderRadius: 8,
    fontSize: 12,
  },
  labelStyle: { color: '#a8bdd4', fontWeight: 600 },
  itemStyle: { color: '#e8eff8' },
}

export const axisProps = {
  tick: { fill: '#6b85a0', fontSize: 11 },
  axisLine: false as const,
  tickLine: false as const,
}

export const gridProps = {
  strokeDasharray: '3 3',
  stroke: '#1e2d45',
}