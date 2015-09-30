package vision.infra;

public class HttpMessage {
	
	public String fromStatusCode(Integer status) {
		switch (status) {
			case 400:
				return "Status 400: Requisição inválida.";
			case 401:
				return "Status 401: Não autorizado.";
			case 403:
				return "Status 403: Proibido.";
			case 404:
				return "Status 404: Recurso não encontrado.";
			case 500:
				return "Status 500: Erro interno do servidor.";
			case 503:
				return "Status 503: Recurso não disponível.";
			default:
				return "Status " + status;
		}
	}
	
}
