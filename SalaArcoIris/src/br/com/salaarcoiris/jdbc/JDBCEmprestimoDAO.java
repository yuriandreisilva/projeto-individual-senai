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
	public List<JsonObject> buscarE(String id) {

		String comando = "SELECT * " + "FROM emprestimo_livro ";
		if (id != "") {
			comando += "WHERE emprestimo_livro.idEmprestimo LIKE '%" + id + "%' ";
		}
		comando += "ORDER BY emprestimo_livro.idEmprestimo ASC";
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
				int idAluno = rs.getInt("idAluno");
				int idUsuario = rs.getInt("idUsuario");
				
				emprestimo = new JsonObject();
				emprestimo.addProperty("idEmprestimo", idEmprestimo);
				emprestimo.addProperty("dataEmprestimo", dataEmprestimo);
				emprestimo.addProperty("dataDevolucao", dataDevolucao);
				emprestimo.addProperty("status", status);
				emprestimo.addProperty("valorMulta", valorMulta);
				emprestimo.addProperty("idAluno", idAluno);
				emprestimo.addProperty("idUsuario", idUsuario);

				listaEmprestimos.add(emprestimo);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return listaEmprestimos;
	}


// 	// DELETE - emprestimo

// 	public boolean deletarE(int idEmprestimo) {
// 		String comando = "DELETE FROM emprestimo_livro WHERE idEmprestimo = ?";
// 		PreparedStatement p;
// 		try {
// 			p = this.conexao.prepareStatement(comando);
// 			p.setInt(1, idEmprestimo);
// 			p.execute();
// 		} catch (SQLException e) {
// 			e.printStackTrace();
// 			return false;
// 		}
// 		return true;
// 	}

// 	// UPDATE - emprestimo

// 	public Emprestimo checkIdE(int idEmprestimo) {
// 		String comando = "select * from emprestimo_livro " + "where emprestimo_livro.idEmprestimo = ?";
// 		Emprestimo emprestimo = new Emprestimo();
// 		try {
// 			PreparedStatement p = this.conexao.prepareStatement(comando);
// 			p.setInt(1, idEmprestimo);
// 			ResultSet rs = p.executeQuery();
// 			while (rs.next()) {
// 				int id = rs.getInt("idEmprestimo");
// 				String cpfEmprestimo = rs.getString("cpfEmprestimo");
// 				String idEmprestimo = rs.getString("idEmprestimo");
// 				String dataNasc = rs.getString("dataNasc");
// 				String email = rs.getString("email");
// 				int senha = rs.getInt("senha");
// 				String statusResp = rs.getString("statusResp");
// 				String nomeResp = rs.getString("nomeResp");
// 				String dataNascResp = rs.getString("dataNascResp");

// 				emprestimo.setCpfEmprestimo(cpfEmprestimo);
// 				emprestimo.setNomeEmprestimo(idEmprestimo);
// 				emprestimo.setNascEmprestimo(dataNasc);
// 				emprestimo.setEmail(email);
// 				emprestimo.setSenha(senha);
// 				emprestimo.setStatusResp(statusResp);
// 				emprestimo.setNomeResp(nomeResp);
// 				emprestimo.setDataNascResp(dataNascResp);

// 				emprestimo.setIdEmprestimo(id);

// 			}
// 		} catch (Exception e) {
// 			e.printStackTrace();
// 		}
// 		return emprestimo;
// 	}

// 	public boolean alterarE(Emprestimo emprestimo) {
// 		String comando = "UPDATE emprestimo_livro " + "SET cpfEmprestimo=?, idEmprestimo=?, dataNasc=?, email=?, statusResp=?, nomeResp=?, dataNascResp=? "
// 				+ " WHERE idEmprestimo=?";
// 		PreparedStatement p;
// 		try {

// 			p = this.conexao.prepareStatement(comando);

// 			p.setString(1, emprestimo.getCpfEmprestimo());
// 			p.setString(2, emprestimo.getNomeEmprestimo());
// 			p.setString(3, emprestimo.getNascEmprestimo());
// 			p.setString(4, emprestimo.getEmail());
// 			p.setString(5, emprestimo.getStatusResp());
// 			p.setString(6, emprestimo.getNomeResp());
// 			p.setString(7, emprestimo.getDataNascResp());

// 			p.setInt(8, emprestimo.getIdEmprestimo());

// 			p.executeUpdate();

// 		} catch (SQLException e) {
// 			e.printStackTrace();
// 			return false;
// 		}
// 		return true;
// 	}
}