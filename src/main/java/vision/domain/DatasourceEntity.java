package vision.domain;

import java.util.Date;
import java.util.Random;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnore;

@Entity
@Table(name="vision_datasource")
public class DatasourceEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_vision_datasource", nullable = false)
	private Long id;
	@Column(name = "nm_datasource", nullable = false)
	private String name;
	@Column(name = "cd_hash", nullable = false)
	private String hash;
	@Column(name = "nm_description", nullable = false)
	private String description;
	@Column(name = "nm_url")
	private String url;
	@Column(name = "nm_method")
	private String method;
	@Column(name = "nm_format")
	private String format;
	@Column(name = "ds_header", nullable = false)
	private String header;
	@Column(name = "ds_converter", nullable = false)
	private String converter;
	@Column(name = "ds_parameter", nullable = false)
	private String parameter;
	
	@ManyToOne
    @JoinColumn(name = "cd_modulo", referencedColumnName = "id")
	@JsonIgnore
	private Modulo modulo;

	public void generateHash(String client) {
		this.hash = client + Math.abs(this.hashCode());
	}
	
	@Override
	public int hashCode() {
		Date dataAtual = new Date();
		String seed = Integer.toString(super.hashCode()) + dataAtual.toString() + new Random().nextDouble();
		if (this.id != null) seed += id;
		if (this.description != null) seed += description;
		if (this.url != null) seed += url;
		if (this.method != null) seed += method;
		if (this.format != null) seed += format;
		if (this.header != null) seed += header;
		if (this.converter != null) seed += converter;
		if (this.parameter != null) seed += parameter;
		
		return seed.hashCode();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getHash() {
		return hash;
	}

	public void setHash(String hash) {
		this.hash = hash;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getMethod() {
		return method;
	}

	public void setMethod(String method) {
		this.method = method;
	}

	public String getFormat() {
		return format;
	}

	public void setFormat(String format) {
		this.format = format;
	}

	public String getHeader() {
		return header;
	}

	public void setHeader(String header) {
		this.header = header;
	}

	public String getConverter() {
		return converter;
	}

	public void setConverter(String converter) {
		this.converter = converter;
	}

	public String getParameter() {
		return parameter;
	}

	public void setParameter(String parameter) {
		this.parameter = parameter;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}	
	
	public Modulo getModulo() {
		return modulo;
	}

	public void setModulo(Modulo modulo) {
		this.modulo = modulo;
	}
}