package vision.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import vision.service.AuthenticationService;

@Controller
public class AuthenticationController {

	@Autowired
	private AuthenticationService authenticationService;

	@RequestMapping(value = "/public/auth/login", method = RequestMethod.GET)
	public void login(
			final String j_username, 
			final String j_password, 
			final String txt_CdInstituicao, 
			final HttpServletResponse response)	throws IOException {
		if (!authenticationService.login(j_username, j_password)) {
			response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Login Failed");
		} else {
			response.setStatus(HttpServletResponse.SC_NO_CONTENT);
			response.flushBuffer();
		}
	}

	@RequestMapping(value = "/public/auth/logout", method = RequestMethod.GET)
	public void logout(final HttpServletRequest request, final HttpServletResponse response) throws IOException {
		authenticationService.logout();
		request.getSession().invalidate();
		response.setStatus(HttpServletResponse.SC_NO_CONTENT);
		response.flushBuffer();
	}
	
	@RequestMapping(value = "/public/auth/session", method = RequestMethod.GET)
	public void validate(final HttpServletRequest request, final HttpServletResponse response) throws IOException {
		boolean hasValidSession = request.getUserPrincipal() != null;
		if (hasValidSession) {
			response.setStatus(HttpServletResponse.SC_NO_CONTENT);
			response.flushBuffer();
		} else {
			response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Session Failed");
		}
	}
}