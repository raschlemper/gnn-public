package vision.infra;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedGrantedAuthoritiesUserDetailsService;
import org.springframework.stereotype.Component;

@Component
public class CustomUserDetailsService extends PreAuthenticatedGrantedAuthoritiesUserDetailsService {
	@Autowired 
	private GenneraPrincipalHolder principalHolder;
	
	protected UserDetails createuserDetails(final Authentication token, final List<GrantedAuthority> authorities) {
		return createUser("");
	}

	private User createUser(final String... permissions) {
		return new User(principalHolder.getLogin(), "", true, true, true, true, AuthorityUtils.createAuthorityList(permissions));
	}
}