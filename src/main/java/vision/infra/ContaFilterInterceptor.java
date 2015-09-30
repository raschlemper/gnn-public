//package vision.infra;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
//
//public class ContaFilterInterceptor extends HandlerInterceptorAdapter {
//	
//    @Autowired
//    private ContaFilter filter;
//
//    @Override
//    public boolean preHandle(final HttpServletRequest request, final HttpServletResponse response, final Object handler) throws Exception {
//    	filter.enable();
//    	return true;
//    }
//
//    @Override
//    public void afterCompletion(final HttpServletRequest request, final HttpServletResponse response, final Object handler, final Exception ex) throws Exception {
//    	filter.disable();
//    }
//}