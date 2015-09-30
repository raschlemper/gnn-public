package vision.infra;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

public class FonteDadosConverter {
	
	public List<LinkedHashMap<String, Object>> convertListOfMaps(List<LinkedHashMap<String, Object>> resultMaps, List<LinkedHashMap<String, Object>> converterMaps) {
		List<LinkedHashMap<String, Object>> convertedMaps = new ArrayList<LinkedHashMap<String, Object>>();
		
		for (LinkedHashMap<String, Object> map : resultMaps)
			convertedMaps.add(convertMap(map, converterMaps));
		
		return convertedMaps;
	}

	public LinkedHashMap<String, Object> convertMap(LinkedHashMap<String, Object> mapToConvert, List<LinkedHashMap<String, Object>> converters) {
		LinkedHashMap<String, Object> convertedMap = new LinkedHashMap<String, Object>();
		
		for (LinkedHashMap<String, Object> converter : converters)
			addToMap(mapToConvert, convertedMap, converter);
		
		return convertedMap;
	}

	private void addToMap(LinkedHashMap<String, Object> map, LinkedHashMap<String, Object> converted, LinkedHashMap<String, Object> converter) {
		Boolean isMap = Boolean.parseBoolean(getFromMap(converter, "map"));
		
		if (isMap) {
			convertMapObject(map, converter, converted);
		} else {
			convertSimpleObject(map, converter, converted);
		}
	}

	private void convertMapObject(LinkedHashMap<String, Object> map, LinkedHashMap<String, Object> converter, LinkedHashMap<String, Object> converted) {
		LinkedHashMap<String, String> values = new LinkedHashMap<String, String>();
		values.put("key", map.get(getFromMap(converter, "key")).toString());
		values.put("value", map.get(getFromMap(converter, "value")).toString());
		
		converted.put(getFromMap(converter, "to"), values);
	}
	
	private void convertSimpleObject(LinkedHashMap<String, Object> map, LinkedHashMap<String, Object> converter, LinkedHashMap<String, Object> converted) {
		String from = getFromMap(converter, "from");
		
		Object value = map.get(from);
		
		if (value == null)
			return;
		if (value instanceof LinkedHashMap)
			return;
		if (value instanceof ArrayList)
			return;
		
		converted.put(getFromMap(converter, "to"), value.toString());
	}
	
	private String getFromMap(LinkedHashMap<String, Object> map, String key) {
		return map.get(key) != null ? map.get(key).toString() : null;
	}
	
	@SuppressWarnings({ "unchecked", "unused" })
	private String getChildProperty (LinkedHashMap<String, Object> map, String parentKey, String childKey) {
		return getFromMap((LinkedHashMap<String, Object>) map.get(parentKey), childKey);
	}
	
}
