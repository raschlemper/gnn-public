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

import vision.domain.Template;
import vision.service.TemplateService;

@Controller
@RequestMapping("/public/api")
public class TemplateController {
	
	private final Logger log = LoggerFactory.getLogger(VisionController.class);

	@Autowired
	private TemplateService service;
	
	@RequestMapping(value = "/templates", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<Template> getAll() {
		log.debug("Requisição REST para retornar todos os templates");
		List<Template> templates = null;
		try {
			templates = service.getAll();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return templates;
	}
	
	@RequestMapping(value = "/templates/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Template getById(@PathVariable("id") Long id) {
		log.debug("Requisição REST para retornar todas as visões");
		Template template = null;
		try {
			template = service.getById(id);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return template;
	}
	
	
}
