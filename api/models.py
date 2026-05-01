from django.db import models

class Acidente(models.Model):
    #Identificação
    id_prf= models.IntegerField(unique=True)
    data = models.DateField()
    dia_semana = models.CharField(max_length=20)
    horario= models.TimeField(null=True, blank=True)
    ano = models.IntegerField()
    
    #Localização
    uf = models.CharField(max_length=2)
    br= models.CharField(max_length=10)
    km= models.CharField(max_length=10)
    municipio = models.CharField(max_length=100)
    latitude= models.FloatField(null=True, blank=True)
    longitude= models.FloatField(null=True, blank=True)
    regional = models.CharField(max_length=20, blank=True)
    delegacia = models.CharField(max_length=30, blank=True)
    uop = models.CharField(max_length=40, blank=True)
    
    #Características do acidente
    causa_acidente= models.CharField(max_length=200)
    tipo_acidente          = models.CharField(max_length=100)
    classificacao_acidente = models.CharField(max_length=50, blank=True)
    fase_dia               = models.CharField(max_length=30)
    sentido_via            = models.CharField(max_length=30, blank=True)
    condicao_metereologica = models.CharField(max_length=50, blank=True)
    tipo_pista             = models.CharField(max_length=30, blank=True)
    tracado_via            = models.CharField(max_length=100, blank=True)
    uso_solo               = models.CharField(max_length=10, blank=True)

    # Vítimas e veículos
    pessoas        = models.IntegerField(default=0)
    mortos         = models.IntegerField(default=0)
    feridos_leves  = models.IntegerField(default=0)
    feridos_graves = models.IntegerField(default=0)
    ilesos         = models.IntegerField(default=0)
    ignorados      = models.IntegerField(default=0)
    feridos        = models.IntegerField(default=0)
    veiculos       = models.IntegerField(default=0)

    class Meta:
        ordering = ['-data']

    # Representação em string para facilitar a leitura
    def __str__(self):
        return f"{self.id_prf} | {self.data} | {self.uf} | {self.causa_acidente}"