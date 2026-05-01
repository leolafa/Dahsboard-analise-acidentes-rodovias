import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

export interface Resumo {
  total_acidentes: number
  total_mortos: number
  total_feridos: number
  total_veiculos: number
}

export interface AcidentePorMes {
  mes: string
  ano: number
  total: number
  mortos: number
}

export interface AcidentePorUF {
  uf: string
  total: number
  mortos: number
}

export interface Causa {
  causa_acidente: string
  total: number
  mortos: number
}

export interface FaseDia {
  fase_dia: string
  total: number
  mortos: number
}

export interface TipoAcidente {
  tipo_acidente: string
  total: number
  mortos: number
}

export const getResumo      = (ano?: string) => api.get<Resumo>('/resumo/', { params: { ano } }).then(r => r.data)
export const getPorMes      = (ano?: string) => api.get<AcidentePorMes[]>('/por-mes/', { params: { ano } }).then(r => r.data)
export const getPorUF       = (ano?: string) => api.get<AcidentePorUF[]>('/por-uf/', { params: { ano } }).then(r => r.data)
export const getCausas      = (ano?: string) => api.get<Causa[]>('/causas/', { params: { ano } }).then(r => r.data)
export const getPorFaseDia  = (ano?: string) => api.get<FaseDia[]>('/por-fase-dia/', { params: { ano } }).then(r => r.data)
export const getPorTipo     = (ano?: string) => api.get<TipoAcidente[]>('/por-tipo/', { params: { ano } }).then(r => r.data)