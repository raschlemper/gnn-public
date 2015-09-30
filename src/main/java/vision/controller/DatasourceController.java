package vision.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.HttpClientErrorException;

import vision.domain.DatasourceEntity;
import vision.infra.HttpMessage;
import vision.service.DatasourceService;

@Controller
public class DatasourceController {
	
	@Autowired
	private DatasourceService service;
	
	private HttpMessage httpMessage = new HttpMessage();
	
	@RequestMapping(value = "/datasources" , method = RequestMethod.GET)
	@ResponseBody
	public List<DatasourceEntity> getFontes() throws IOException {
		return service.getFontes();
	}
	
	@RequestMapping(value = "/datasources" , method = RequestMethod.POST)
	@ResponseBody
	public void saveFonte(@RequestBody final DatasourceEntity fonte) throws IOException {
		service.saveFonte(fonte);
	}
	
	@RequestMapping(value = "/datasources/{id}" , method = RequestMethod.PUT)
	@ResponseBody
	public void updateFonte(@PathVariable Long id, @RequestBody final DatasourceEntity fonte) throws IOException {
		service.updateFonte(fonte);
	}
	
	@RequestMapping(value = "/datasources/{id}" , method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteFonte(@PathVariable Long id) throws IOException {
		service.deleteFonte(id);
	}
	
	@RequestMapping(value = "/datasources/{hash}/prod", method = RequestMethod.POST, produces="application/json;charset=UTF-8")
	@ResponseBody
	public String prodFonte(final HttpServletResponse response, @PathVariable String hash, @RequestBody final String params) throws Exception {
		try {
			return service.executarFonte(hash, params);
		} catch(HttpClientErrorException e) {
			response.setStatus(e.getStatusCode().value());
			return httpMessage.fromStatusCode(e.getStatusCode().value());
		}
	}
	
	@RequestMapping(value = "/datasources/{hash}/test", method = RequestMethod.POST, produces="application/json;charset=UTF-8")
	@ResponseBody
	public String testFonte(final HttpServletResponse response, @PathVariable String hash, @RequestBody final String params) throws Exception {
		try {
			return service.testFonte(hash, params);
		} catch(HttpClientErrorException e) {
			response.setStatus(e.getStatusCode().value());
			return httpMessage.fromStatusCode(e.getStatusCode().value());
		}
	}
	
}