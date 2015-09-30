package vision.infra;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.output.ByteArrayOutputStream;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

public class MapExporterExcel {
	private Sheet sheet;
	private Workbook wb;
	private int rowNumber = 0;
	
	public MapExporterExcel(String title) {
		wb = new HSSFWorkbook();
		sheet = wb.createSheet();
		wb.setSheetName(0, title);
	}

	public void createHeader(List<String> headers, Row row) {
		int cellNumber = 0;
		for (String header : headers) {
			Cell cell = row.createCell(cellNumber++);
			cell.setCellValue(header);
		}
	}

	public void createRow(List<String> headers, Map<String, Object> map, Row row) throws IllegalArgumentException, IllegalAccessException {
		int cellNumber = 0;
		for (String header : headers) {
			Cell cell = row.createCell(cellNumber++);
			Object value = map.get(header);
			if (value != null) cell.setCellValue(value.toString());
		}
	}
	
	public byte[] export(List<String> headers, List<Map<String, Object>> data) {
		try {
			Row headerRow = sheet.createRow(rowNumber++);
			this.createHeader(headers, headerRow);
			for (Map<String, Object> map : data) {
				Row row = sheet.createRow(rowNumber++);
				this.createRow(headers, map, row);
			}
			ByteArrayOutputStream output = new ByteArrayOutputStream();
			wb.write(output);
			return output.toByteArray();
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			return null;
		} catch (IllegalAccessException e) {
			e.printStackTrace();
			return null;
		}
	}
}