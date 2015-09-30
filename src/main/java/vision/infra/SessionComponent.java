package vision.infra;

import java.lang.annotation.ElementType;
import java.lang.annotation.Target;

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;

@Target(ElementType.TYPE)
@Component
@Scope(value="session", proxyMode=ScopedProxyMode.TARGET_CLASS)
public @interface SessionComponent {
}
