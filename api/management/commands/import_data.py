import pandas as pd
from django.core.management.base import BaseCommand
from api.models import Acidente

Arquivos=[
    ('2023','data/datatran2023.csv'),
    ('2024','data/datatran2024.csv'),
    ('2025','data/datatran2025.csv')
]

def limpar_df(df, ano):
    # Limpeza e formatação dos dados
    for col in ['latitude', 'longitude']:
        df[col] = df[col].astype(str).str.replace(',', '.', regex=False)
        df[col] = pd.to_numeric(df[col], errors='coerce')

    df['data_inversa'] = pd.to_datetime(df['data_inversa'], errors='coerce')
    df['horario'] = pd.to_datetime(df['horario'], format='%H:%M:%S', errors='coerce').dt.time
    df['ano'] = int(ano)
    return df


def row_para_objeto(row):
    # Função para converter uma linha do DataFrame em um objeto Acidente
    def intval(v): return int(v) if pd.notna(v) else 0
    def strval(v): return str(v) if pd.notna(v) else ''
    
    return Acidente(
        id_prf=row['id'], data=row['data_inversa'], dia_semana=row['dia_semana'],
        horario=row['horario'], ano=row['ano'], uf=row['uf'], br=strval(row['br']),
        km=strval(row['km']), municipio=row['municipio'],
        latitude=row['latitude'] if pd.notna(row['latitude']) else None,
        longitude=row['longitude'] if pd.notna(row['longitude']) else None,
        regional=strval(row['regional']), delegacia=strval(row['delegacia']),
        uop=strval(row['uop']), causa_acidente=row['causa_acidente'],
        tipo_acidente=row['tipo_acidente'],
        classificacao_acidente=strval(row['classificacao_acidente']),
        fase_dia=row['fase_dia'], sentido_via=strval(row['sentido_via']),
        condicao_metereologica=strval(row['condicao_metereologica']),
        tipo_pista=strval(row['tipo_pista']), tracado_via=strval(row['tracado_via']),
        uso_solo=strval(row['uso_solo']), pessoas=intval(row['pessoas']),
        mortos=intval(row['mortos']), feridos_leves=intval(row['feridos_leves']),
        feridos_graves=intval(row['feridos_graves']), ilesos=intval(row['ilesos']),
        ignorados=intval(row['ignorados']), feridos=intval(row['feridos']),
        veiculos=intval(row['veiculos']),
    )
    
class Command(BaseCommand):
    help='Importa dados de acidentes de trânsito a partir de arquivos CSV'
    
    def handle(self, *args, **kwargs):
        ids_existentes= set(Acidente.objects.values_list('id_prf', flat=True))
        
        for ano, caminho in Arquivos:
            self.stdout.write(f'Importando {ano}')
            df= pd.read_csv(caminho, sep=';', encoding='latin-1', low_memory=False)
            df = limpar_df(df, ano)
            
            # Criar objetos Acidente para as linhas que ainda não existem no banco de dados
            objetos= [
                row_para_objeto(row)
                for _, row in df.iterrows()
                if row['id'] not in ids_existentes
                ]    
            
            Acidente.objects.bulk_create(objetos, batch_size=1000)
            self.stdout.write(self.style.SUCCESS(f'  {ano}: {len(objetos)} registros importados.'))
        
        self.stdout.write(self.style.SUCCESS('Importação concluída.'))    