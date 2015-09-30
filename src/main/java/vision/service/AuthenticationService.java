package vision.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.gennera.security.authentication.AuthService;

import vision.infra.GenneraPrincipalHolder;

@Service
public class AuthenticationService {
	
	private static Logger logger = LoggerFactory.getLogger(AuthenticationService.class);
	
	@Autowired
	private GenneraPrincipalHolder genneraPrincipalHolder;

	public boolean login(final String username, final String password) {
		try {
			boolean authenticationResult = AuthService.login(username, password);
			log(authenticationResult, username);
			return authenticationResult;
		} catch (Exception e) {
			logger.warn(e.getMessage());
			return false;
		}
	}

	public void logout() {
		logger.info("Logout successful: " + usuarioInstituicao());
		AuthService.logout();
		SecurityContextHolder.clearContext();
	}
	
	private String usuarioInstituicao() {
		return genneraPrincipalHolder.getLogin() + "/" + genneraPrincipalHolder.getIdInstituicao();
	}
	
	private void log(final boolean authenticated, final String username) {
		if (authenticated) {
			logger.debug("Login successful: " + usuarioInstituicao());
		} else {
			logger.debug("Login failed: " + username);
		}
	}
}
