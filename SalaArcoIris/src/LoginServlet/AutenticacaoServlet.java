package LoginServlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

 
import br.com.salaarcoiris.bd.Conexao;
import br.com.salaarcoiris.jdbc.JDBCAutenticaDAO;
import br.com.salaarcoiris.modelo.Usuario;

import java.sql.Connection;
//import com.sun.xml.internal.messaging.saaj.util.Base64;
import org.apache.commons.codec.digest.DigestUtils;

/**
 * Servlet implementation class AutenticacaoServlet
 */
public class AutenticacaoServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private void process(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		Usuario dadosautentica = new Usuario();

		dadosautentica.setEmailUsuario(request.getParameter("emailUsuario"));
		dadosautentica.setSenhaUsuario(request.getParameter("senhaUsuario"));

		String sha256hex = DigestUtils.sha256Hex(request.getParameter("senhaUsuario"));		

		dadosautentica.setSenhaUsuario(sha256hex);
		
		Conexao conec = new Conexao();
		Connection conexao = conec.abrirConexao();
		
		JDBCAutenticaDAO jdbAutentica = new JDBCAutenticaDAO(conexao);
		boolean retorno = jdbAutentica.consultar(dadosautentica);

		if (retorno) {
			HttpSession sessao = request.getSession();
			sessao.setAttribute("login", request.getParameter("emailUsuario"));
			response.sendRedirect("pages/home/home.html");
		} else {
			response.sendRedirect("index.html");
		}

	}
	/**
	 * @see HttpServlet#HttpServlet()
	 */
	// public AutenticacaoServlet() {
	// super();
	// // TODO Auto-generated constructor stub
	// }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		// response.getWriter().append("Served at: ").append(request.getContextPath());
		process(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		// doGet(request, response);
		process(request, response);
	}

}
