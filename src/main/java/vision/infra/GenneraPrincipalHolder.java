package vision.infra;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;

import com.gennera.security.Utilities;
import com.gennera.security.principal.GenneraPrincipal;

@SessionComponent
public class GenneraPrincipalHolder {
	
	@Autowired
	private HttpServletRequest request;
	
	public GenneraPrincipal getPrincipal() {
		return (GenneraPrincipal) Utilities.recuperaGenneraPrincipal(request);
	}	
	
	public boolean hasInformation() {
		return getPrincipal() != null;
	}
	
	public Integer getIdPessoa() {
		return getPrincipal().getIdPessoa();
	}
	
	public String getLogin() {
		return getPrincipal().getLogin();
	}
	
	public String getNomeCache() {
		return getPrincipal().getNomeCache();
	}
	
	public Integer getIdInstituicao() {
		return getPrincipal().getIdInstituicao();
	}
	
	public Integer getTipoUsuario() {
		return getPrincipal().getIdTipoUsuario();
	}

	public String getCodigoUsuario(){
		return getPrincipal().getCdUsuario();
	}
}
