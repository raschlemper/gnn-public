package vision.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import vision.domain.Campo;
import vision.service.CampoService;

@Controller
@RequestMapping("/public/api")
public class CampoController {
	
	private final Logger log = LoggerFactory.getLogger(CampoController.class);
	
	@Autowired
	private CampoService service;

	@RequestMapping(value = "/campos", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<Campo> getAll() {
		log.debug("Requisição REST para retornar todos os campos");
		List<Campo> campos = null;
		try {
			campos = service.getAll();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return campos;
	}
	
	@RequestMapping(value = "/campos/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Campo getById(@PathVariable("id") Long id) {
		log.debug("Requisição REST para retornar o campo passando o id");
		Campo campo = null;
		try {
			campo = service.getById(id);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return campo;
	}
	
}
