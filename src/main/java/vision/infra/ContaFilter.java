//package vision.infra;
//
//import javax.sql.DataSource;
//
//import org.hibernate.SessionFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//
//import br.com.gennera.professor.entidade.auth.Conta;
//import br.com.gennera.professor.security.PrincipalHolder;
//
//@Component
//public class ContaFilter {
//	
//	@Autowired
//	private SessionFactory sessionFactory;
//
//	@Autowired
//	private GenneraPrincipalHolder principalHolder;
//	
//	@Autowired
//	private DataSource dataSource;
//
//	public void enable() {
//		sessionFactory.getCurrentSession().enableFilter(Conta.FILTER_NAME).setParameterList("contas", principalHolder.getContasIds());
//	}
//
//	public void disable() {
//		sessionFactory.getCurrentSession().disableFilter(Conta.FILTER_NAME);
//	}
//
//}