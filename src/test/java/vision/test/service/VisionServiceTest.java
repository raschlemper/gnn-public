package vision.test.service;

import java.util.List;

import org.apache.log4j.Layout;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.util.Assert;

import vision.domain.GenericRepository;
import vision.domain.Vision;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:vision-test-config.xml")
public class VisionServiceTest {
	
    @Autowired
    private GenericRepository repository;
    
	@Test
	public void getAllTest(){
		repository.beginTransaction();
		List<Vision> visions = repository.getAll(Vision.class);
		Assert.notEmpty(visions);
		repository.getSession().close();
	} 
	
	@Test
	public void getById(){
		repository.beginTransaction();
		Long id = (long) 1;
		Vision vision = repository.findById(Vision.class, id);
		Assert.notNull(vision);
		repository.getSession().close();
	}
	
	@Test
	public void save(){
		repository.beginTransaction();
		Vision vision = new Vision();
		repository.save(vision);
		repository.commit();
		repository.getSession().close();
	}
	
	@Test
	public void delete(){
		repository.beginTransaction();
		Long id = (long) 1;
		Vision vision = repository.findById(Vision.class, id);
		repository.delete(vision);
		repository.commit();
		Assert.isNull(repository.findById(Vision.class, id));
		repository.getSession().close();
	}

}
