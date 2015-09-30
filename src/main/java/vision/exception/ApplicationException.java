package vision.exception;

public class ApplicationException extends RuntimeException {

	private static final long serialVersionUID = -8476025208441229710L;

	public ApplicationException() {
		super();
	}

	public ApplicationException(String message) {
		super(message);
	}

	public ApplicationException(String message, Throwable cause) {
		super(message, cause);
	}
	
}