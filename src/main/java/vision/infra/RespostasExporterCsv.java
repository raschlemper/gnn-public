package vision.infra;
//package kapta.infra;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//import kapta.domain.FormularioEntity;
//import kapta.domain.RespostaEntity;
//
//public class RespostasExporterCsv {
//	private List<Map<String, Object>> modelo;
//	private StringBuilder csv = new StringBuilder();
//	
//	public RespostasExporterCsv(FormularioEntity formulario) {
//		super();
//		modelo = formulario.getMetadataAsMap();
//		Map<String, Object> identificador = new HashMap<String, Object>();
//		identificador.put("field", "id");
//		identificador.put("displayName", "Identificador");
//		identificador.put("element", false);
//		modelo.add(identificador);
//		Map<String, Object> hash = new HashMap<String, Object>();
//		hash.put("field", "hash");
//		hash.put("displayName", "Hash");
//		hash.put("element", false);
//		modelo.add(hash);
//		Map<String, Object> condicao = new HashMap<String, Object>();
//		condicao.put("field", "condicao");
//		condicao.put("displayName", "Condição");
//		condicao.put("element", false);
//		modelo.add(condicao);
//		Map<String, Object> condicaoDetalhes = new HashMap<String, Object>();
//		condicaoDetalhes.put("field", "condicaoDetalhes");
//		condicaoDetalhes.put("displayName", "Condição Detalhes");
//		condicaoDetalhes.put("element", false);
//		modelo.add(condicaoDetalhes);
//	}
//
//	public void createHeader() {
//		for (Map<String, Object> coluna : modelo) {
//			if (!((Boolean) coluna.get("element"))) {
//				String value = (String) coluna.get("displayName");
//				csv.append(value + ";");
//			}
//		}
//		csv.append("\n");
//	}
//
//	public void createRow(Map<String, String> respostasMap) {
//		for (Map<String, Object> coluna : modelo) {
//			if (!((Boolean) coluna.get("element"))) {
//				String value = respostasMap.get(coluna.get("field"));
//				if (value != null) value = value.replaceAll("\n", "");
//				if (value != null) value = value.replaceAll(";", "");
//				csv.append(value + ";");
//			}
//		}
//		csv.append("\n");
//	}
//	
//	public byte[] createReport(List<RespostaEntity> respostas) {
//		this.createHeader();
//		for (RespostaEntity resposta : respostas) {
//			this.createRow(resposta.getRespostasAsMap());
//		}
//		return csv.toString().getBytes();
//	}
//}