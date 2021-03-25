package LoginServlet;

import java.io.IOException;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

 
import br.com.salaarcoiris.bd.Conexao;
import br.com.salaarcoiris.jdbc.JDBCAutenticaDAO;
import br.com.salaarcoiris.modelo.Usuario;

import java.sql.Connection;
import com.sun.xml.internal.messaging.saaj.util.Base64;

/**
 * Servlet implementation class AutenticacaoServlet
 */
public class AutenticacaoServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private void process(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		Usuario dadosautentica = new Usuario();

		dadosautentica.setEmailUsuario(request.getParameter("usuario"));
		dadosautentica.setSenhaUsuario(request.getParameter("senha"));

		/*
		 * Desencriptando a senha enviada e armazenando na variável textodeserializado
		 */
		System.out.println(request.getParameter("senha"));
		String textodeserializado = new String(Base64.base64Decode(request.getParameter("senha")));
		System.out.println(textodeserializado);
		String sendm5 = "";
		MessageDigest md = null;

		try {
			/*
			 * Inicializando a conversão para o padrão de criptografia MDS Caso ocorra tudo
			 * certo codifica este padrão em bytes e armazena na variável md.
			 */
			md = MessageDigest.getInstance("MD5");
		} catch (NoSuchAlgorithmException e) {
			/*
			 * Caso dê algum problema na conversão uma mensagem de erro será disparada.
			 */
			e.printStackTrace();
		}
		/*
		 * Converte o valor do MD5 em Bytes para um hash de inteiros longos para que
		 * possa trabalhar com uma representação mais próxima de allto nível
		 */
		BigInteger hash = new BigInteger(1, md.digest(request.getParameter("senha").getBytes()));

		/*
		 * Converte esta representação em String para que possa armazenar a senha neste
		 * formato.
		 */

		sendm5 = hash.toString(16);
		dadosautentica.setSenhaUsuario(sendm5);
		// return sen;
		System.out.println("send MD5: " + sendm5);
		
		Conexao conec = new Conexao();
		Connection conexao = conec.abrirConexao();
		
		JDBCAutenticaDAO jdbAutentica = new JDBCAutenticaDAO(conexao);
		boolean retorno = jdbAutentica.consultar(dadosautentica);
		System.out.println(retorno);
		if (retorno) {
			HttpSession sessao = request.getSession();
			sessao.setAttribute("login", request.getParameter("usuario"));
			response.sendRedirect("index.html");
		} else {
			response.sendRedirect("erro.html");
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
