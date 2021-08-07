package br.com.salaarcoiris.jdbc;

import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.JsonObject;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import br.com.salaarcoiris.jdbcinterface.EmprestimoDAO;
import br.com.salaarcoiris.modelo.Emprestimo;

public class JDBCEmprestimoDAO implements EmprestimoDAO {

	private Connection conexao;

	public JDBCEmprestimoDAO(Connection conexao) {
		this.conexao = conexao;
	}

	public boolean inserirE(Emprestimo emprestimo) {
		String comando = " INSERT INTO emprestimo_livro (dataEmprestimo, dataDevolucao, status, valorMulta, aluno_idAluno, adm_usuario_idUsuario) "
				+ "values (?,?,?,?,?,?);";

		PreparedStatement p;

		try {

			p = this.conexao.prepareStatement(comando);

			p.setString(1, emprestimo.getDataEmprestimo());
			p.setString(2, emprestimo.getDataDevolucao());
			p.setInt(3, emprestimo.getStatus());
			p.setFloat(4, emprestimo.getValorMulta());
			p.setInt(5, emprestimo.getIdAluno());
			p.setInt(6, emprestimo.getIdUsuario());

			p.execute();

		} catch (SQLException e) {
			e.printStackTrace();

			return false;
		}
		return true;
	}

	public int buscarUltimoId() {
		int idEmprestimo = 0; 
		
		String comando = "SELECT idEmprestimo FROM emprestimo_livro WHERE idEmprestimo=(SELECT max(idEmprestimo) FROM emprestimo_livro);";
		try {
			
			Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);
			
			
			while (rs.next()) {
				idEmprestimo = rs.getInt("idEmprestimo");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return idEmprestimo;
	}
	
	/* ************************************************************* */ 
	public List<JsonObject> buscarE(String valorBusca) {

		String comando = "SELECT emprestimo_livro.*, aluno.nomeAluno AS nomeAluno, aluno.cpfAluno AS cpfAluno FROM emprestimo_livro "+ 
		"INNER JOIN aluno ON aluno.idAluno = emprestimo_livro.aluno_idAluno ";
		if (valorBusca != "") {
			comando += "WHERE aluno.nomeAluno LIKE '%" + valorBusca + "%' OR aluno.cpfAluno LIKE '%" + valorBusca + "%'";
		}
		comando += " ORDER BY emprestimo_livro.dataEmprestimo DESC;";
		
		List<JsonObject> listaEmprestimos = new ArrayList<JsonObject>();
		JsonObject emprestimo = null;

		try {

			Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);

			while (rs.next()) {

				int idEmprestimo = rs.getInt("idEmprestimo");
				String dataEmprestimo = rs.getString("dataEmprestimo");
				String dataDevolucao = rs.getString("dataDevolucao");
				String dataDevolvido = rs.getString("dataDevolvido");
				int status = rs.getInt("status");
				float valorMulta = rs.getFloat("valorMulta");
				int idAluno = rs.getInt("aluno_idAluno");
				int idUsuario = rs.getInt("adm_usuario_idUsuario");
				int prorrogacoes = rs.getInt("prorrogacoes");
				String nomeAluno = rs.getString("nomeAluno");
				String cpfAluno = rs.getString("cpfAluno");
				
				
				emprestimo = new JsonObject();
				emprestimo.addProperty("idEmprestimo", idEmprestimo);
				emprestimo.addProperty("dataEmprestimo", dataEmprestimo);
				emprestimo.addProperty("dataDevolucao", dataDevolucao);
				emprestimo.addProperty("dataDevolvido", dataDevolvido);
				emprestimo.addProperty("status", status);
				emprestimo.addProperty("valorMulta", valorMulta);
				emprestimo.addProperty("idAluno", idAluno);
				emprestimo.addProperty("idUsuario", idUsuario);
				emprestimo.addProperty("prorrogacoes", prorrogacoes);
				emprestimo.addProperty("nomeAluno", nomeAluno);
				emprestimo.addProperty("cpfAluno", cpfAluno);
				

				listaEmprestimos.add(emprestimo);
			}
			

		} catch (Exception e) {
			e.printStackTrace();
		}
		return listaEmprestimos;
	}
	
	/* ************************************************************* */ 
	public List<JsonObject>buscarEmprestimoAndamento(String valorBusca) {

		String comando = "SELECT emprestimo_livro.*, aluno.nomeAluno AS nomeAluno, aluno.cpfAluno AS cpfAluno FROM emprestimo_livro "+ 
		"INNER JOIN aluno ON aluno.idAluno = emprestimo_livro.aluno_idAluno ";
		if (valorBusca != "") {
			comando += "WHERE aluno.nomeAluno LIKE '%" + valorBusca + "%' AND emprestimo_livro.status=1 OR aluno.cpfAluno LIKE '%" + valorBusca + "%' AND emprestimo_livro.status=1";
		}
		comando += " ORDER BY emprestimo_livro.dataEmprestimo DESC;";
		
		List<JsonObject> listaEmprestimos = new ArrayList<JsonObject>();
		JsonObject emprestimo = null;

		try {

			Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);

			while (rs.next()) {

				int idEmprestimo = rs.getInt("idEmprestimo");
				String dataEmprestimo = rs.getString("dataEmprestimo");
				String dataDevolucao = rs.getString("dataDevolucao");
				String dataDevolvido = rs.getString("dataDevolvido");
				int status = rs.getInt("status");
				float valorMulta = rs.getFloat("valorMulta");
				int idAluno = rs.getInt("aluno_idAluno");
				int idUsuario = rs.getInt("adm_usuario_idUsuario");
				int prorrogacoes = rs.getInt("prorrogacoes");
				String nomeAluno = rs.getString("nomeAluno");
				String cpfAluno = rs.getString("cpfAluno");
				
				
				emprestimo = new JsonObject();
				emprestimo.addProperty("idEmprestimo", idEmprestimo);
				emprestimo.addProperty("dataEmprestimo", dataEmprestimo);
				emprestimo.addProperty("dataDevolucao", dataDevolucao);
				emprestimo.addProperty("dataDevolvido", dataDevolvido);
				emprestimo.addProperty("status", status);
				emprestimo.addProperty("valorMulta", valorMulta);
				emprestimo.addProperty("idAluno", idAluno);
				emprestimo.addProperty("idUsuario", idUsuario);
				emprestimo.addProperty("prorrogacoes", prorrogacoes);
				emprestimo.addProperty("nomeAluno", nomeAluno);
				emprestimo.addProperty("cpfAluno", cpfAluno);
				

				listaEmprestimos.add(emprestimo);
			}
			

		} catch (Exception e) {
			e.printStackTrace();
		}
		return listaEmprestimos;
	}
	/* ************************************************************* */ 
	public List<JsonObject>buscarEmprestimoAtrasado(String valorBusca) {

		String comando = "SELECT emprestimo_livro.*, aluno.nomeAluno AS nomeAluno, aluno.cpfAluno AS cpfAluno FROM emprestimo_livro "+ 
		"INNER JOIN aluno ON aluno.idAluno = emprestimo_livro.aluno_idAluno ";
		if (valorBusca != "") {
			comando += "WHERE aluno.nomeAluno LIKE '%" + valorBusca + "%' AND emprestimo_livro.status=0 OR "
					+ "aluno.cpfAluno LIKE '%" + valorBusca + "%' AND emprestimo_livro.status=0";
		}
		
		comando += " ORDER BY emprestimo_livro.dataEmprestimo DESC;";
		
		List<JsonObject> listaEmprestimos = new ArrayList<JsonObject>();
		JsonObject emprestimo = null;

		try {

			Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);

			while (rs.next()) {

				int idEmprestimo = rs.getInt("idEmprestimo");
				String dataEmprestimo = rs.getString("dataEmprestimo");
				String dataDevolucao = rs.getString("dataDevolucao");
				String dataDevolvido = rs.getString("dataDevolvido");
				int status = rs.getInt("status");
				float valorMulta = rs.getFloat("valorMulta");
				int idAluno = rs.getInt("aluno_idAluno");
				int idUsuario = rs.getInt("adm_usuario_idUsuario");
				int prorrogacoes = rs.getInt("prorrogacoes");
				String nomeAluno = rs.getString("nomeAluno");
				String cpfAluno = rs.getString("cpfAluno");
				
				emprestimo = new JsonObject();
				emprestimo.addProperty("idEmprestimo", idEmprestimo);
				emprestimo.addProperty("dataEmprestimo", dataEmprestimo);
				emprestimo.addProperty("dataDevolucao", dataDevolucao);
				emprestimo.addProperty("dataDevolvido", dataDevolvido);
				emprestimo.addProperty("status", status);
				emprestimo.addProperty("valorMulta", valorMulta);
				emprestimo.addProperty("idAluno", idAluno);
				emprestimo.addProperty("idUsuario", idUsuario);
				emprestimo.addProperty("prorrogacoes", prorrogacoes);
				emprestimo.addProperty("nomeAluno", nomeAluno);
				emprestimo.addProperty("cpfAluno", cpfAluno);
				

				listaEmprestimos.add(emprestimo);
			}
			

		} catch (Exception e) {
			e.printStackTrace();
		}
		return listaEmprestimos;
	}
	/* ************************************************************* */ 
	public List<JsonObject>buscarEmprestimoFinalizado(String valorBusca) {

		String comando = "SELECT emprestimo_livro.*, aluno.nomeAluno AS nomeAluno, aluno.cpfAluno AS cpfAluno FROM emprestimo_livro "+ 
		"INNER JOIN aluno ON aluno.idAluno = emprestimo_livro.aluno_idAluno ";
		if (valorBusca != "") {
			comando += "WHERE aluno.nomeAluno LIKE '%" + valorBusca + "%' AND status=2 OR aluno.cpfAluno LIKE '%" + valorBusca + "%' AND status=2";
		}
		comando += " ORDER BY emprestimo_livro.dataEmprestimo DESC;";
		
		List<JsonObject> listaEmprestimos = new ArrayList<JsonObject>();
		JsonObject emprestimo = null;

		try {

			Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);

			while (rs.next()) {

				int idEmprestimo = rs.getInt("idEmprestimo");
				String dataEmprestimo = rs.getString("dataEmprestimo");
				String dataDevolucao = rs.getString("dataDevolucao");
				String dataDevolvido = rs.getString("dataDevolvido");
				int status = rs.getInt("status");
				float valorMulta = rs.getFloat("valorMulta");
				int idAluno = rs.getInt("aluno_idAluno");
				int idUsuario = rs.getInt("adm_usuario_idUsuario");
				int prorrogacoes = rs.getInt("prorrogacoes");
				String nomeAluno = rs.getString("nomeAluno");
				String cpfAluno = rs.getString("cpfAluno");
				
				
				emprestimo = new JsonObject();
				emprestimo.addProperty("idEmprestimo", idEmprestimo);
				emprestimo.addProperty("dataEmprestimo", dataEmprestimo);
				emprestimo.addProperty("dataDevolucao", dataDevolucao);
				emprestimo.addProperty("dataDevolvido", dataDevolvido);
				emprestimo.addProperty("status", status);
				emprestimo.addProperty("valorMulta", valorMulta);
				emprestimo.addProperty("idAluno", idAluno);
				emprestimo.addProperty("idUsuario", idUsuario);
				emprestimo.addProperty("prorrogacoes", prorrogacoes);
				emprestimo.addProperty("nomeAluno", nomeAluno);
				emprestimo.addProperty("cpfAluno", cpfAluno);
				

				listaEmprestimos.add(emprestimo);
			}
			

		} catch (Exception e) {
			e.printStackTrace();
		}
		return listaEmprestimos;
	}
	/* ************************************************************* */ 
	public List<JsonObject>buscarEmprestimoAndamentoAtrasado(String valorBusca) {

		String comando = "SELECT emprestimo_livro.*, aluno.nomeAluno AS nomeAluno, aluno.cpfAluno AS cpfAluno FROM emprestimo_livro "+ 
		"INNER JOIN aluno ON aluno.idAluno = emprestimo_livro.aluno_idAluno ";
		if (valorBusca != "") {
			comando += "WHERE aluno.nomeAluno LIKE '%" + valorBusca + "%' AND status=1 OR "+
		"aluno.nomeAluno LIKE '%" + valorBusca + "%' AND status=0 OR "+
		"aluno.cpfAluno LIKE '%" + valorBusca + "%' AND status=1 OR "+
		"aluno.cpfAluno LIKE '%" + valorBusca + "%' AND status=0";
		}
		comando += " ORDER BY emprestimo_livro.dataEmprestimo DESC;";
		
		List<JsonObject> listaEmprestimos = new ArrayList<JsonObject>();
		JsonObject emprestimo = null;

		try {

			Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);

			while (rs.next()) {

				int idEmprestimo = rs.getInt("idEmprestimo");
				String dataEmprestimo = rs.getString("dataEmprestimo");
				String dataDevolucao = rs.getString("dataDevolucao");
				int status = rs.getInt("status");
				float valorMulta = rs.getFloat("valorMulta");
				int idAluno = rs.getInt("aluno_idAluno");
				int idUsuario = rs.getInt("adm_usuario_idUsuario");
				int prorrogacoes = rs.getInt("prorrogacoes");
				String nomeAluno = rs.getString("nomeAluno");
				String cpfAluno = rs.getString("cpfAluno");
				
				
				emprestimo = new JsonObject();
				emprestimo.addProperty("idEmprestimo", idEmprestimo);
				emprestimo.addProperty("dataEmprestimo", dataEmprestimo);
				emprestimo.addProperty("dataDevolucao", dataDevolucao);
				emprestimo.addProperty("status", status);
				emprestimo.addProperty("valorMulta", valorMulta);
				emprestimo.addProperty("idAluno", idAluno);
				emprestimo.addProperty("idUsuario", idUsuario);
				emprestimo.addProperty("prorrogacoes", prorrogacoes);
				emprestimo.addProperty("nomeAluno", nomeAluno);
				emprestimo.addProperty("cpfAluno", cpfAluno);
				

				listaEmprestimos.add(emprestimo);
			}
			

		} catch (Exception e) {
			e.printStackTrace();
		}
		return listaEmprestimos;
	}
	/* ************************************************************* */ 
	public List<JsonObject>buscarEmprestimoAndamentoFinalizado(String valorBusca) {

		String comando = "SELECT emprestimo_livro.*, aluno.nomeAluno AS nomeAluno, aluno.cpfAluno AS cpfAluno FROM emprestimo_livro "+ 
		"INNER JOIN aluno ON aluno.idAluno = emprestimo_livro.aluno_idAluno ";
		if (valorBusca != "") {
			comando += "WHERE aluno.nomeAluno LIKE '%" + valorBusca + "%' AND status=1 OR "+
		"aluno.nomeAluno LIKE '%" + valorBusca + "%' AND status=2 OR "+
		"aluno.cpfAluno LIKE '%" + valorBusca + "%' AND status=1 OR "+
		"aluno.cpfAluno LIKE '%" + valorBusca + "%' AND status=2";
		}
		comando += " ORDER BY emprestimo_livro.dataEmprestimo DESC;";
		
		List<JsonObject> listaEmprestimos = new ArrayList<JsonObject>();
		JsonObject emprestimo = null;

		try {

			Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);

			while (rs.next()) {

				int idEmprestimo = rs.getInt("idEmprestimo");
				String dataEmprestimo = rs.getString("dataEmprestimo");
				String dataDevolucao = rs.getString("dataDevolucao");
				int status = rs.getInt("status");
				float valorMulta = rs.getFloat("valorMulta");
				int idAluno = rs.getInt("aluno_idAluno");
				int idUsuario = rs.getInt("adm_usuario_idUsuario");
				int prorrogacoes = rs.getInt("prorrogacoes");
				String nomeAluno = rs.getString("nomeAluno");
				String cpfAluno = rs.getString("cpfAluno");
				
				
				emprestimo = new JsonObject();
				emprestimo.addProperty("idEmprestimo", idEmprestimo);
				emprestimo.addProperty("dataEmprestimo", dataEmprestimo);
				emprestimo.addProperty("dataDevolucao", dataDevolucao);
				emprestimo.addProperty("status", status);
				emprestimo.addProperty("valorMulta", valorMulta);
				emprestimo.addProperty("idAluno", idAluno);
				emprestimo.addProperty("idUsuario", idUsuario);
				emprestimo.addProperty("prorrogacoes", prorrogacoes);
				emprestimo.addProperty("nomeAluno", nomeAluno);
				emprestimo.addProperty("cpfAluno", cpfAluno);
				

				listaEmprestimos.add(emprestimo);
			}
			

		} catch (Exception e) {
			e.printStackTrace();
		}
		return listaEmprestimos;
	}
	/* ************************************************************* */ 
	public List<JsonObject>buscarEmprestimoAtrasadoFinalizado(String valorBusca) {

		String comando = "SELECT emprestimo_livro.*, aluno.nomeAluno AS nomeAluno, aluno.cpfAluno AS cpfAluno FROM emprestimo_livro "+ 
		"INNER JOIN aluno ON aluno.idAluno = emprestimo_livro.aluno_idAluno ";
		if (valorBusca != "") {
			comando += "WHERE aluno.nomeAluno LIKE '%" + valorBusca + "%' AND status=2 OR "+
		"aluno.nomeAluno LIKE '%" + valorBusca + "%' AND status=0 OR "+
		"aluno.cpfAluno LIKE '%" + valorBusca + "%' AND status=2 OR "+
		"aluno.cpfAluno LIKE '%" + valorBusca + "%' AND status=0 ";
		}
		comando += "ORDER BY emprestimo_livro.dataEmprestimo DESC;";
		
		List<JsonObject> listaEmprestimos = new ArrayList<JsonObject>();
		JsonObject emprestimo = null;

		try {

			Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);

			while (rs.next()) {

				int idEmprestimo = rs.getInt("idEmprestimo");
				String dataEmprestimo = rs.getString("dataEmprestimo");
				String dataDevolucao = rs.getString("dataDevolucao");
				int status = rs.getInt("status");
				float valorMulta = rs.getFloat("valorMulta");
				int idAluno = rs.getInt("aluno_idAluno");
				int idUsuario = rs.getInt("adm_usuario_idUsuario");
				int prorrogacoes = rs.getInt("prorrogacoes");
				String nomeAluno = rs.getString("nomeAluno");
				String cpfAluno = rs.getString("cpfAluno");
				
				
				emprestimo = new JsonObject();
				emprestimo.addProperty("idEmprestimo", idEmprestimo);
				emprestimo.addProperty("dataEmprestimo", dataEmprestimo);
				emprestimo.addProperty("dataDevolucao", dataDevolucao);
				emprestimo.addProperty("status", status);
				emprestimo.addProperty("valorMulta", valorMulta);
				emprestimo.addProperty("idAluno", idAluno);
				emprestimo.addProperty("idUsuario", idUsuario);
				emprestimo.addProperty("prorrogacoes", prorrogacoes);
				emprestimo.addProperty("nomeAluno", nomeAluno);
				emprestimo.addProperty("cpfAluno", cpfAluno);
				

				listaEmprestimos.add(emprestimo);
			}
			

		} catch (Exception e) {
			e.printStackTrace();
		}
		return listaEmprestimos;
	}
	
	public boolean alterarStatus(Emprestimo emprestimo) {
 		String comando = "UPDATE emprestimo_livro SET status=? WHERE idEmprestimo=?";
 		
 		PreparedStatement p;
 		try {

 			System.out.println("emprestimo.getStatus(): " + emprestimo.getStatus());
 			p = this.conexao.prepareStatement(comando);
 			p.setInt(1, emprestimo.getStatus());
 			p.setInt(2, emprestimo.getIdEmprestimo());
 			
 			p.executeUpdate();

 		} catch (SQLException e) {
 			e.printStackTrace();
 			return false;
 		}
 		return true;
 	}
	
	public boolean quitarE(Emprestimo emprestimo) {
		
		
 		String comando = "UPDATE emprestimo_livro SET status=?, valorMulta=?, dataDevolvido=? WHERE idEmprestimo=?";
	
 		PreparedStatement p;
 		try {

 			p = this.conexao.prepareStatement(comando);

 			p.setInt(1, 2);
 			p.setFloat(2, emprestimo.getValorMulta());
 			p.setString(3, emprestimo.getDataDevolvido());
 			p.setInt(4, emprestimo.getIdEmprestimo());
 			
 			p.executeUpdate();

 		} catch (SQLException e) {
 			e.printStackTrace();
 			return false;
 		}
 		return true;
 	}
	
	public boolean prorrogarE(Emprestimo emprestimo) {
		
 		String comando = "UPDATE emprestimo_livro SET dataDevolucao=?, prorrogacoes=? WHERE idEmprestimo=?";
 		
 		PreparedStatement p;
 		try {

 			p = this.conexao.prepareStatement(comando);

 			p.setString(1, emprestimo.getDataDevolucao());
 			p.setInt(2, emprestimo.getProrrogacoes());
 			p.setInt(3, emprestimo.getIdEmprestimo());
 			
 			p.executeUpdate();

 		} catch (SQLException e) {
 			e.printStackTrace();
 			return false;
 		}
 		return true;
 	}
	
	public List<JsonObject> buscarEmprestimoEspecifico(int valorBusca) {

		String comando ="SELECT emprestimo_has_livro.*, emprestimo_livro.dataEmprestimo, emprestimo_livro.dataDevolucao, "
		+"emprestimo_livro.status, emprestimo_livro.prorrogacoes, aluno.nomeAluno, aluno.cpfAluno, livro.codigoLivro, livro.idLivro, livro.nomeLivro "
		+"FROM emprestimo_has_livro " 
		+"INNER JOIN emprestimo_livro ON emprestimo_livro.idEmprestimo = emprestimo_has_livro.emprestimo_livro_idEmprestimo "
		+"INNER JOIN livro ON livro.idLivro = emprestimo_has_livro.livro_idLivro "
		+"INNER JOIN aluno ON aluno.idAluno = emprestimo_livro.aluno_idAluno "
		+"WHERE idEmprestimo = "+ valorBusca +";";
		
		List<JsonObject> dadosEmprestimo = new ArrayList<JsonObject>();
		JsonObject emprestimo = null;

		try {

			Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);

			while (rs.next()) {
				
				String nomeAluno = rs.getString("nomeAluno");
				String cpfAluno = rs.getString("cpfAluno");
				String dataEmprestimo = rs.getString("dataEmprestimo");
				String dataDevolucao = rs.getString("dataDevolucao");
				int status = rs.getInt("status");
				String nomeLivro = rs.getString("nomeLivro");
				String codigoLivro = rs.getString("codigoLivro");
				int qtdLivro = rs.getInt("qtdLivro");
				int idLivro = rs.getInt("livro_idLivro");
				int idEmprestimo = rs.getInt("emprestimo_livro_idEmprestimo");
				int prorrogacoes = rs.getInt("prorrogacoes");
						
				
				emprestimo = new JsonObject();
				emprestimo.addProperty("nomeAluno", nomeAluno);
				emprestimo.addProperty("cpfAluno", cpfAluno);
				emprestimo.addProperty("dataEmprestimo", dataEmprestimo);
				emprestimo.addProperty("dataDevolucao", dataDevolucao);
				emprestimo.addProperty("status", status);
				emprestimo.addProperty("nomeLivro", nomeLivro);
				emprestimo.addProperty("codigoLivro", codigoLivro);
				emprestimo.addProperty("qtdLivro", qtdLivro);
				emprestimo.addProperty("livro_idLivro", idLivro);
				emprestimo.addProperty("emprestimo_livro_idEmprestimo", idEmprestimo);
				emprestimo.addProperty("prorrogacoes", prorrogacoes);
				
				
				dadosEmprestimo.add(emprestimo);
			}
			

		} catch (Exception e) {
			e.printStackTrace();
		}
		return dadosEmprestimo;
	}
}