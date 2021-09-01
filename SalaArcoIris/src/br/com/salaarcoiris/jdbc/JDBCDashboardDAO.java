package br.com.salaarcoiris.jdbc;

import java.sql.Connection;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import com.google.gson.JsonObject;
import java.sql.ResultSet;
import br.com.salaarcoiris.jdbcinterface.DashboardDAO;

public class JDBCDashboardDAO implements DashboardDAO {

	private Connection conexao;

	public JDBCDashboardDAO(Connection conexao) {
		this.conexao = conexao;
	}

	public List<JsonObject>buscarQtdEmprestimoFinalizado() {

		String comando = 
				"SELECT count(idEmprestimo) as qtd, monthname(dataDevolvido) as mes "
				+ "from emprestimo_livro "
				+ "where emprestimo_livro.status = 2 "
				+ "and "
				+ "year(dataDevolvido) = YEAR(NOW()) "
				+ "group by mes order by month(dataDevolvido);";
		
		
		List<JsonObject> listaEmprestimos = new ArrayList<JsonObject>();
		JsonObject emprestimo = null;

		try {

			Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);

			while (rs.next()) {

				int qtd_emprestimo = rs.getInt("qtd");
				String mes_emprestimo = rs.getString("mes");
				
				emprestimo = new JsonObject();
				emprestimo.addProperty("qtd", qtd_emprestimo);
				emprestimo.addProperty("mes", mes_emprestimo);

				listaEmprestimos.add(emprestimo);
			}
			

		} catch (Exception e) {
			e.printStackTrace();
		}
		return listaEmprestimos;
	}
	
	public List<JsonObject>buscarQtdEmprestimoGeral() {

		String comando = 
				"SELECT count(idEmprestimo), status FROM emprestimo_livro group by status order by status desc";
		
		
		List<JsonObject> listaEmprestimos = new ArrayList<JsonObject>();
		JsonObject emprestimo = null;

		try {

			Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);

			while (rs.next()) {

				int qtd_emprestimo = rs.getInt("count(idEmprestimo)");
				int status_emprestimo = rs.getInt("status");
				
				emprestimo = new JsonObject();
				emprestimo.addProperty("qtd", qtd_emprestimo);
				emprestimo.addProperty("status", status_emprestimo);

				listaEmprestimos.add(emprestimo);
			}
			

		} catch (Exception e) {
			e.printStackTrace();
		}
		return listaEmprestimos;
	}
}