select * from Provincias

SELECT * FROM Cantones where idProvincia = 7

SELECT * FROM Sexos

SELECT * FROM GruposEdad

select * from Tumores order by nombreTumor

select * from Poblacion_X_Edad_Sexo_Ano

select * from Tumores_X_GruposEdad

select * from Tumores_X_Cantones

--insert GruposEdad values ('Desconocido')
delete from Tumores where idTumor >= 70

select T.nombreTumor, TG.year, TG.idSexo, SUM(TG.cantidad) 'Total'
from Tumores T inner join Tumores_X_GruposEdad TG on T.idTumor = TG.idTumor
where T.idTumor = 48
group by T.nombreTumor, TG.year, TG.idSexo
order by TG.year

select TOP(10) T.nombreTumor, TC.cantidad from 
Tumores T inner join Tumores_X_Cantones TC on T.idTumor = TC.idTumor
where TC.idCanton = 1 AND TC.idSexo = 2 AND TC.year = 2009
order by cantidad DESC

select G.grupoEdad, idSexo, TG.cantidad from 
GruposEdad G inner join Tumores_X_GruposEdad TG on G.idGrupoEdad = TG.idGrupoEdad
where TG.year = 2009 AND TG.idTumor = 38

