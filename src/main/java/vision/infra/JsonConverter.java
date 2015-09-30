package vision.infra;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;



@SuppressWarnings("unchecked")
public class JsonConverter {
	
	private ObjectMapper mapper = new ObjectMapper();
	
	/**
	 * Usado para converter um ARRAY de OBJETOS JSON.
	 */
	public List<LinkedHashMap<String, Object>> toListOfMaps(String json) {
		try {
			return mapper.readValue(json, ArrayList.class);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	/**
	 * Usado para converter um OBJETO JSON.
	 */
	public LinkedHashMap<String, Object> toMap(String json) {
		try {
			return mapper.readValue(json, LinkedHashMap.class);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	/**
	 * Usado para converter um OBJETO para JSON.
	 */
	public String toJson(Object object) {
		try {
			return mapper.writeValueAsString(object);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public List<Long> toListOfLong(String json) {
		try {
			return mapper.readValue(json, new TypeReference<List<Long>>() {});
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
}
