package vision.domain;

import java.io.Serializable;
import java.sql.DatabaseMetaData;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.MappingException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

@Repository()
@SuppressWarnings("unchecked")
public class GenericRepository {
	
	@Autowired
	@Qualifier("sessionFactory")
	private SessionFactory sessionFactory;
	
	public static class GenericNamedQuery{
		public static final String RETRIEVE_BY_USER = "retrieveByUser";
		public static final String RETRIEVE_BY_EXPRESSION = "retrieveByExpression";
	}
	
	public String getCliente() {
		try {
			DatabaseMetaData metaData = getSession().connection().getMetaData();
			String url = metaData.getURL();
			return url.substring(url.length() - 4);
		} catch(Exception e){
			
		}
		throw new RuntimeException();
	}
	
	public <T> Long count(Class<T> c) {
		return (Long) getSession().createCriteria(c).setProjection(Projections.rowCount()).uniqueResult();
	}
/*	
	 * Find/Get*/
	 
	public <T> T findByCriteria(Class<T> c, List<Criterion> restrictions, Order orderBy) {
		return (T) executeCriteria(c, restrictions, orderBy).uniqueResult();
	}
	
	public <T> List<T> findAllByCriteria(Class<T> c, List<Criterion> restrictions, Order orderBy) {
		return (List<T>) executeCriteria(c, restrictions, orderBy).list();
	}
	
	private <T> Criteria executeCriteria(Class<T> c, List<Criterion> restrictions, Order orderBy) {
		Criteria criteria = getSession().createCriteria(c);
		
		for (Criterion restriction : restrictions) {
			criteria.add(restriction);
		}
		
		if (orderBy != null)
			criteria.addOrder(orderBy);
		
		return criteria;
	}
	
	public <T> List<T> getAll(Class<T> c) {
		return getSession().createCriteria(c).setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY).list();
	}
	
	public <T> List<T> findByUser(final Class<?> clazz, final String userId){
		List<T> list = null;
		final String namedQuery = clazz.getSimpleName() + "." + GenericNamedQuery.RETRIEVE_BY_USER;
		try{
			list = getSession().getNamedQuery(namedQuery).setString("idUsuario", userId).list();
		} catch(MappingException me){
		}
		return list;
	}
	
	public <T> T findById(final Class<?> clazz, final Serializable id){
		return (T) getSession().get(clazz, id);
	}
	
	public <T> T findByIdUser(final Class<?> clazz, final Serializable id){
		return (T) sessionFactory.openSession().get(clazz, id);
	}
	
	public <T> T findByHash(final Class<?> clazz, String hash) {
		return (T) getSession().createCriteria(clazz).add(Restrictions.eq("hash", hash)).uniqueResult();
	}
	
	public <T> T findAllByIdModulo(final Class<?> clazz, Long idModulo) {
		return (T) getSession().createCriteria(clazz).add(Restrictions.eq("modulo.id", idModulo)).list();
	}
	
	public <T> T first(final Class<?> clazz) {
		return (T) getSession().createCriteria(clazz).setMaxResults(1).uniqueResult();
	}
	
	public <T> T all(final Class<?> clazz) {
		return (T) getSession().createCriteria(clazz).list();
	}
	
	public <T> T all(final Class<?> clazz, final List<Criterion> criterions) {
		Criteria criteria = getSession().createCriteria(clazz);
		for (Criterion criterion : criterions) {
			criteria.add(criterion);
		}
		return (T) criteria.list();
	}
	
/*	
	 * Save*/
	 
	
	public void save(Object object) {
		getSession().save(object);
		flush();
	}
	
	public void persist(Object object) {
		getSession().persist(object);
		flush();
	}
	
	public void save(Object... entities) {
		for (Object entity : entities) {
			getSession().save(entity);			
			flush();
		}
	}
	
	public void saveOrUpdate(Object object) {
		getSession().saveOrUpdate(object);
		flush();
	}

	public void saveOrUpdate(Object... entities) {
		for (Object entity : entities) {
			getSession().saveOrUpdate(entity);
			flush();
		}
	}
	
/*	
	 * Update*/
	 
	
	public void update(Object entity) {
		getSession().update(entity);
		flush();
	}
	
	public void update(Object... entities) {
		for (Object entity : entities) {
			getSession().update(entity);
			flush();
		}
	}
	
	
/*	 * Merge
	 */
			
	public <T> T merge(T object) {
		T obj = (T) getSession().merge(object);
		flush();
		return obj;
	}

	public <T> void merge(T... entities) {
		for (T entity : entities) {
			getSession().merge(entity);
			flush();
		}
	}
	
	
/*	 * Delete*/
	 
	
	public void delete(Object object) {
		getSession().delete(object);
	}
	
	public void delete(Object... entities) {
		for (Object entity : entities)
			getSession().delete(entity);
	}
	
	public void delete(final Class<?> clazz, final Serializable id) {
		Object entity = this.findById(clazz, id);
		getSession().delete(entity);
		getSession().flush();
	}
	
	
/*	 * Flush, Clear, Commit, Rollback, ...*/
	 
	
	public void flush() {
		getSession().flush();
	}
	
	public void clear() {
		getSession().clear();
	}
	
	public void beginTransaction() {
		getSession().beginTransaction();
	}
	
	public void commit() {
		getSession().getTransaction().commit();
	}
	
	public void rollback() {
		getSession().getTransaction().rollback();
	}
	
	public Session getSession() {
		return sessionFactory.getCurrentSession();
	}
	
}
