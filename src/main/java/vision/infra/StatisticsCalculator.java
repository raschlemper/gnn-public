package vision.infra;
//package kapta.infra;
//
//import java.util.ArrayList;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//import kapta.domain.FormularioEntity;
//import kapta.domain.RespostaEntity;
//
//public class StatisticsCalculator {
//	private FormularioEntity formulario;
//
//	public StatisticsCalculator(FormularioEntity formulario) {
//		super();
//		this.formulario = formulario;
//	}
//	
//	public List<String> getFields() {
//		List<String> fields = new ArrayList<String>();
//		List<Map<String, Object>> metadata = formulario.getMetadataAsMap();
//		for (Map<String, Object> map : metadata) {
//			String type = (String) map.get("type");
//			if (type != null && type.equals("select")) {
//				fields.add((String) map.get("field"));
//			}
//		}
//		return fields;
//	}
//
//	public Map<String, Double> calculateStatistics(String field, List<RespostaEntity> respostas) {
//		Map<String, Double> values = calculateValues(field, respostas);
//		Map<String, Double> statistics = new HashMap<String, Double>();
//		for (String option : values.keySet()) {
//			statistics.put(option, ((Double) values.get(option) / respostas.size())*100);
//		}
//		return statistics;
//	}
//
//	public Map<String, Double> calculateValues(String field, List<RespostaEntity> respostas) {
//		Map<String, Double> values = new HashMap<String, Double>();
//		for (String option : getOptionsOfField(field)) {
//			values.put(option, 0.0);
//		}
//		for (RespostaEntity resposta : respostas) {
//			Map<String, String> mapa = resposta.getRespostasAsMap();
//			String value = (String) mapa.get(field);
//			Double valorAcumulado = values.get(value);
//			if (valorAcumulado == null) continue;
//			valorAcumulado++;
//			values.put(value, valorAcumulado);
//		}
//		return values;
//	}
//
//	public List<String> getOptionsOfField(String fieldToBeAnalysed) {
//		List<String> fields = new ArrayList<String>();
//		List<Map<String, Object>> metadata = formulario.getMetadataAsMap();
//		for (Map<String, Object> map : metadata) {
//			String field = (String) map.get("field");
//			if (field != null && field.equals(fieldToBeAnalysed)) {
//				return (ArrayList<String>) map.get("options");
//			}
//		}
//		if (fieldToBeAnalysed.equals("situacaoFinanceira")) {
//			fields.add("Pago");
//			fields.add("Não Pago");
//		}
//		return fields;
//	}
//}
