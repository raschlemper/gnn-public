package vision.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import vision.domain.DatasourceEntity;
import vision.domain.Modulo;
import vision.exception.ApplicationException;
import vision.service.DatasourceService;
import vision.service.ModuloService;

@Controller
public class ModuloController {
	
	private final Logger log = LoggerFactory.getLogger(ModuloController.class);

	@Autowired
	private ModuloService service;
	
	@Autowired
	private DatasourceService datasourceService;

	/**
	 * GET /modulos -> get todas as vis�es
	 */
	
	@RequestMapping(value = "/modulos", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<Modulo> getAll() {
		log.debug("Requisição REST para retornar todas as módulos");
		List<Modulo> modulosLazy  = null;
		List<Modulo> modulos = new ArrayList<Modulo>();
		try {
			 modulosLazy = service.getAll();
			 for (Modulo modulo : modulosLazy) {
				 modulo.setDatasources(datasourceService.getFontesByModulo(modulo.getId()));
				 modulos.add(modulo);
			 }
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return modulos;
	}

	
	@RequestMapping(value = "/modulos/{hashid}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<Modulo> getByHashid(@PathVariable("hashid") String hashid) {
		log.debug("Requisição REST para retornar uma módulo passando o hashid");
		Modulo modulo = null;
		try {
			modulo = service.getByHashid(hashid);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return new ResponseEntity<Modulo>(modulo, HttpStatus.OK);
	}
	
    @RequestMapping(value = "/modulos", method = RequestMethod.POST ,  produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<?> salvaModulo(@RequestBody Modulo modulo, HttpServletRequest request)
            throws Exception {
    		try {
    			log.debug("Requisição REST para gravar um módulo");
				service.saveModulo(modulo);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
         return new ResponseEntity<Modulo>(HttpStatus.CREATED);
    }
    
    @RequestMapping(value = "/modulos/{id}", method = RequestMethod.PUT ,  produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<?> updateModulo(@PathVariable Long id, @RequestBody final Modulo modulo,  HttpServletRequest request)
            throws Exception {  
    		try {
    			log.debug("Requisição REST para atualizar um módulo");
				service.updateModulo(modulo);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
         return new ResponseEntity<Modulo>(HttpStatus.CREATED);
    }
    
    @RequestMapping(value = "/modulos/{id}", method = RequestMethod.DELETE ,  produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<?> deleteModulo(@PathVariable("id") Long id, HttpServletRequest request)
            throws Exception {
    		try {
    			log.debug("Requisição REST para deletar um módulo");
    			Modulo moduloRemove = service.getById(id);
				service.deleteModulo(moduloRemove);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
         return new ResponseEntity<Modulo>(HttpStatus.CREATED);
    }
    
    @RequestMapping(value = "/modulos/{hash}/datasources", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<DatasourceEntity> getDatasourcesById(@PathVariable("hash") String hash)
            throws Exception {
    		List<DatasourceEntity> datasources = new ArrayList<DatasourceEntity>();
    		try {
    			log.debug("Requisição REST para recuperar datasources passando o hashid do módulo");
    			Modulo modulo = service.getByHashid(hash);
    			datasources = datasourceService.getFontesByModulo(modulo.getId());
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
    	return datasources;
    }
    

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(value = HttpStatus.FORBIDDEN)
    @ResponseBody
    public String handleException(HttpServletRequest req, RuntimeException ex) {
        return "{\"reason\":\""+ ex.getMessage()+ "\"}";
    }

    @ExceptionHandler(ApplicationException.class)
    @ResponseStatus(value = HttpStatus.UNPROCESSABLE_ENTITY)
    @ResponseBody
    public String handleApplicationException(ApplicationException ex) {
    	log.error(ex.getMessage());
        return "{\"reason\":\""+ ex.getMessage()+ "\"}";
    }
    
    @ExceptionHandler
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public String handleRuntimeException(RuntimeException ex) {
    	log.error(ex.getMessage());
        return "{\"reason\":\""+ ex.getMessage()+ "\"}";
    }
    
    @ExceptionHandler
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public String handleException(Exception ex) {
    	log.error(ex.getLocalizedMessage());
        return "{\"reason\":\""+ ex.getMessage()+ "\"}";
    }
}
