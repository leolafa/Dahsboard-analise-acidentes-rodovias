from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Sum, Count
from django.db.models.functions import TruncMonth
from .models import Acidente 

#definir funções para cada endpoint, aplicando filtros de ano e uf quando fornecidos

def filtrar_queryset(request):
    # aplica filtros de ano e uf se fornecidos
    
    qs= Acidente.objects.all()
    ano= request.GET.get('ano')
    uf= request.GET.get('uf')
    
    if ano:
        qs= qs.filter(ano=ano)
    if uf:
        qs= qs.filter(uf=uf)
    return qs

@api_view(['GET'])
def resumo(request):
    #resumo geral dos acidentes- número total, mortos, feridos
    qs= filtrar_queryset(request)
    data = qs.aggregate(
        total_acidentes=Count('id'),
        total_mortos=Sum('mortos'),
        total_feridos=Sum('feridos'),
        total_veiculos=Sum('veiculos'),
    )
    return Response(data)



@api_view(['GET']) 

def acidentes_por_mes(request):
    #acidentes por mês- gráfico de linha
    qs= filtrar_queryset(request)
    data=(
        qs.annotate(mes=TruncMonth('data'))
        .values('mes','ano')
        .annotate(total=Count('id'), mortos=Sum('mortos'), feridos=Sum('feridos'))
        .order_by('mes')
    )
    return Response(list(data))



@api_view(['GET'])
def acidentes_por_uf(request):
    #ranjing de uf por número de acidentes- grafico de barras
    qs= filtrar_queryset(request)
    data=(
        qs.values('uf')
        .annotate(total=Count('id'), mortos=Sum('mortos'), feridos=Sum('feridos'))
        .order_by('-total')
    )       
    return Response(list(data))

@api_view(['GET'])

def causas_principais(request):
    #ranking de causas mais frequentes e letais
    qs= filtrar_queryset(request)
    data=(
        qs.values('causa_acidente')
        .annotate(total=Count('id'), mortos=Sum('mortos'), feridos=Sum('feridos'))
        .order_by('-total')[:10]
    )
    return Response(list(data))

@api_view(['GET'])
def acidentes_fase_dia(request):
    #acidentes por periodo do dia- grafico de pizza
    qs= filtrar_queryset(request)
    data=(
        qs.values('fase_dia')
        .annotate(total=Count('id'), mortos=Sum('mortos'), feridos=Sum('feridos'))
        .order_by('-total')
    )
    return Response(list(data))

@api_view(['GET'])
def acidentes_tipos(request):
    #top tipo de acidentes
    qs= filtrar_queryset(request)
    data=(
        qs.values('tipo_acidente')
        .annotate(total=Count('id'), mortos=Sum('mortos'), feridos=Sum('feridos'))
        .order_by('-total')[:10]
    )
    return Response(list(data))