package vision.infra;
//package kapta.infra;
//
//import java.io.IOException;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//import kapta.domain.FormularioEntity;
//import kapta.domain.RespostaEntity;
//
//import org.apache.commons.io.output.ByteArrayOutputStream;
//import org.apache.poi.hssf.usermodel.HSSFWorkbook;
//import org.apache.poi.ss.usermodel.Cell;
//import org.apache.poi.ss.usermodel.Row;
//import org.apache.poi.ss.usermodel.Sheet;
//import org.apache.poi.ss.usermodel.Workbook;
//
//public class RespostasExporterExcel {
//	List<Map<String, Object>> modelo;
//	private Sheet s;
//	private Workbook wb;
//	
//	private int rowNumber = 0;
//	
//	public RespostasExporterExcel(FormularioEntity formulario) {
//		super();
//		modelo = formulario.getMetadataAsMap();
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
//		wb = new HSSFWorkbook();
//		s = wb.createSheet();
//		wb.setSheetName(0, tratarNome(formulario.getTitulo()));
//	}
//
//	private String tratarNome(String nome) {
//		return nome.replace("/", " ");
//	}
//	
//	public void createHeader() {
//		Row r = s.createRow(rowNumber++);
//		int cellNumber = 0;		
//		for (Map<String, Object> coluna : modelo) {
//			if (!((Boolean) coluna.get("element"))) {
//				String value = (String) coluna.get("displayName");
//				Cell cell = r.createCell(cellNumber);
//				cell.setCellValue(value);
//				cellNumber++;
//			}
//		}
//	}
//
//	public void createRow(Map<String, String> respostasMap) {
//		Row r = s.createRow(rowNumber++);
//		int cellNumber = 0;
//		for (Map<String, Object> coluna : modelo) {
//			if (!((Boolean) coluna.get("element"))) {
//				String value = respostasMap.get(coluna.get("field"));
//				Cell cell = r.createCell(cellNumber);
//				cell.setCellValue(value);
//				cellNumber++;
//			}
//		}
//	}
//	
//	public byte[] createReport(List<RespostaEntity> respostas) {
//		try {
//			this.createHeader();
//			for (RespostaEntity resposta : respostas) {
//				this.createRow(resposta.getRespostasAsMap());
//			}
//			ByteArrayOutputStream output = new ByteArrayOutputStream();
//			wb.write(output);
//			return output.toByteArray();
//		} catch (IOException e) {
//			return null;
//		}
//	}
//}