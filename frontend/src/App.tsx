import { useState, useEffect } from 'react'
import {
  getResumo, getPorMes, getPorUF,
  getCausas, getPorFaseDia, getPorTipo,
  type Resumo, type AcidentePorMes, type AcidentePorUF,
  type Causa, type FaseDia, type TipoAcidente
} from './services/api'
import CardResumo from './components/CardResumo'
import GraficoLinha from './components/GraficoLinha'
import GraficoBarra from './components/GraficoBarraUf'
import GraficoPizza from './components/GraficoPizza'
import GraficoCausas from './components/GraficoCausas'
import GraficoTipos from './components/GraficoTipos'
import GraficoRankingUF from './components/GraficoRankingUf'
import iconPRF from './assets/iconPRF.png'



export default function App() {
  // Estados para armazenar os dados e o ano selecionado
  const [ano, setAno] = useState<string>('')
  const [resumo, setResumo] = useState<Resumo | null>(null)
  const [porMes, setPorMes] = useState<AcidentePorMes[]>([])
  const [porUF, setPorUF] = useState<AcidentePorUF[]>([])
  const [causas, setCausas] = useState<Causa[]>([])
  const [faseDia, setFaseDia] = useState<FaseDia[]>([])
  const [tipos, setTipos] = useState<TipoAcidente[]>([])

  useEffect(() => {
    const a = ano || undefined
    getResumo(a).then(setResumo)
    getPorMes(a).then(setPorMes)
    getPorUF(a).then(setPorUF)
    getCausas(a).then(setCausas)
    getPorFaseDia(a).then(setFaseDia)
    getPorTipo(a).then(setTipos)
    
  }, [ano])

  return (
    <div className="app">
        <header className="header">
          <div className="header-left">
            <img src={iconPRF} alt="PRF" className="logo-badge" />
            <div>
              <h1>Dashboard de Acidentes Rodoviários</h1>
              <p className="header-sub">RODOVIAS FEDERAIS · DATATRAN</p>
            </div>
          </div>
          <div className="header-right">
            <span className="filtro-label">ANO</span>
            <select value={ano} onChange={e => setAno(e.target.value)} className="filtro-ano">
              <option value="">Todos</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </div>
        </header>

      <main className="main">
       

      
        <div className="grid-sidebar">
          <div className="sidebar">
            {resumo && <CardResumo dados={resumo} />}
            <GraficoPizza dados={faseDia} />
          </div>
          <div className="sidebar">
            <GraficoLinha dados={porMes} />
            <GraficoBarra dados={porUF.slice(0, 15)} />
          </div>
        </div>

        <div className="grid-2">
          <GraficoCausas dados={causas} />
          <GraficoTipos dados={tipos} />
        </div>

        <GraficoRankingUF dados={porUF} />
      </main>


    </div>
  )


}