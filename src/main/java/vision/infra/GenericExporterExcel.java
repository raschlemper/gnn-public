package vision.infra;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.Date;
import java.util.List;

import org.apache.commons.io.output.ByteArrayOutputStream;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

public class GenericExporterExcel<E> {
	private Sheet sheet;
	private Workbook wb;
	private int rowNumber = 0;
	private int maximumDepth;
	
	public GenericExporterExcel(String title) {
		this(title, 2);
	}
	
	public GenericExporterExcel(String title, int maximumDepth) {
		wb = new HSSFWorkbook();
		sheet = wb.createSheet();
		wb.setSheetName(0, tratarNome(title));
		this.maximumDepth = maximumDepth;
	}
	
	private String tratarNome(String nome) {
		return nome.replace("/", " ");
	}

	public void createHeader(Object e, int depth, Row row, int cellNumber, String prefix) throws IllegalArgumentException, IllegalAccessException {
		depth++;
		for (Field field : e.getClass().getDeclaredFields()) {
			field.setAccessible(true);
			if (shouldShowField(field)) {
				Cell cell = row.createCell(cellNumber);
				cell.setCellValue(prefix + "." + field.getName());
				cellNumber++;
				continue;
			}
			if (field.get(e) != null && depth < this.maximumDepth) createHeader(field.get(e), depth, row, cellNumber, field.getName());
		}
	}


	public void createRow(Object e, int depth, Row row, int cellNumber) throws IllegalArgumentException, IllegalAccessException {
		depth++;
		for (Field field : e.getClass().getDeclaredFields()) {
			field.setAccessible(true);
			if (shouldShowField(field)) {
				Cell cell = row.createCell(cellNumber);
				if (field.get(e) != null) cell.setCellValue(field.get(e).toString());
				cellNumber++;
				continue;
			}
			if (field.get(e) != null && depth < this.maximumDepth) createRow(field.get(e), depth, row, cellNumber);
		}
	}

	private boolean shouldShowField(Field field) {
		return 
				field.getType().isPrimitive() || 
				field.getType().isAssignableFrom(String.class) || 
				field.getType().isAssignableFrom(Double.class) || 
				field.getType().isAssignableFrom(Long.class) ||
				field.getType().isAssignableFrom(Date.class);
	}
	
	public byte[] export(List<E> list, String initialPrefix) {
		try {
			Row headerRow = sheet.createRow(rowNumber++);
			this.createHeader(list.get(0), 0, headerRow, 0, initialPrefix);
			for (E e : list) {
				Row row = sheet.createRow(rowNumber++);
				this.createRow(e, 0, row, 0);
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