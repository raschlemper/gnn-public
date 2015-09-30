DROP TABLE "DBA"."vision";
CREATE TABLE "DBA"."vision" (
	"id" INTEGER NOT NULL DEFAULT AUTOINCREMENT,
	"cd_hash" LONG VARCHAR NULL NOT NULL,
	"model" LONG VARCHAR NULL NOT NULL,
	"cd_modulo" INTEGER NOT NULL,
	PRIMARY KEY ( "id" ASC )
) IN "system";


DROP TABLE "DBA"."vision_template";
CREATE TABLE "DBA"."vision_template" (
	"id" INTEGER NOT NULL DEFAULT AUTOINCREMENT,
	"model" LONG VARCHAR NULL NOT NULL,
	PRIMARY KEY ( "id" ASC )
) IN "system";

DROP TABLE "DBA"."vision_campo";
CREATE TABLE "DBA"."vision_campo" (
	"id" INTEGER NOT NULL DEFAULT AUTOINCREMENT,
	"model" LONG VARCHAR NULL NOT NULL,
	PRIMARY KEY ( "id" ASC )
) IN "system";

DROP TABLE "DBA"."vision_modulo";
CREATE TABLE "DBA"."vision_modulo" (
	"id" INTEGER NOT NULL DEFAULT AUTOINCREMENT,
	"nm_modulo" LONG VARCHAR NULL NOT NULL,
	"ds_modulo" LONG VARCHAR NULL NOT NULL,
	"hashid" LONG VARCHAR NULL NOT NULL,
	PRIMARY KEY ( "id" ASC )
) IN "system";


DROP TABLE "DBA"."vision_datasource";
create table vision_datasource
(
  id_vision_datasource        integer       not null default autoincrement,
  cd_hash                     varchar(100)  not null,
  nm_datasource               varchar(100)  not null,
  nm_description              varchar(100)  not null,
  nm_url                      varchar(500)  null,
  nm_method                   varchar(100)  null,
  nm_format                   varchar(100)  null,
  ds_header                   long varchar  not null,
  ds_converter                long varchar  not null,
  ds_parameter                long varchar  not null,
  cd_modulo        			  integer       not null,
  constraint PK_VISION_DATASOURCE primary key (id_vision_datasource)
);

ALTER TABLE "DBA"."vision_datasource" ADD CONSTRAINT "fk_visiondatasource_visionmodulo" 
FOREIGN KEY ( "cd_modulo" ASC ) REFERENCES "DBA"."vision_modulo" ( "id" );

ALTER TABLE "DBA"."vision" ADD CONSTRAINT "fk_vision_visionmodulo" 
FOREIGN KEY ( "cd_modulo" ASC ) REFERENCES "DBA"."vision_modulo" ( "id" );
