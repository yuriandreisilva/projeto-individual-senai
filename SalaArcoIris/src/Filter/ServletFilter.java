package Filter;

import java.io.IOException;
import javax.servlet.*;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet implementation class ServletFilter
 */
//@WebServlet("/ServletFilter")
public class ServletFilter implements Filter {
       
    /**
     * @see HttpServlet#HttpServlet()
     */
	public void init(FilterConfig filterConfig) throws ServletException {

	}

	
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain)
			throws IOException, ServletException {
		
		String context = request.getServletContext().getContextPath();
		
		try {
			
			HttpSession session = ((HttpServletRequest) request).getSession();
			
			String usuario = null;
			

			if (session != null) {

			
				usuario = (String) session.getAttribute("login");

			}
			
			if (usuario == null)

			{
				

				((HttpServletResponse) response).sendRedirect("http://localhost:8080/SalaArcoIris/index.html");
				
			} else {
				
				filterChain.doFilter(request, response);

			}
		} catch (Exception e) {
			e.printStackTrace();

		}
	} // Fechando o bloco do doFilter()

	// Executa a destruição do Filtro.
	public void destroy() {

	}

}
