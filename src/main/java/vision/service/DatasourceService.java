package vision.service;

import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vision.domain.DatasourceEntity;
import vision.domain.GenericRepository;
import vision.exception.FonteDadosException;
import vision.infra.FonteDadosConverter;
import vision.infra.HttpClientHelper;
import vision.infra.JsonConverter;

@Service
public class DatasourceService {
	
	@Autowired private GenericRepository repository;
	@Autowired private HttpClientHelper httpHelper;	
	
	private JsonConverter jsonConverter = new JsonConverter();
	private FonteDadosConverter fonteDadosConverter = new FonteDadosConverter();
	
	
	public List<DatasourceEntity> getFontes() {
		return repository.getAll(DatasourceEntity.class);
	}
	
	public List<DatasourceEntity> getFontesByModulo(Long idModulo){
		return repository.findAllByIdModulo(DatasourceEntity.class, idModulo);
	}

	public void saveFonte(DatasourceEntity fonte) {
		fonte.generateHash(repository.getCliente());
		repository.save(fonte);
	}

	public void updateFonte(DatasourceEntity fonte) {
		repository.update(fonte);
	}

	public void deleteFonte(Long id) {
		repository.delete(DatasourceEntity.class, id);
	}
	
	public String executarFonte(String hash, String params) throws FonteDadosException {
		DatasourceEntity entity = repository.findByHash(DatasourceEntity.class, hash);
		
		if (entity == null)
			throw new FonteDadosException("Fonte de dados inexistente.");
		
		return jsonConverter.toJson(convertResultJsonUsingFonteDadosConverter(entity, execute(entity, params)));
	}

	public String testFonte(String hash, String params) throws FonteDadosException {
		DatasourceEntity entity = repository.findByHash(DatasourceEntity.class, hash);
		if (entity == null) throw new FonteDadosException("Fonte de dados inexistente.");
		return generateWebServiceTestObject(entity, execute(entity, params));
	}
	
	private String execute(DatasourceEntity entity, String params) throws FonteDadosException {
		return callToWebService(params, entity);
	}

	private String callToWebService(String params, DatasourceEntity entity) throws FonteDadosException {
		String method = entity.getMethod();
		
		if (method.equalsIgnoreCase("GET")) 
			return httpGET(entity, params);
		if (method.equalsIgnoreCase("POST")) 
			return httpPOST(entity, params);
		
		throw new FonteDadosException("Método '" + entity.getMethod() + "' não implementado.");
	}
	
	private String httpGET(DatasourceEntity entity, String params) {
		return httpHelper.get(entity.getUrl(), entity.getFormat(), entity.getHeader(), entity.getParameter(), params);
	}
	
	private String httpPOST(DatasourceEntity entity, String params) {
		return httpHelper.post(entity.getUrl(), entity.getFormat(), entity.getHeader(), entity.getParameter(), params);
	}
	
	private String generateWebServiceTestObject(DatasourceEntity entity, String resultJson) {
		LinkedHashMap<String, List<LinkedHashMap<String, Object>>> result = new LinkedHashMap<String, List<LinkedHashMap<String, Object>>>();
		result.put("original", jsonConverter.toListOfMaps(resultJson));
		result.put("converted", convertResultJsonUsingFonteDadosConverter(entity, resultJson));
		
		return jsonConverter.toJson(result);
	}
	
	private List<LinkedHashMap<String, Object>> convertResultJsonUsingFonteDadosConverter(DatasourceEntity entity, String resultJson) {
		List<LinkedHashMap<String, Object>> resultMaps = jsonConverter.toListOfMaps(resultJson);
		List<LinkedHashMap<String, Object>> converterMaps = jsonConverter.toListOfMaps(entity.getConverter());
		
		return fonteDadosConverter.convertListOfMaps(resultMaps, converterMaps);
	}

	public DatasourceEntity getFonte(String hash) {
		return repository.findByHash(DatasourceEntity.class, hash);
	}
}