package vision.infra;
//package kapta.infra;
//
//import java.io.IOException;
//import java.text.SimpleDateFormat;
//import java.util.ArrayList;
//import java.util.Collections;
//import java.util.Date;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//import org.apache.commons.lang.WordUtils;
//import org.codehaus.jackson.JsonParseException;
//import org.codehaus.jackson.map.JsonMappingException;
//import org.codehaus.jackson.map.ObjectMapper;
//import org.codehaus.jackson.type.TypeReference;
//
//import com.hp.gagawa.java.elements.Body;
//import com.hp.gagawa.java.elements.Div;
//import com.hp.gagawa.java.elements.H3;
//import com.hp.gagawa.java.elements.H5;
//import com.hp.gagawa.java.elements.Head;
//import com.hp.gagawa.java.elements.Html;
//import com.hp.gagawa.java.elements.P;
//import com.hp.gagawa.java.elements.Span;
//import com.hp.gagawa.java.elements.Style;
//import com.hp.gagawa.java.elements.Table;
//import com.hp.gagawa.java.elements.Tbody;
//import com.hp.gagawa.java.elements.Td;
//import com.hp.gagawa.java.elements.Th;
//import com.hp.gagawa.java.elements.Thead;
//import com.hp.gagawa.java.elements.Tr;
//
//import kapta.domain.FormularioEntity;
//import kapta.domain.RelatorioEntity;
//import kapta.domain.RespostaEntity;
//
//public class ReportManager {
//	private RelatorioEntity relatorio;
//	private ChartManager chartManager;
//	private Map<String, String> mapaDosCamposFieldDisplayName;
//	private Map<String, String> mapaDosCamposTypeField;
//	private String CSS = "body,hr{color:#333}body{padding:30px;font-family:'Helvetica Neue,Helvetica,Arial,sans-serif'}hr{height:1px;border:none;background-color:#333}table{width:100%;padding:10px;border-collapse:collapse;border-spacing:0;font-size:14px}tr>td,tr>th{text-align:left;padding:7px}th{font-weight:700}tr>th{border-top:1px solid #CCC;border-left:1px solid #CCC;border-right:1px solid #CCC;border-bottom:2px solid #CCC}tr>td{border:1px solid #CCC}";
//
//	public ReportManager(RelatorioEntity relatorio) {
//		super();
//		this.relatorio = relatorio;
//		this.mapaDosCamposFieldDisplayName = relatorio.getFormulario().getMapaDosCamposFieldDisplayName();
//		this.mapaDosCamposTypeField = relatorio.getFormulario().getMapaDosCamposTypeField();
//		this.chartManager = new ChartManager(400, 400);
//		if (this.relatorio.getHeader() == null)
//			this.relatorio.setHeader("");
//		if (this.relatorio.getFooter() == null)
//			this.relatorio.setFooter("");
//	}
//
//	public String createReport(List<RespostaEntity> respostas) {
//		Date inicio = new Date();
//		Html html = new Html();
//		Head head = new Head();
//		Style style = new Style("");
//		style.appendText(CSS);
//		head.appendChild(style);
//		html.appendChild(head);
//		Body body = new Body();
//		Div titulo = new Div();
//		titulo.appendChild(new H3().appendText(relatorio.getNome()));
//		body.appendChild(titulo);
//		Div hr = new Div();
//		hr.appendText("<hr/>");
//		body.appendChild(hr);
//		body.appendChild(new P().appendText(relatorio.getHeader()));
//		Map<String, List<RespostaEntity>> groups = splitRespostasInGroups(respostas);
//		List<String> groupNames = new ArrayList(groups.keySet());
//		Collections.sort(groupNames);
//		if (relatorio.hasGroupBy() && relatorio.getGroupByDirectionDescending())
//			Collections.reverse(groupNames);
//		for (String groupName : groupNames) {
//			body.appendChild(createReportGroup(groupName, groups.get(groupName)));
//		}
//		body.appendChild(hr);
//		Div tempoDeGeracaoDiv = new Div();
//		tempoDeGeracaoDiv.setStyle("height: 40px;");
//
//		Div tempoDeGeracaoDivLeft = new Div();
//		tempoDeGeracaoDivLeft.setStyle("float: left;");
//		SimpleDateFormat mascara = new SimpleDateFormat("hh/MM/yyyy HH:mm:ss");
//		if (!this.relatorio.isTesting())
//			tempoDeGeracaoDivLeft.appendChild(new Span().appendText("Gerado em: " + mascara.format(inicio)));
//
//		Div tempoDeGeracaoDivRight = new Div();
//		tempoDeGeracaoDivRight.setStyle("float: right;");
//		Date fim = new Date();
//		tempoDeGeracaoDivRight.appendChild(new Span()
//				.appendText(("Tempo de geração: " + (fim.getTime() - inicio.getTime()) / 1000) + " segundos"));
//		tempoDeGeracaoDiv.appendChild(tempoDeGeracaoDivLeft);
//		tempoDeGeracaoDiv.appendChild(tempoDeGeracaoDivRight);
//		body.appendChild(tempoDeGeracaoDiv);
//		body.appendChild(new P().appendText(relatorio.getFooter()));
//		html.appendChild(body);
//		return html.write();
//	}
//
//	private Map<String, List<RespostaEntity>> splitRespostasInGroups(List<RespostaEntity> respostas) {
//		Map<String, List<RespostaEntity>> groups = new HashMap<String, List<RespostaEntity>>();
//		if (!relatorio.hasGroupBy()) {
//			groups.put("", respostas);
//			return groups;
//		}
//		String field = relatorio.getGroupByField();
//		for (RespostaEntity resposta : respostas) {
//			String groupName = resposta.getRespostasAsMap().get(field);
//			if (groupName == null)
//				continue;
//			if ("checkbox".equals(this.mapaDosCamposTypeField.get(field))) {
//				ObjectMapper mapper = new ObjectMapper();
//				try {
//					List<String> groupsOfField = mapper.readValue(groupName, new TypeReference<List<String>>() {
//					});
//					for (String groupOfField : groupsOfField) {
//						List<RespostaEntity> respostasDoGrupo = groups.get(groupOfField);
//						if (respostasDoGrupo == null)
//							respostasDoGrupo = new ArrayList<RespostaEntity>();
//						respostasDoGrupo.add(resposta);
//						groups.put(groupOfField, respostasDoGrupo);
//					}
//				} catch (JsonParseException e) {
//					e.printStackTrace();
//				} catch (JsonMappingException e) {
//					e.printStackTrace();
//				} catch (IOException e) {
//					e.printStackTrace();
//				}
//			} else {
//				List<RespostaEntity> respostasDoGrupo = groups.get(groupName);
//				if (respostasDoGrupo == null)
//					respostasDoGrupo = new ArrayList<RespostaEntity>();
//				respostasDoGrupo.add(resposta);
//				groups.put(groupName, respostasDoGrupo);
//			}
//		}
//		return groups;
//	}
//
//	private Div createReportGroup(String groupName, List<RespostaEntity> respostas) {
//		Div div = new Div();
//		H5 nomeDoGrupo = new H5();
//		nomeDoGrupo.appendText(groupName + " (" + respostas.size() + ")");
//
//		if (relatorio.getTipo().equals("Analítico")) {
//			if (!groupName.isEmpty())
//				div.appendChild(nomeDoGrupo);
//			if (!groupName.isEmpty())
//				div.appendText("<hr/>");
//			div.appendChild(createTableAnalitico(respostas));
//		}
//		if (relatorio.getTipo().equals("Sintético")) {
//			if (!groupName.isEmpty())
//				div.appendChild(nomeDoGrupo);
//			if (!groupName.isEmpty())
//				div.appendText("<hr/>");
//			div.appendChild(createTableSintetico(respostas));
//		}
//		if (relatorio.getTipo().equals("Gráfico")) {
//			if (!groupName.isEmpty())
//				div.appendChild(nomeDoGrupo);
//			if (!groupName.isEmpty())
//				div.appendText("<hr/>");
//			div.appendChild(createTableGrafico(respostas));
//		}
//		if (!groupName.isEmpty())
//			div.appendText("<hr/>");
//		return div;
//	}
//
//	private Table createTableAnalitico(List<RespostaEntity> respostas) {
//		List<Map<String, String>> map = orderData(respostas);
//		Table analitico = new Table();
//		analitico.appendChild(this.createHeader());
//		Tbody tbody = new Tbody();
//		for (Map<String, String> resposta : map) {
//			Tr row = this.createRowAnalitico(resposta);
//			if (row != null)
//				tbody.appendChild(row);
//		}
//		analitico.appendChild(tbody);
//		return analitico;
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
//
//	public Thead createHeader() {
//		Thead thead = new Thead();
//		Tr tr = new Tr();
//		List<Map<String, Object>> modelo = relatorio.getModeloAsMap();
//		for (Map<String, Object> coluna : modelo) {
//			String filter = (String) coluna.get("filter");
//			String largura = (String) coluna.get("width");
//			Th th = new Th();
//			if (largura != null && !largura.isEmpty())
//				th.setWidth(largura);
//			th.appendText(coluna.get("displayName") + this.formatFilter(filter));
//			tr.appendChild(th);
//		}
//		thead.appendChild(tr);
//		return thead;
//	}
//
//	private String formatFilter(String filter) {
//		return (filter != null && !filter.isEmpty()) ? " (" + filter + ")" : "";
//	}
//
//	public Tr createRowAnalitico(Map<String, String> respostasMap) {
//		Tr tr = new Tr();
//		List<Map<String, Object>> modelo = relatorio.getModeloAsMap();
//		for (Map<String, Object> coluna : modelo) {
//			String resposta = (respostasMap.get(coluna.get("field")) != null) ? respostasMap.get(coluna.get("field"))
//					: (String) coluna.get("default");
//			if (resposta == null) {
//				tr.appendChild(new Td());
//				continue;
//			}
//			String filtro = (String) coluna.get("filter");
//			if (perguntaFoiRespondidaMasNaoFoiFiltrada(resposta, filtro))
//				return null;
//			String formato = (String) coluna.get("format");
//			resposta = formatar(resposta, formato);
//			if ("group".equals(this.mapaDosCamposTypeField.get(coluna.get("field")))) {
//				Table grupos = agrupar((String) coluna.get("field"), resposta);
//				tr.appendChild(new Td().appendChild(grupos));
//			} else {
//				tr.appendChild(new Td().appendText(resposta));
//			}
//		}
//		return tr;
//	}
//
//	public Table agrupar(String field, String resposta) {
//		Table table = new Table();
//		List<String> fields = new ArrayList<String>();
//		Tr tr = new Tr();
//		for (Map<String, Object> pergunta : this.relatorio.getFormulario().getMetadataAsMap()) {
//			if (pergunta.get("group") != null && pergunta.get("group").equals(field)) {
//				fields.add((String) pergunta.get("field"));
//				tr.appendChild(new Th().appendText((String) pergunta.get("displayName")));
//			}
//		}
//		table.appendChild(tr);
//
//		ObjectMapper mapper = new ObjectMapper();
//		try {
//			List<Map<String, String>> listaDeGrupos = mapper.readValue(resposta,
//					new TypeReference<List<Map<String, String>>>() {
//					});
//			for (Map<String, String> grupos : listaDeGrupos) {
//				Tr grupoTr = new Tr();
//				for (String key : fields) {
//					grupoTr.appendChild(new Td().appendText(grupos.get(key)));
//				}
//				table.appendChild(grupoTr);
//			}
//		} catch (JsonParseException e) {
//			e.printStackTrace();
//		} catch (JsonMappingException e) {
//			e.printStackTrace();
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		return table;
//	}
//
//	private boolean perguntaFoiRespondidaMasNaoFoiFiltrada(String resposta, String filtro) {
//		if (filtro == null)
//			return false;
//		if (filtro.isEmpty())
//			return false;
//		if (resposta == null)
//			return true;
//		return !(resposta.equals(filtro));
//	}
//
//	private String formatar(String resposta, String formato) {
//		if (resposta == null || formato == null)
//			return resposta;
//		if (formato.equals("lowercase"))
//			return resposta.toLowerCase();
//		if (formato.equals("uppercase"))
//			return resposta.toUpperCase();
//		if (formato.equals("initcap"))
//			return WordUtils.capitalizeFully(resposta);
//		return resposta;
//	}
//
//	private Table createTableSintetico(List<RespostaEntity> respostas) {
//		Table sintetico = new Table();
//		Tbody estatisticasTbody = new Tbody();
//		List<Map<String, Object>> modelo = relatorio.getModeloAsMap();
//		for (Map<String, Object> coluna : modelo) {
//			List<Tr> rows = this.createRowSintetico((String) coluna.get("field"), respostas);
//			if (rows == null)
//				continue;
//			for (Tr row : rows) {
//				estatisticasTbody.appendChild(row);
//			}
//		}
//		sintetico.appendChild(estatisticasTbody);
//		return sintetico;
//	}
//
//	public List<Tr> createRowSintetico(String field, List<RespostaEntity> respostas) {
//		List<Tr> trList = new ArrayList<Tr>();
//		FormularioEntity formulario = relatorio.getFormulario();
//		StatisticsCalculator statistics = new StatisticsCalculator(formulario);
//		if (!statistics.getFields().contains(field))
//			return null;
//		Tr pergunta = new Tr();
//		Th titulo = new Th();
//		titulo.setColspan("3");
//		pergunta.appendChild(titulo.appendText("<b>" + mapaDosCamposFieldDisplayName.get(field) + "</b>"));
//		trList.add(pergunta);
//
//		Tr header = new Tr();
//		header.appendChild(new Td().appendText("Respostas"));
//		Td percentualHeader = new Td();
//		header.appendChild(percentualHeader.appendText("Percentual"));
//		Td totalHeader = new Td();
//		header.appendChild(totalHeader.appendText("Total"));
//		trList.add(header);
//
//		Map<String, Double> statisticasMap = statistics.calculateStatistics(field, respostas);
//		Map<String, Double> valuesMap = statistics.calculateValues(field, respostas);
//		for (String key : statisticasMap.keySet()) {
//			Tr opcao = new Tr();
//			Td respostaCelula = new Td();
//			opcao.appendChild(respostaCelula.appendText(key));
//			Td percentualCelula = new Td();
//			opcao.appendChild(percentualCelula.appendText(Math.round(statisticasMap.get(key)) + "%"));
//			Td totalCelula = new Td();
//			opcao.appendChild(totalCelula.appendText(Math.round(valuesMap.get(key)) + ""));
//			trList.add(opcao);
//		}
//		return trList;
//	}
//
//	private Div createTableGrafico(List<RespostaEntity> respostas) {
//		Div graficos = new Div();
//		List<Map<String, Object>> modelo = relatorio.getModeloAsMap();
//		for (Map<String, Object> coluna : modelo) {
//			Div grafico = this.createRowGrafico((String) coluna.get("field"), respostas);
//			if (grafico == null)
//				continue;
//			graficos.appendChild(grafico);
//		}
//		return graficos;
//	}
//
//	public Div createRowGrafico(String field, List<RespostaEntity> respostas) {
//		Div grafico = new Div();
//		FormularioEntity formulario = relatorio.getFormulario();
//		StatisticsCalculator statistics = new StatisticsCalculator(formulario);
//		if (!statistics.getFields().contains(field))
//			return null;
//
//		List<Slice> slices = new ArrayList<Slice>();
//		Map<String, Double> statisticasMap = statistics.calculateStatistics(field, respostas);
//		for (String key : statisticasMap.keySet()) {
//			slices.add(new Slice(key, Math.round(statisticasMap.get(key))));
//		}
//		try {
//			String img = chartManager.drawPie(mapaDosCamposFieldDisplayName.get(field), slices);
//			grafico.appendText("<img src='data:image/jpg;base64," + img + "'/>");
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		return grafico;
//	}
//}