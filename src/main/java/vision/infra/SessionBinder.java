package vision.infra;

import java.sql.Connection;
import java.sql.SQLException;

import javax.persistence.EntityManager;
import javax.sql.DataSource;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.context.ThreadLocalSessionContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.datasource.lookup.JndiDataSourceLookup;
import org.springframework.stereotype.Component;


@Component
public class SessionBinder {

	private static final Logger logger = LoggerFactory.getLogger(SessionBinder.class);
	
	@Autowired
	private SessionFactory sessionFactory;
	
	@Autowired
	private GenneraPrincipalHolder genneraPrincipalHolder;
	
	private JndiDataSourceLookup jndiDataSourceLookup = new JndiDataSourceLookup();

	public void bind() {
		if (!genneraPrincipalHolder.hasInformation()) return;
		try { 
			ThreadLocalSessionContext.bind(sessionFactory.openSession(getConnection()));
		} catch (SQLException e) {
			logger.error(e.getMessage());
		}
	}

	public void unbind() {
		try {
			final Connection connection = sessionFactory.getCurrentSession().close();
			if (connection != null) {
				logger.debug("Closing connection.");
				connection.close();
			}
			ThreadLocalSessionContext.unbind(sessionFactory);
		} catch (SQLException e) {
			logger.error(e.getMessage());
		}
	}

	public Connection getConnection() throws SQLException {
		logger.debug("Creating connection.");
		return getJNDIDataSource().getConnection();
	}

	private DataSource getJNDIDataSource() {
		return jndiDataSourceLookup.getDataSource("java:jdbc/" + genneraPrincipalHolder.getPrincipal().getNomeCache());
	}
}
