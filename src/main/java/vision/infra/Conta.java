//package vision.infra;
//
//import static br.com.gennera.professor.util.Data.diasAte;
//import static br.com.gennera.professor.util.Data.diasDesde;
//
//import java.io.Serializable;
//import java.io.StringReader;
//import java.util.ArrayList;
//import java.util.Date;
//import java.util.List;
//
//import javax.json.Json;
//import javax.json.JsonObject;
//import javax.persistence.Column;
//import javax.persistence.Embedded;
//import javax.persistence.Entity;
//import javax.persistence.FetchType;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Id;
//import javax.persistence.OneToMany;
//import javax.persistence.SequenceGenerator;
//import javax.persistence.Table;
//import javax.persistence.Temporal;
//import javax.persistence.TemporalType;
//
//import br.com.gennera.professor.entidade.DefaultEntity;
//import br.com.gennera.professor.entidade.Locker;
//import br.com.gennera.professor.security.Token;
//import br.com.gennera.professor.util.Data;
//import br.com.gennera.professor.util.DiarionProperties;
//
//import com.fasterxml.jackson.annotation.JsonIgnore;
//
//@Entity
//@Table(name = "conta", schema = "auth")
//@SequenceGenerator(name = "conta_id_sequence", sequenceName = "auth.conta_id_seq", allocationSize = 1)
//public class Conta extends DefaultEntity implements Serializable {
//
//	private static final long serialVersionUID = 5560194997017773767L;
//	
//	private static final DiarionProperties props = new DiarionProperties();
//
//	public static final String FILTER_NAME = "contaFilter";
//	public static final String PERMISSOES = props.getPermissoesDaConta();
//	public static final String CONFIG = props.getConfigDaConta();
//
//	public static final int DIAS_PARA_BLOQUEAR_APOS_CRIACAO = 7;
//
//	@Id
//	@Column(name = "id", nullable = false)
//	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "conta_id_sequence")
//	private Integer id;
//
//	@Column(name = "data_expiracao", nullable = true, updatable = true, columnDefinition = "with time zone")
//	@Temporal(TemporalType.TIMESTAMP)
//	private Date dataExpiracao;
//	
//	@Column
//	private boolean verificada;
//	
//	@Column
//	private String permissoes = PERMISSOES;
//
//	@Column
//	private String config = CONFIG;
//	
//	@Embedded
//	private Token token;
//	
//	@Embedded
//	private Locker locker;
//
//	@OneToMany(fetch = FetchType.LAZY, mappedBy = "pk.conta")
//	private List<UsuarioAuthConta> usuarioAuthContas = new ArrayList<UsuarioAuthConta>();
//
//	public Conta() {}
//	
//	public Conta(Integer id) {
//		this.id = id;
//	}
//
//	@JsonIgnore
//	public UsuarioAuth getDono() {
//		UsuarioAuth dono = null;
//		for (UsuarioAuthConta uat : usuarioAuthContas) {
//			if (uat.isDono()) {
//				dono = uat.getUsuarioAuth();
//			}
//		}
//		return dono;
//	}
//
//	public boolean isBloqueda() {
//		return !verificada && diasDesde(dataCriacao) > DIAS_PARA_BLOQUEAR_APOS_CRIACAO;
//	}
//
//	public Date dataDeBloqueio() {
//		return Data.daquiADias(DIAS_PARA_BLOQUEAR_APOS_CRIACAO, dataCriacao);
//	}
//	
//	public boolean expirou() {
//		if (dataExpiracao == null)
//			return false; // contas sem data de expiração tem validade vitalícia.
//		else
//			return new Date().after(dataExpiracao);
//	}
//	
//	public void aumentarValidade(Integer dias) {
//		if (dataExpiracao == null) 
//			dataExpiracao = new Date();
//		
//		dataExpiracao = Data.daquiADias(dias, dataExpiracao);
//	}
//	
//	public Integer diasParaExpirar() {
//		if (dataExpiracao == null) {
//			return null;
//		}
//		return diasAte(dataExpiracao);
//	}
//	
//	public boolean getPermissao(String acao) {
//		JsonObject json = Json.createReader(new StringReader(permissoes)).readObject();
//		
//		if (json.containsKey(acao)) {
//			return json.getBoolean(acao);
//		} else {
//			return false;
//		}
//	}
//
//	public boolean deveEnviarEmailAo(String acao) {
//		JsonObject json = Json.createReader(new StringReader(config)).readObject();
//		JsonObject enviarEmail = json.getJsonObject("enviar email");
//		
//		if (enviarEmail.containsKey(acao)) {
//			return enviarEmail.getBoolean(acao);
//		} else {
//			return false;
//		}
//	}
//
//	public void gerarToken() {
//		token = Token.novo();
//	}
//	
//	public Integer getId() {
//		return id;
//	}
//	
//	public void setId(Integer id) {
//		this.id = id;
//	}
//	
//	public Date getDataExpiracao() {
//		return dataExpiracao;
//	}
//
//	public void setDataExpiracao(Date dataExpiracao) {
//		this.dataExpiracao = dataExpiracao;
//	}
//
//	public void setVerificada(boolean verificada) {
//		this.verificada = verificada;
//	}
//
//	public boolean isVerificada() {
//		return verificada;
//	}
//
//	public String getConfig() {
//		return config;
//	}
//
//	public void setConfig(String config) {
//		if (config == null) {
//			this.config = CONFIG;
//		} else {
//			this.config = config;
//		}
//	}
//
//	public void setPermissoes(String permissoes) {
//		if (permissoes == null) {
//			this.permissoes = PERMISSOES;
//		} else {
//			this.permissoes = permissoes;
//		}
//	}
//
//	public String getPermissoes() {
//		return permissoes;
//	}
//	
//	public Locker getLocker() {
//		return locker;
//	}
//
//	public void setLocker(Locker locker) {
//		this.locker = locker;
//	}
//
//	public Token getToken() {
//		return token;
//	}
//
//	@JsonIgnore
//	public String getChaveToken() {
//		return token.getToken();
//	}
//
//	public void setToken(Token token) {
//		this.token = token;
//	}
//
//	public void add(UsuarioAuthConta usuarioAuthConta) {
//		usuarioAuthContas.add(usuarioAuthConta);
//	}
//	
//	@JsonIgnore
//	public List<UsuarioAuthConta> getUsuarioAuthContas() {
//		return usuarioAuthContas;
//	}
//	
//	@Override
//	public boolean equals(Object obj) {
//		if (obj instanceof Conta) {
//			Conta other = (Conta) obj;
//			
//			if (this.id != null) {
//				return this.id.equals(other.getId());
//			} else {
//				return super.equals(other);
//			}
//		}
//		return false;
//	}
//	
//	@Override
//	public int hashCode() {
//		return id != null ? id.hashCode() : super.hashCode();
//	}
//}
