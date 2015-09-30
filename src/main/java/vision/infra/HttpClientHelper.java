package vision.infra;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;

@Component
public class HttpClientHelper {
	
	@Autowired
	private HttpClient http;
	
	private JsonConverter jsonConverter = new JsonConverter();
	
	public String get(String url, String format, String header, String params, String formValues) {
		List<LinkedHashMap<String, Object>> paramsMaps = jsonConverter.toListOfMaps(params);
		Map<String, Object> formValueMap = jsonConverter.toMap(formValues);
		Map<String, Object> bodyMap = parseBody(paramsMaps, formValueMap);
		return http.get(parseURL(url, paramsMaps, formValueMap), generateEntity(format, header, bodyMap));
	}
	
	public String post(String url, String format, String header, String params, String formValues) {
		List<LinkedHashMap<String, Object>> paramsMaps = jsonConverter.toListOfMaps(params);
		Map<String, Object> formValueMap = jsonConverter.toMap(formValues);
		Map<String, Object> bodyMap = parseBody(paramsMaps, formValueMap);
		return http.post(parseURL(url, paramsMaps, formValueMap), generateEntity(format, header, bodyMap));
	}
	
	public String parseURL(String url, List<LinkedHashMap<String, Object>> paramsMaps, Map<String, Object> formValueMap) {
		if (paramsMaps != null && formValueMap != null) {
			for (Entry<String, Object> formValue : formValueMap.entrySet()) {
				for (LinkedHashMap<String, Object> param : paramsMaps) {
					if (formValue.getKey().equalsIgnoreCase(param.get("from").toString())) {
						if ("URL".equalsIgnoreCase(param.get("type").toString())) {
							url = url.replace("{" + param.get("to").toString() + "}", formValue.getValue().toString());
						}
					}
				}
			}
		}
		return url;
	}
	
	public Map<String, Object> parseBody(List<LinkedHashMap<String, Object>> paramsMaps, Map<String, Object> formValueMap) {
		Map<String, Object> bodyMap = new HashMap<String, Object>();
		
		if (paramsMaps != null && formValueMap != null) {
			for (Entry<String, Object> formValue : formValueMap.entrySet()) {
				for (LinkedHashMap<String, Object> param : paramsMaps) {
					if (formValue.getKey().equalsIgnoreCase(param.get("from").toString())) {
						if ("Body".equalsIgnoreCase(param.get("type").toString())) {
							bodyMap.put(param.get("to").toString(), formValue.getValue().toString());
						}
					}
				}
			}
		}
		
		return bodyMap;
	}
	
	public HttpEntity<String> generateEntity(String format, String header, Map<String, Object> bodyMap) {
		if (bodyMap == null || bodyMap.isEmpty()) 
			return new HttpEntity<String>(generateHeaders(format, header));
		
		return new HttpEntity<String>(jsonConverter.toJson(bodyMap), generateHeaders(format, header));
	}
	
	public HttpHeaders generateHeaders(String formato, String header) {
		HttpHeaders httpHeader = new HttpHeaders();
		
		if ("JSON".equalsIgnoreCase(formato)) {
			httpHeader.setContentType(MediaType.APPLICATION_JSON);
		} else if ("x-www-form-urlencoded".equalsIgnoreCase(formato)) {
			httpHeader.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
		}
		
		List<LinkedHashMap<String, Object>> headerMaps = jsonConverter.toListOfMaps(header);
		for (LinkedHashMap<String, Object> map : headerMaps) {
			httpHeader.set(map.get("key").toString(), map.get("value").toString());
		}
		
		return httpHeader;
	}
	
}
