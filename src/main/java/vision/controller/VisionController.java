package vision.controller;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import vision.domain.Modulo;
import vision.domain.Vision;
import vision.exception.ApplicationException;
import vision.service.ModuloService;
import vision.service.VisionService;

@Controller
public class VisionController {

	private final Logger log = LoggerFactory.getLogger(VisionController.class);

	@Autowired
	private VisionService service;
	
	@Autowired
	private ModuloService moduloService;
	

	/**
	 * GET /visions -> get todas as vis�es
	 */
	
	@RequestMapping(value = "/visions", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<Vision> getAll(@RequestParam(value="modulo", required=true) String hashModulo) {
		log.debug("Requisição REST para retornar todas as visões");
		List<Vision> visions  = null;
		try {
			 Modulo modulo = moduloService.getByHashid(hashModulo);
			 visions = service.getAll(modulo.getId());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return visions;
	}

	@RequestMapping(value = "/visions/{hashid}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<Vision> getByHashid(@PathVariable("hashid") String hashid) {
		log.debug("Requisição REST para retornar uma visão passando o hashid");
		Vision vision = null;
		try {
			vision = service.getByHashid(hashid);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return new ResponseEntity<Vision>(vision, HttpStatus.OK);
	}
	
    @RequestMapping(value = "/visions", method = RequestMethod.POST ,  produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<?> salvaVision(@RequestBody Vision vision, HttpServletRequest request)
            throws Exception {
    		try {
    			log.debug("Requisição REST para gravar uma visão");
				service.saveVision(vision);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
         return new ResponseEntity<Vision>(HttpStatus.CREATED);
    }
    
    @RequestMapping(value = "/visions/{hashid}", method = RequestMethod.PUT ,  produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<?> updateVision(@PathVariable("hashid") String hashid, @RequestBody Vision vision, HttpServletRequest request)
            throws Exception {
    		try {
    			log.debug("Requisição REST para atualizar uma visão");
				Vision visionUpdate = service.getByHashid(hashid);
				visionUpdate.setModel(vision.getModel());
				service.updateVision(visionUpdate);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
         return new ResponseEntity<Vision>(HttpStatus.CREATED);
    }
    
    @RequestMapping(value = "/visions/{hashid}", method = RequestMethod.DELETE ,  produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<?> deleteVision(@PathVariable("hashid") String hashid, HttpServletRequest request)
            throws Exception {
    		try {
    			log.debug("Requisição REST para deletar uma visão");
    			Vision visionRemove = service.getByHashid(hashid);
				service.deleteVision(visionRemove);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
         return new ResponseEntity<Vision>(HttpStatus.CREATED);
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
