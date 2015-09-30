package vision.infra;


public class NameConverter {
	
	public static String convertName(String name) {
		return (name + "_" + System.currentTimeMillis()).replace(" ", "_").replace(".", "_").replace("__", "_");
	}
	
	public static String convertNameWithExtension(String name) {
		return name.replace(" ", "_").replace("__", "_");
	}
}
