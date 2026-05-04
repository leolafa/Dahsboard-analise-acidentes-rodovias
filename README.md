# 🚦 Dashboard de Acidentes Rodoviários — Rodovias Federais

Dashboard analítico interativo para visualização de dados de acidentes em rodovias federais brasileiras, com base nos dados abertos da **Polícia Rodoviária Federal (PRF)** disponibilizados pelo **DATATRAN**.

---

## Por que esta análise importa

Os acidentes em rodovias federais representam um dos maiores problemas de saúde pública e segurança viária do Brasil. Segundo dados históricos da PRF, dezenas de milhares de pessoas morrem ou ficam gravemente feridas todos os anos nas estradas federais do país — um cenário que demanda acompanhamento contínuo, análise de padrões e identificação de gargalos para embasar políticas públicas eficazes.

Este projeto foi construído para transformar os dados brutos do DATATRAN em informação visual acessível, permitindo que qualquer pessoa — pesquisador, gestor público, jornalista ou cidadão — consiga responder perguntas como:

- Em quais estados ocorrem mais acidentes e mais mortes?
- Quais são as principais causas de acidentes nas rodovias federais?
- Os acidentes aumentam ou diminuem ao longo dos meses?
- Em que período do dia a maioria dos acidentes acontece?
- Quais tipos de acidente são mais frequentes?

A ferramenta cobre os anos de **2023, 2024 e 2025**, com filtro por ano e visualização consolidada de todos os períodos.

---

## Tecnologias utilizadas

**Backend** — Python 3 com Django e Django REST Framework, banco de dados SQLite, pandas para leitura e limpeza dos CSVs do DATATRAN.

**Frontend** — React 19 com TypeScript, Vite como bundler, Recharts para os gráficos, Axios para comunicação com a API, fontes Barlow Condensed e IBM Plex Mono.

---

## Estrutura do projeto

```
├── api/                        # App Django (modelos, views, serializers, URLs)
│   ├── management/commands/
│   │   └── import_data.py      # Comando para importar os CSVs para o banco
│   ├── models.py               # Model Acidente
│   ├── serializers.py
│   ├── views.py                # Endpoints REST com filtros de ano e UF
│   └── urls.py
├── config/                     # Configurações do projeto Django
│   ├── settings.py
│   └── urls.py
├── data/                       # Pasta onde os arquivos CSV devem ser colocados
│   ├── datatran2023.csv
│   ├── datatran2024.csv
│   └── datatran2025.csv
└── frontend/                   # Aplicação React
    └── src/
        ├── components/         # Gráficos e cards
        ├── services/api.ts     # Comunicação com o backend
        └── App.tsx
```

---

## Como rodar o projeto

### Pré-requisitos

- Python 3.10 ou superior
- Node.js 20 ou superior
- pip e npm instalados

---

### 1. Obter os dados

Acesse o portal de dados abertos da PRF e baixe os arquivos CSV do DATATRAN para os anos desejados:

[https://www.gov.br/prf/pt-br/acesso-a-informacao/dados-abertos/dados-abertos-da-prf](https://www.gov.br/prf/pt-br/acesso-a-informacao/dados-abertos/dados-abertos-da-prf)

Coloque os arquivos baixados dentro da pasta `data/` na raiz do projeto, com os seguintes nomes:

```
data/datatran2023.csv
data/datatran2024.csv
data/datatran2025.csv
```

---

### 2. Configurar o backend

Na raiz do projeto, crie e ative um ambiente virtual:

```bash
python -m venv venv

# Linux / macOS
source venv/bin/activate

# Windows
venv\Scripts\activate
```

Instale as dependências:

```bash
pip install django djangorestframework django-cors-headers pandas
```

Execute as migrações para criar o banco de dados:

```bash
python manage.py migrate
```

Importe os dados dos CSVs para o banco:

```bash
python manage.py import_data
```

> Este processo pode levar alguns minutos dependendo do volume de registros. O comando ignora automaticamente registros já importados, então pode ser executado novamente sem duplicação.

Inicie o servidor Django:

```bash
python manage.py runserver
```

O backend estará disponível em `http://localhost:8000`.

---

### 3. Configurar o frontend

Em outro terminal, entre na pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O dashboard estará disponível em `http://localhost:5173`.

> O Vite está configurado com proxy reverso para o Django, portanto as chamadas à API (`/api/*`) são redirecionadas automaticamente para `http://localhost:8000` — não é necessária nenhuma configuração adicional de CORS para o ambiente de desenvolvimento.

---

## Endpoints da API

Todos os endpoints aceitam os parâmetros opcionais `ano` e `uf` como query string.

| Endpoint | Descrição |
|---|---|
| `GET /api/resumo/` | Totais consolidados de acidentes, mortos, feridos e veículos |
| `GET /api/por-mes/` | Série temporal mensal de acidentes e mortes |
| `GET /api/por-uf/` | Ranking de UFs por volume de acidentes |
| `GET /api/causas/` | Top 10 causas mais frequentes |
| `GET /api/por-fase-dia/` | Distribuição por período do dia |
| `GET /api/por-tipo/` | Top 10 tipos de acidente |

**Exemplo de uso com filtro:**

```
GET /api/resumo/?ano=2024
GET /api/por-uf/?ano=2023
```

---

## Gráficos disponíveis no dashboard

- **Cards de resumo** — total de acidentes, mortos, feridos e veículos envolvidos
- **Evolução mensal** — gráfico de linha com séries de acidentes e mortes por mês
- **Acidentes por UF** — gráfico de barras com os 15 estados com mais ocorrências
- **Fase do dia** — gráfico de pizza com distribuição por período (pleno dia, noite, amanhecer, anoitecer)
- **Top 10 causas** — gráfico de barras horizontais com as causas mais frequentes
- **Top 10 tipos de acidente** — gráfico de barras horizontais com os tipos mais comuns
- **Ranking por UF** — painel duplo com top 5 em acidentes e top 5 em mortes

---

## Observações

Os dados do DATATRAN são disponibilizados com separador `;` e encoding `latin-1`. O comando de importação já realiza a normalização das coordenadas geográficas (substituição de vírgula por ponto), conversão de datas e horários, e tratamento de valores nulos, garantindo a integridade dos registros no banco.

Para o ano de 2025, os dados refletem apenas o período já publicado pela PRF até o momento do download.
