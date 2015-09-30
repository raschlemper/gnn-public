package vision.infra;
//package kapta.infra;
//
//import java.io.IOException;
//import java.lang.reflect.Field;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//import kapta.domain.RespostaEntity;
//import kapta.exception.VariableReplacerException;
//
//import org.codehaus.jackson.JsonParseException;
//import org.codehaus.jackson.map.JsonMappingException;
//import org.codehaus.jackson.map.ObjectMapper;
//import org.codehaus.jackson.type.TypeReference;
//
//public class VariableReplacer {
//	public static Map<String, String> extrairLayout(String json) throws VariableReplacerException {
//		try {
//			ObjectMapper mapper = new ObjectMapper();
//			Map<String,String> perguntasRespostas = new HashMap<String,String>();
//			List<Map<String, Object>> respostas = mapper.readValue(json, new TypeReference<List<Map<String, Object>>>() {});
//			for (Map<String, Object> map : respostas) {
//				if(map.get("displayName") != null && map.get("field") != null) perguntasRespostas.put(map.get("displayName").toString(), map.get("field").toString());
//			}
//			perguntasRespostas.put("Condição", "condicao");
//			perguntasRespostas.put("Detalhes da Condição", "condicaoDetalhes");
//			perguntasRespostas.put("Hash", "hash");
//			perguntasRespostas.put("Sala", "sala");
//			perguntasRespostas.put("Identificador", "id");
//			perguntasRespostas.put("Nota (Total)", "total");
//			perguntasRespostas.put("Posição", "posicao");
//			perguntasRespostas.put("Código Aluno", "codigoAluno");
//			perguntasRespostas.put("Número Matrícula", "numeroMatricula");
//			perguntasRespostas.put("Data de Criação", "dataCriacao");
//			perguntasRespostas.put("Data de Atualização", "dataAtualizacao");
//			return perguntasRespostas;
//		} catch (JsonParseException e) {
//			throw new VariableReplacerException(e);
//		} catch (JsonMappingException e) {
//			throw new VariableReplacerException(e);
//		} catch (IOException e) {
//			throw new VariableReplacerException(e);
//		}
//	}
//	
//	public static Map<String, Object> extrairRespostas(RespostaEntity resposta) throws VariableReplacerException {
//		try {
//			ObjectMapper mapper = new ObjectMapper();
//			Map<String, Object> respostas = mapper.readValue(resposta.getMetadata(), new TypeReference<Map<String, Object>>() {});
//			Class<? extends RespostaEntity> respostaClass = resposta.getClass();
//			for (Field field : respostaClass.getDeclaredFields()) {
//				field.setAccessible(true);
//				if (field.get(resposta) instanceof String) respostas.put(field.getName(), (String) field.get(resposta));
//			}
//			return respostas;
//		} catch (JsonParseException e) {
//			throw new VariableReplacerException(e);
//		} catch (JsonMappingException e) {
//			throw new VariableReplacerException(e);
//		} catch (IOException e) {
//			throw new VariableReplacerException(e);
//		} catch (IllegalArgumentException e) {
//			throw new VariableReplacerException(e);
//		} catch (IllegalAccessException e) {
//			throw new VariableReplacerException(e);
//		}
//	}
//	
//	public static String substituirVariaveis(String texto, String layout, RespostaEntity resposta) {
//		try {
//			Map<String, String> layoutMap = extrairLayout(layout);
//			Map<String, Object> respostasMap = extrairRespostas(resposta);
//			texto = substituirDisplayNamePorField(texto, layoutMap);
//			texto = substituirFieldPelaResposta(texto, respostasMap);
//			texto = limparFieldSemResposta(texto, layoutMap);
//		} catch (VariableReplacerException e) {
//			e.printStackTrace();
//		} catch (IllegalArgumentException e) {
//			e.printStackTrace();
//		} catch (SecurityException e) {
//			e.printStackTrace();
//		}
//		return texto;
//	}
//
//	private static String limparFieldSemResposta(String texto,
//			Map<String, String> layoutMap) {
//		for (String pergunta : layoutMap.keySet()) {
//			texto = texto.replace("'" + layoutMap.get(pergunta) + "'", "Indisponível");
//		}
//		return texto;
//	}
//
//	private static String substituirFieldPelaResposta(String texto, Map<String, Object> respostasMap) {
//		for (String pergunta : respostasMap.keySet()) {
//			Object valor = respostasMap.get(pergunta);
//			if (valor != null) texto = texto.replace("'" + pergunta + "'", valor.toString());
//		}
//		return texto;
//	}
//
//	private static String substituirDisplayNamePorField(String texto,
//			Map<String, String> layoutMap) {
//		for (String pergunta : layoutMap.keySet()) {
//			texto = texto.replace("'" + pergunta + "'", "'" + layoutMap.get(pergunta) + "'");
//		}
//		return texto;
//	}
//}
