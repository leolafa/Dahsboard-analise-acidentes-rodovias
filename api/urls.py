from django.urls import path
from . import views

urlpatterns = [
    path('resumo/',           views.resumo),
    path('por-mes/',         views.acidentes_por_mes),
    path('por-uf/',          views.acidentes_por_uf),
    path('causas/',          views.causas_principais),
    path('por-fase-dia/',    views.acidentes_fase_dia),
    path('por-tipo/',        views.acidentes_tipos),
]