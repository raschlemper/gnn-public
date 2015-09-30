package vision.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import vision.domain.GenericRepository;
import vision.domain.Vision;
import vision.exception.ApplicationException;

@Service("visionService")
public class VisionService  {
	
	@Autowired
	private GenericRepository repository;
	
	public List<Vision> getAll(Long idModulo) {
		List<Vision> visions = repository.findAllByIdModulo(Vision.class, idModulo);
		return visions;
	}
	
	public Vision getById(Long id){
		return repository.findById(Vision.class, id);
	}
	
	public Vision getByHashid(String hashid){
		return repository.findByHash(Vision.class, hashid);
	}
	
	@Transactional
	public void saveVision(Vision vision){
		 try {
			vision.generateHash(repository.getCliente());
			if(getByHashid(vision.getHash()) != null){
				throw new ApplicationException("Já existe uma visão gravada com o mesmo identificador!");
			}
			repository.save(vision);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@Transactional
	public void updateVision(Vision vision){
		try {
			repository.update(vision);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@Transactional
	public void deleteVision(Vision vision) {
		repository.delete(vision);
	}

}
