package vision.infra;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

public class Http401UnauthorizedEntryPoint implements AuthenticationEntryPoint {
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
    	response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    	response.setContentType("text/html");
    	response.getWriter().write("<html><head><script>window.location.href = 'view#/visions'</script></head><body>Redirecionando para a página principal...</body></html>");
    	response.getWriter().flush();
    }
}