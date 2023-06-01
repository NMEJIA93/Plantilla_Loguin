use Plantilla_Loguin
-- Creacion Tabla Empresa --

CREATE TABLE loguin(
	nombre varchar(50) NOT NULL,
	usuario varchar(20) NOT NULL,
	pass varchar(100) NOT NULL,
	CONSTRAINT PK_idEmpresa PRIMARY KEY (usuario))

select * from loguin
