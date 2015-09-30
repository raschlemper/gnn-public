package vision.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public class DefaultEntity {
	
	@Column(name = "dt_criacao", nullable = true, insertable=false, updatable=false)
	private Date dataCriacao;
	
	@Column(name = "dt_atualizacao", nullable = true, insertable=false, updatable=true)
	private Date dataAtualizacao;
	
	public DefaultEntity() {
		this.dataCriacao = null;
		this.dataAtualizacao = new Date();
	}

	public Date getDataCriacao() {
		return dataCriacao;
	}

	public void setDataCriacao(Date dataCriacao) {
		this.dataCriacao = dataCriacao;
	}

	public Date getDataAtualizacao() {
		return dataAtualizacao;
	}

	public void setDataAtualizacao(Date dataAtualizacao) {
		this.dataAtualizacao = dataAtualizacao;
	}
}
