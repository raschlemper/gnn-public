package vision.infra;

import java.sql.Connection;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.hibernate.SessionFactory;
import org.hibernate.context.ThreadLocalSessionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.datasource.lookup.JndiDataSourceLookup;
import org.springframework.stereotype.Component;

@Component
public class DatasourceBinder {
	
	@Autowired
	private SessionFactory sessionFactory;
	
	private JndiDataSourceLookup jndiDataSourceLookup = new JndiDataSourceLookup();

	public void bind(Long nmCache) {
		try {
			ThreadLocalSessionContext.bind(sessionFactory.openSession(getConnection(nmCache)));
		} catch (SQLException e) {
			
		}
	}

	public void unbind() {
		try {
			final Connection connection = sessionFactory.getCurrentSession().close();
			if (connection != null) {
				connection.close();
			}
			ThreadLocalSessionContext.unbind(sessionFactory);
		} catch (SQLException e) {
		}
	}

	public Connection getConnection(Long nmCache) throws SQLException {
		return getJNDIDataSource(nmCache).getConnection();
	}

	private DataSource getJNDIDataSource(Long nmCache) {
		if (nmCache > 8000) {
			return jndiDataSourceLookup.getDataSource("java:jdbc/BA0" + nmCache);
		}
		if (nmCache > 7000) {
			return jndiDataSourceLookup.getDataSource("java:jdbc/BT0" + nmCache);
		}
		if (nmCache > 5000) {
			return jndiDataSourceLookup.getDataSource("java:jdbc/BP0" + nmCache);
		}
		return jndiDataSourceLookup.getDataSource("java:jdbc/BD0" + nmCache);
	}
}
