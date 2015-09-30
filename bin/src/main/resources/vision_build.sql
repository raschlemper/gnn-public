DROP TABLE "DBA"."vision";
CREATE TABLE "DBA"."vision" (
	"id" INTEGER NOT NULL DEFAULT AUTOINCREMENT,
	"nm_vision" VARCHAR(255) NOT NULL,
	"ds_vision" LONG VARCHAR NULL,
	"id_hash" VARCHAR(255) NOT NULL,
	"id_layout" INTEGER NOT NULL,
	"dt_criacao" "datetime" NOT NULL,
	"dt_atualizacao" "datetime" NOT NULL,
	PRIMARY KEY ( "id" ASC )
) IN "system";

DROP TABLE "DBA"."vision_layout";
CREATE TABLE "DBA"."vision_layout" (
	"id" INTEGER NOT NULL DEFAULT AUTOINCREMENT,
	"nm_layout" VARCHAR(255) NOT NULL,
--	"nr_ordem" INTEGER NOT NULL,
	"ds_layout" LONG VARCHAR NULL,
	"vl_linha_altura" INTEGER NOT NULL,
	"vl_linha_altura_preview" INTEGER NOT NULL,
	PRIMARY KEY ( "id" ASC )
) IN "system";

ALTER TABLE "DBA"."vision" ADD CONSTRAINT "fk_vision_visionlayout" 
FOREIGN KEY ( "id_layout" ASC ) REFERENCES "DBA"."vision_layout" ( "id" );

DROP TABLE "DBA"."vision_layout_container";
CREATE TABLE "DBA"."vision_layout_container" (
	"id" INTEGER NOT NULL DEFAULT AUTOINCREMENT,
	"nm_container" VARCHAR(255) NOT NULL,
	"ic_tipo" INTEGER NOT NULL,
	"nr_linhas" INTEGER NOT NULL,
	"nr_colunas" INTEGER NOT NULL,
	"id_layout" INTEGER NOT NULL,
	PRIMARY KEY ( "id" ASC )
) IN "system";

ALTER TABLE "DBA"."vision_layout_container" ADD CONSTRAINT "fk_visionlayoutcontainer_visionlayout" 
FOREIGN KEY ( "id_layout" ASC ) REFERENCES "DBA"."vision_layout" ( "id" );

DROP TABLE "DBA"."vision_layout_componente";
CREATE TABLE "DBA"."vision_layout_componente" (
	"id" INTEGER NOT NULL DEFAULT AUTOINCREMENT,
	"nm_componente" VARCHAR(255) NOT NULL,
	"ic_tipo" INTEGER NOT NULL,
	"nr_colunas" INTEGER NOT NULL,
	"nr_linhas" INTEGER NOT NULL,
	"id_layout_container" INTEGER NOT NULL,
	PRIMARY KEY ( "id" ASC )
) IN "system";

ALTER TABLE "DBA"."vision_layout_componente" ADD CONSTRAINT "fk_visionlayoutcomponente_visionlayoutcontainer" 
FOREIGN KEY ( "id_container" ASC ) REFERENCES "DBA"."vision_layout_container" ( "id" );

DROP TABLE "DBA"."vision_template";
CREATE TABLE "DBA"."vision_template" (
	"id" INTEGER NOT NULL DEFAULT AUTOINCREMENT,
	"nm_template" VARCHAR(255) NOT NULL,
--	"nr_ordem" INTEGER NOT NULL,
	"ds_template" LONG VARCHAR NULL,
	"vl_linha_altura" INTEGER NOT NULL,
	"vl_linha_altura_preview" INTEGER NOT NULL,
	PRIMARY KEY ( "id" ASC )
) IN "system";

DROP TABLE "DBA"."vision_template_container";
CREATE TABLE "DBA"."vision_template_container" (
	"id" INTEGER NOT NULL DEFAULT AUTOINCREMENT,
	"nm_container" VARCHAR(255) NOT NULL,
	"ic_tipo" INTEGER NOT NULL,
	"nr_linhas" INTEGER NOT NULL,
	"nr_colunas" INTEGER NOT NULL,
	"id_template" INTEGER NOT NULL,
	PRIMARY KEY ( "id" ASC )
) IN "system";

ALTER TABLE "DBA"."vision_template_container" ADD CONSTRAINT "fk_visiontemplatecontainer_visiontemplate" 
FOREIGN KEY ( "id_template" ASC ) REFERENCES "DBA"."vision_template" ( "id" );

DROP TABLE "DBA"."vision_template_componente";
CREATE TABLE "DBA"."vision_template_componente" (
	"id" INTEGER NOT NULL DEFAULT AUTOINCREMENT,
	"nm_componente" VARCHAR(255) NOT NULL,
	"ic_tipo" INTEGER NOT NULL,
	"nr_colunas" INTEGER NOT NULL,
	"nr_linhas" INTEGER NOT NULL,
	"id_template_container" INTEGER NOT NULL,
	PRIMARY KEY ( "id" ASC )
) IN "system";


ALTER TABLE "DBA"."vision_template_componente" ADD CONSTRAINT "fk_visiontemplatecomponente_visiontemplatecontainer" 
FOREIGN KEY ( "id_template_container" ASC ) REFERENCES "DBA"."vision_template_container" ( "id" );

DROP TABLE "DBA"."vision_campo";
CREATE TABLE "DBA"."vision_campo" (
	"id" INTEGER NOT NULL DEFAULT AUTOINCREMENT,
	"cd_campo" VARCHAR(255) NOT NULL,
	"nm_campo" VARCHAR(255) NOT NULL,
	"ic_tipo" INTEGER NOT NULL,
	"ic_chave" INTEGER NOT NULL,
	PRIMARY KEY ( "id" ASC )
) IN "system";
	
DROP TABLE "DBA"."vision_modelo";
CREATE TABLE "DBA"."vision_modelo" (
	"id" INTEGER NOT NULL DEFAULT AUTOINCREMENT,
	"nm_modelo" VARCHAR(225) NOT NULL,
	"nr_ordem" INTEGER NOT NULL,
	"ds_expressao" VARCHAR(255) NOT NULL,
	"ds_descricao" LONG VARCHAR NULL,
	"ic_formula" INTEGER NULL,
	PRIMARY KEY ( "id" ASC )
) IN "system";

DROP TABLE "DBA"."vision_modelo_campo_chave";
CREATE TABLE "DBA"."vision_modelo_campo_chave" (
	"id_campo" INTEGER NOT NULL,
	"id_modelo" INTEGER NOT NULL
) IN "system";

DROP TABLE "DBA"."vision_modelo_campo_valor";
CREATE TABLE "DBA"."vision_modelo_campo_valor" (
	"id_campo" INTEGER NOT NULL,
	"id_modelo" INTEGER NOT NULL
) IN "system";

ALTER TABLE "DBA"."vision_modelo_campo_chave" ADD CONSTRAINT "fk_visionmodelocampochave_visioncampo" 
FOREIGN KEY ( "id_campo" ASC ) REFERENCES "DBA"."vision_campo" ( "id" );

ALTER TABLE "DBA"."vision_modelo_campo_chave" ADD CONSTRAINT "fk_visionmodelocampochave_visionmodelo" 
FOREIGN KEY ( "id_modelo" ASC ) REFERENCES "DBA"."vision_modelo" ( "id" );

ALTER TABLE "DBA"."vision_modelo_campo_valor" ADD CONSTRAINT "fk_visionmodelocampovalor_visioncampo" 
FOREIGN KEY ( "id_campo" ASC ) REFERENCES "DBA"."vision_campo" ( "id" );

ALTER TABLE "DBA"."vision_modelo_campo_valor" ADD CONSTRAINT "fk_visionmodelocampovalor_visionmodelo" 
FOREIGN KEY ( "id_modelo" ASC ) REFERENCES "DBA"."vision_modelo" ( "id" );