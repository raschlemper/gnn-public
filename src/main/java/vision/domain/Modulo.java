package vision.domain;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnore;

@Entity
@Table(name="vision_modulo")
public class Modulo {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private Long id;
	
	@Column(name = "nm_modulo")
	private String nome;
	
	@Column(name = "ds_modulo")
	private String descricao;
	
	@Column(name = "hashid")
	private String hash;
	
	@OneToMany(targetEntity = DatasourceEntity.class, mappedBy = "modulo", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<DatasourceEntity> datasources;
	
	@OneToMany(targetEntity = Vision.class, mappedBy = "modulo", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Vision> visions;

	public void generateHash(String client) {
		this.hash = client + Math.abs(this.hashCode());
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getHash() {
		return hash;
	}

	public void setHash(String hash) {
		this.hash = hash;
	}

	public List<DatasourceEntity> getDatasources() {
		return datasources;
	}

	public void setDatasources(List<DatasourceEntity> datasources) {
		this.datasources = datasources;
	}
	
	public List<Vision> getVisions() {
		return visions;
	}

	public void setVisions(List<Vision> visions) {
		this.visions = visions;
	}

	@Override
	public String toString() {
		return "Modulo [id=" + id + ", nome=" + nome + ", descricao=" + descricao + ", hash=" + hash + ", datasources=" + datasources + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((descricao == null) ? 0 : descricao.hashCode());
		result = prime * result + ((hash == null) ? 0 : hash.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((nome == null) ? 0 : nome.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Modulo other = (Modulo) obj;
		if (descricao == null) {
			if (other.descricao != null)
				return false;
		} else if (!descricao.equals(other.descricao))
			return false;
		if (hash == null) {
			if (other.hash != null)
				return false;
		} else if (!hash.equals(other.hash))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (nome == null) {
			if (other.nome != null)
				return false;
		} else if (!nome.equals(other.nome))
			return false;
		return true;
	}
	
	
}
