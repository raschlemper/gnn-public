package vision.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import vision.domain.Campo;
import vision.domain.GenericRepository;

@Service
public class CampoService {

	@Autowired 
	private GenericRepository repository;
	
	@Transactional
	public List<Campo> getAll() {
		List<Campo> campos = repository.getAll(Campo.class);
		return campos;
	}
	
	@Transactional
	public Campo getById(Long id){
		return repository.findById(Campo.class, id);
	}
	
	@Transactional
	public void saveModelo(Campo campo){
		 repository.save(campo);
	}
	
	@Transactional
	public void deleteModelo(Campo campo) {
		repository.delete(campo);
	}
}

