package vision.infra;
//package kapta.infra;
//
//import java.io.IOException;
//import java.util.ArrayList;
//import java.util.Collections;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//import kapta.domain.FormularioEntity;
//import kapta.domain.RelatorioEntity;
//import kapta.domain.RespostaEntity;
//
//import org.apache.commons.io.output.ByteArrayOutputStream;
//import org.apache.commons.lang.WordUtils;
//import org.apache.poi.hssf.usermodel.HSSFWorkbook;
//import org.apache.poi.ss.usermodel.Cell;
//import org.apache.poi.ss.usermodel.Row;
//import org.apache.poi.ss.usermodel.Sheet;
//import org.apache.poi.ss.usermodel.Workbook;
//import org.codehaus.jackson.JsonParseException;
//import org.codehaus.jackson.map.JsonMappingException;
//import org.codehaus.jackson.map.ObjectMapper;
//import org.codehaus.jackson.type.TypeReference;
//
//public class ReportManagerExcel {
//	private RelatorioEntity relatorio;
//	private Workbook wb;
//	private int rowNumber = 0;
//	private int sheetCounter = 0;
//	private Map<String, String> mapaDosCamposTypeField;
//	
//	public ReportManagerExcel(RelatorioEntity relatorio) {
//		super();
//		this.relatorio = relatorio;
//		this.mapaDosCamposTypeField = relatorio.getFormulario().getMapaDosCamposTypeField();
//		wb = new HSSFWorkbook();
//	}
//
//	private String tratarNome(String nome) {
//		if (nome.equals("")) return "Indefinido";
//		return nome.replaceAll("[^a-zA-Z0-9]", "_");
//	}
//
//	public void createHeader(Sheet s) {
//		List<Map<String, Object>> modelo = relatorio.getModeloAsMap();
//		Row r = s.createRow(rowNumber++);
//		int cellNumber = 0;
//		for (Map<String, Object> coluna : modelo) {
//			Cell cell = r.createCell(cellNumber++);
//			cell.setCellValue((String) coluna.get("displayName"));
//		}
//	}
//
//	public void createRowAnalitico(Sheet s, Map<String, String> respostasMap) {
//		Row r = s.createRow(rowNumber++);
//		List<Map<String, Object>> modelo = relatorio.getModeloAsMap();
//		int cellNumber = 0;
//		for (Map<String, Object> coluna : modelo) {
//			String resposta = (respostasMap.get(coluna.get("field")) != null) ? respostasMap.get(coluna.get("field")) : (String) coluna.get("default");
//			String filtro = (String) coluna.get("filter");
//			if (perguntaFoiRespondidaMasNaoFoiFiltrada(resposta, filtro)) {
//				rowNumber--;
//				s.removeRow(r);
//				return;
//			}
//			Cell cell = r.createCell(cellNumber++);
//			String formato = (String) coluna.get("format");
//			resposta = aplicacaoFormatacao(resposta, formato);
//			cell.setCellValue(resposta);
//		}
//	}
//	
//	private boolean perguntaFoiRespondidaMasNaoFoiFiltrada(String resposta, String filtro) {
//		if (filtro == null) return false;
//		if (filtro.isEmpty()) return false;
//		if (resposta == null) return true;
//		return !(resposta.equals(filtro));
//	}
//	
//	private String aplicacaoFormatacao(String resposta, String formato) {
//		if (resposta == null || formato == null) return resposta;
//		if (formato.equals("lowercase")) return resposta.toLowerCase();
//		if (formato.equals("uppercase")) return resposta.toUpperCase();
//		if (formato.equals("initcap")) return WordUtils.capitalizeFully(resposta);
//		return resposta;
//	}
//	
//	public byte[] createReport(List<RespostaEntity> respostas) {
//		try {
//			Map<String, List<RespostaEntity>> groups = splitRespostasInGroups(respostas);
//			List<String> groupNames = new ArrayList(groups.keySet());
//			Collections.sort(groupNames);
//			if (relatorio.hasGroupBy() && relatorio.getGroupByDirectionDescending()) Collections.reverse(groupNames);
//			for (String groupName : groupNames) {
//				rowNumber = 0;
//				Sheet s = wb.createSheet();
//				wb.setSheetName(sheetCounter++, this.tratarNome(groupName));
//				List<RespostaEntity> group = groups.get(groupName);
//				if (this.relatorio.getTipo().equals("Analítico")) {
//					createTableAnalitico(group, s);
//				}
//				if (this.relatorio.getTipo().equals("Sintético")) {
//					createTableSintetico(group, s);
//				}
//			}
//			ByteArrayOutputStream output = new ByteArrayOutputStream();
//			wb.write(output);
//			return output.toByteArray();
//		} catch (IOException e) {
//			return null;
//		}
//	}
//
//	private void createTableAnalitico(List<RespostaEntity> group, Sheet s) {
//		this.createHeader(s);
//		List<Map<String, String>> map = orderData(group);
//		for (Map<String, String> resposta : map) {
//			this.createRowAnalitico(s, resposta);
//		}
//	}
//	
//	private void createTableSintetico(List<RespostaEntity> respostas, Sheet s) {
//		List<Map<String, Object>> modelo = relatorio.getModeloAsMap();
//		for (Map<String, Object> coluna : modelo) {
//			this.createRowSintetico((String) coluna.get("field"), respostas, s);
//		}
//	}
//	
//	public void createRowSintetico(String field, List<RespostaEntity> respostas, Sheet s) {
//		FormularioEntity formulario = relatorio.getFormulario();
//		StatisticsCalculator statistics = new StatisticsCalculator(formulario);
//		if (!statistics.getFields().contains(field)) return;
//		
//		String campo = formulario.getMapaDosCamposFieldDisplayName().get(field);
//		Row r = s.createRow(rowNumber++);
//		Cell cell = r.createCell(0);
//		cell.setCellValue(campo);
//		Row rowTitulo = s.createRow(rowNumber++);
//		Cell cellTitulo = rowTitulo.createCell(0);
//		cellTitulo.setCellValue("Respostas");
//		Cell cellTituloPercentual = rowTitulo.createCell(1);
//		cellTituloPercentual.setCellValue("Percentual");
//		Cell cellTituloTotal = rowTitulo.createCell(2);
//		cellTituloTotal.setCellValue("Total");
//		Map<String, Double> statisticasMap = statistics.calculateStatistics(field, respostas);
//		Map<String, Double> valuesMap = statistics.calculateValues(field, respostas);
//		for(String key : statisticasMap.keySet()) {
//			Row rowResposta = s.createRow(rowNumber++);
//			Cell cellResposta = rowResposta.createCell(0);
//			cellResposta.setCellValue(key);
//			Cell cellPercentual = rowResposta.createCell(1);
//			cellPercentual.setCellValue(Math.round(statisticasMap.get(key)) + "%");
//			Cell cellTotal = rowResposta.createCell(2);
//			cellTotal.setCellValue(Math.round(valuesMap.get(key)) + "");
//		}
//	}
//	
//	private Map<String, List<RespostaEntity>> splitRespostasInGroups(List<RespostaEntity> respostas) {
//		Map<String, List<RespostaEntity>> groups = new HashMap<String, List<RespostaEntity>>();
//		if (!relatorio.hasGroupBy()) {
//			groups.put(relatorio.getNome(), respostas);
//			return groups;
//		}
//		String field = relatorio.getGroupByField();
//		for (RespostaEntity resposta : respostas) {
//			String groupName = resposta.getRespostasAsMap().get(field);
//			if (groupName == null) continue;
//			if("checkbox".equals(this.mapaDosCamposTypeField.get(field))) {
//				ObjectMapper mapper = new ObjectMapper();
//				try {
//					List<String> groupsOfField = mapper.readValue(groupName, new TypeReference<List<String>>() {});
//					for (String groupOfField : groupsOfField) {
//						List<RespostaEntity> respostasDoGrupo = groups.get(this.tratarNome(groupOfField));
//						if (respostasDoGrupo == null) respostasDoGrupo = new ArrayList<RespostaEntity>();
//						respostasDoGrupo.add(resposta);
//						groups.put(this.tratarNome(groupOfField), respostasDoGrupo);
//					}
//				} catch (JsonParseException e) {
//					e.printStackTrace();
//				} catch (JsonMappingException e) {
//					e.printStackTrace();
//				} catch (IOException e) {
//					e.printStackTrace();
//				}
//			} else {
//				List<RespostaEntity> respostasDoGrupo = groups.get(this.tratarNome(groupName));
//				if (respostasDoGrupo == null) respostasDoGrupo = new ArrayList<RespostaEntity>();
//				respostasDoGrupo.add(resposta);
//				groups.put(this.tratarNome(groupName), respostasDoGrupo);
//			}
//		}
//		return groups;
//	}
//	
//	private List<Map<String, String>> orderData(List<RespostaEntity> respostas) {
//		List<Map<String, String>> orderBy = relatorio.getOrderByAsList();
//		List<Map<String, String>> map = new ArrayList<Map<String, String>>();
//		for (RespostaEntity resposta : respostas) {
//			map.add(resposta.getRespostasAsMap());
//		}
//		if (orderBy != null && !orderBy.isEmpty()) {
//			RespostaComparator respostaComparator = new RespostaComparator(orderBy);
//			try {
//				Collections.sort(map, respostaComparator);
//			} catch (Exception e) {
//			}
//		}
//		return map;
//	}
//}