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
				"SELECT count(idEmprestimo), date_format(dataDevolvido, '%M') "
				+ "from emprestimo_livro "
				+ "where emprestimo_livro.status = 2 "
				+ "and "
				+ "year(dataDevolvido) = YEAR(NOW()) "
				+ "group by date_format(dataDevolvido, '%M');";
		
		
		List<JsonObject> listaEmprestimos = new ArrayList<JsonObject>();
		JsonObject emprestimo = null;

		try {

			Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);

			while (rs.next()) {

				int qtd_emprestimo = rs.getInt("count(idEmprestimo)");
				String mes_emprestimo = rs.getString("date_format(dataDevolvido, '%M')");
				
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
}