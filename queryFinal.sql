select * from Provincias

SELECT * FROM Cantones where idProvincia = 1

SELECT * FROM Sexos

SELECT * FROM GruposEdad

select * from Tumores order by nombreTumor

select * from Poblacion_X_Edad_Sexo_Ano

select * from Tumores_X_GruposEdad

select * from Tumores_X_Cantones

--insert GruposEdad values ('Desconocido')
delete from Tumores where idTumor >= 70