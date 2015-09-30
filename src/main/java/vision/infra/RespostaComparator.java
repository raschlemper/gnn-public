package vision.infra;

import java.util.Comparator;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

public class RespostaComparator implements Comparator<Map<String, String>> {
	private List<Map<String, String>> orderBy;
	
	public RespostaComparator(List<Map<String, String>> orderBy) {
		super();
		this.orderBy = orderBy;
	}

	@Override
	public int compare(Map<String, String> o1, Map<String, String> o2) {
		if (orderBy == null || orderBy.isEmpty() || o1 == null || o2 == null) return 0;
		for (Map<String, String> order : orderBy) {
			String field1 = o1.get(order.get("field"));
			String field2 = o2.get(order.get("field"));
			if (field1 == null && field2 == null) return 0;
			if (field1 == null && field2 != null) return -1;
			if (field1 != null && field2 == null) return 1;
			if (StringUtils.isNumeric(field1) && StringUtils.isNumeric(field2)) {
				int criteria = (Integer.parseInt(field1) - Integer.parseInt(field2)) * Integer.parseInt(order.get("direction"));
				if (criteria != 0) return criteria;
			}
			int criteria = field1.toUpperCase().compareTo(field2.toUpperCase()) * Integer.parseInt(order.get("direction"));
			if (criteria != 0) return criteria;
		}
		return 0;
	}
}