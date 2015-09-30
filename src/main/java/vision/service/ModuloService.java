package vision.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import vision.domain.DatasourceEntity;
import vision.domain.GenericRepository;
import vision.domain.Modulo;
import vision.exception.ApplicationException;

@Service("moduloService")
public class ModuloService {
	
	@Autowired
	private GenericRepository repository;
	
	public List<Modulo> getAll() {
		List<Modulo> modulos = repository.getAll(Modulo.class);
		return modulos;
	}
	
	public Modulo getById(Long id){
		return repository.findById(Modulo.class, id);
	}
	
	public Modulo getByHashid(String hashid){
		return repository.findByHash(Modulo.class, hashid);
	}
	
	@Transactional
	public void saveModulo(Modulo modulo){
		 try {
			modulo.generateHash(repository.getCliente());
			generateHashDatasource(modulo);
			if(getByHashid(modulo.getHash()) != null){
				throw new ApplicationException("Já existe um módulo gravado com o mesmo identificador!");
			}
			repository.save(modulo);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@Transactional
	public void updateModulo(Modulo modulo){
		try {
			generateHashDatasource(modulo);
			repository.update(modulo);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	private void generateHashDatasource(Modulo modulo) {
		for (DatasourceEntity datasource : modulo.getDatasources()) {
			if(datasource.getId() == null){
				datasource.generateHash(repository.getCliente());
			}
			datasource.setModulo(modulo);
		}
	}
	
	@Transactional
	public void deleteModulo(Modulo modulo) {
		repository.delete(modulo);
	}


}
