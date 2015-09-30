package vision.infra;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class HttpClient {
	
	private RestTemplate http = new RestTemplate();
	
	public String get(String url, HttpEntity<String> entity) {
		return http.exchange(url, HttpMethod.GET, entity, String.class).getBody();
	}
	
	public String post(String url, HttpEntity<String> entity) {
		return http.exchange(url, HttpMethod.POST, entity, String.class).getBody();
	}
	
}
