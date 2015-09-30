package vision.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import vision.domain.GenericRepository;
import vision.domain.Template;

@Service("templateService")
public class TemplateService  {
	
	@Autowired
	private GenericRepository repository;
	
	@Transactional
	public List<Template> getAll() {
		List<Template> templates = repository.getAll(Template.class);
		return templates;
	}
	
	@Transactional
	public Template getById(Long id){
		return repository.findById(Template.class, id);
	}
	
	@Transactional
	public void saveLayout(Template template){
		 repository.save(template);
	}
	
	@Transactional
	public void deleteLayout(Template template) {
		repository.delete(template);
	}
	
}
