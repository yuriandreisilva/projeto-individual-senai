package br.com.salaarcoiris.jdbc;

import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.google.gson.JsonObject;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import br.com.salaarcoiris.jdbcinterface.LivroEmprestadoDAO;
import br.com.salaarcoiris.modelo.LivroEmprestado;

public class JDBCLivroEmprestadoDAO implements LivroEmprestadoDAO {

	private Connection conexao;

	public JDBCLivroEmprestadoDAO(Connection conexao) {
		this.conexao = conexao;
	}

	public boolean inserirLE(LivroEmprestado[] livroEmprestado) {
		System.out.println("emprestimo: " + livroEmprestado[0].getIdEmprestimo());
		System.out.println("primeiro livro: " + livroEmprestado[0].getId());
		System.out.println("qtd: " + livroEmprestado.length);
//		System.out.println("segundo: " + livroEmprestado.getIdLivro());
		

		String comando = " INSERT INTO emprestimo_has_livro (emprestimo_livro_idEmprestimo, livro_idLivro, qtdLivro) "
				+ "values (?,?,?);";

		PreparedStatement p;

		try {
			for (int i = 0; i < livroEmprestado.length; i++) {
				  System.out.println("ID livros: " + livroEmprestado[i].getId());
				  p = this.conexao.prepareStatement(comando);

					p.setInt(1, livroEmprestado[i].getIdEmprestimo());
					p.setInt(2, livroEmprestado[i].getId());
					p.setInt(3, livroEmprestado[i].getQtd());

					p.execute();
			}
			

		} catch (SQLException e) {
			e.printStackTrace();

			return false;
		}
		return true;
	}

// 	public List<JsonObject> buscarLE(String nome) {

// 		String comando = "SELECT * " + "FROM emprestimo_has_livro ";
// 		if (nome != "") {
// 			comando += "WHERE emprestimo_has_livro.nomeLivroEmprestado LIKE '%" + nome + "%' ";
// 		}
// 		comando += "ORDER BY emprestimo_has_livro.nomeLivroEmprestado ASC";
// 		List<JsonObject> listaLivroEmprestados = new ArrayList<JsonObject>();
// 		JsonObject livroEmprestado = null;

// 		try {

// 			Statement stmt = conexao.createStatement();
// 			ResultSet rs = stmt.executeQuery(comando);

// 			while (rs.next()) {

// 				int id = rs.getInt("idLivroEmprestado");
// 				String cpfLivroEmprestado = rs.getString("cpfLivroEmprestado");
// 				String nomeLivroEmprestado = rs.getString("nomeLivroEmprestado");
// 				String dataNasc = rs.getString("dataNasc");
// 				String email = rs.getString("email");
// 				int senha = rs.getInt("senha");
// 				String statusResp = rs.getString("statusResp");
// 				String nomeResp = rs.getString("nomeResp");
// 				String dataNascResp = rs.getString("dataNascResp");

// 				livroEmprestado = new JsonObject();
// 				livroEmprestado.addProperty("idLivroEmprestado", id);
// 				livroEmprestado.addProperty("cpfLivroEmprestado", cpfLivroEmprestado);
// 				livroEmprestado.addProperty("nomeLivroEmprestado", nomeLivroEmprestado);
// 				livroEmprestado.addProperty("dataNasc", dataNasc);
// 				livroEmprestado.addProperty("email", email);
// 				livroEmprestado.addProperty("senha", senha);
// 				livroEmprestado.addProperty("statusResp", statusResp);
// 				livroEmprestado.addProperty("nomeResp", nomeResp);
// 				livroEmprestado.addProperty("dataNascResp", dataNascResp);

// 				listaLivroEmprestados.add(livroEmprestado);
// 			}

// 		} catch (Exception e) {
// 			e.printStackTrace();
// 		}
// 		return listaLivroEmprestados;
// 	}

// 	// DELETE - livroEmprestado

// 	public boolean deletarLE(int idLivroEmprestado) {
// 		String comando = "DELETE FROM emprestimo_has_livro WHERE idLivroEmprestado = ?";
// 		PreparedStatement p;
// 		try {
// 			p = this.conexao.prepareStatement(comando);
// 			p.setInt(1, idLivroEmprestado);
// 			p.execute();
// 		} catch (SQLException e) {
// 			e.printStackTrace();
// 			return false;
// 		}
// 		return true;
// 	}

// 	// UPDATE - livroEmprestado

// 	public LivroEmprestado checkIdLE(int idLivroEmprestado) {
// 		String comando = "select * from emprestimo_has_livro " + "where emprestimo_has_livro.idLivroEmprestado = ?";
// 		LivroEmprestado livroEmprestado = new LivroEmprestado();
// 		try {
// 			PreparedStatement p = this.conexao.prepareStatement(comando);
// 			p.setInt(1, idLivroEmprestado);
// 			ResultSet rs = p.executeQuery();
// 			while (rs.next()) {
// 				int id = rs.getInt("idLivroEmprestado");
// 				String cpfLivroEmprestado = rs.getString("cpfLivroEmprestado");
// 				String nomeLivroEmprestado = rs.getString("nomeLivroEmprestado");
// 				String dataNasc = rs.getString("dataNasc");
// 				String email = rs.getString("email");
// 				int senha = rs.getInt("senha");
// 				String statusResp = rs.getString("statusResp");
// 				String nomeResp = rs.getString("nomeResp");
// 				String dataNascResp = rs.getString("dataNascResp");

// 				livroEmprestado.setCpfLivroEmprestado(cpfLivroEmprestado);
// 				livroEmprestado.setNomeLivroEmprestado(nomeLivroEmprestado);
// 				livroEmprestado.setNascLivroEmprestado(dataNasc);
// 				livroEmprestado.setEmail(email);
// 				livroEmprestado.setSenha(senha);
// 				livroEmprestado.setStatusResp(statusResp);
// 				livroEmprestado.setNomeResp(nomeResp);
// 				livroEmprestado.setDataNascResp(dataNascResp);

// 				livroEmprestado.setIdLivroEmprestado(id);

// 			}
// 		} catch (Exception e) {
// 			e.printStackTrace();
// 		}
// 		return livroEmprestado;
// 	}

// 	public boolean alterarLE(LivroEmprestado livroEmprestado) {
// 		String comando = "UPDATE emprestimo_has_livro " + "SET cpfLivroEmprestado=?, nomeLivroEmprestado=?, dataNasc=?, email=?, statusResp=?, nomeResp=?, dataNascResp=? "
// 				+ " WHERE idLivroEmprestado=?";
// 		PreparedStatement p;
// 		try {

// 			p = this.conexao.prepareStatement(comando);

// 			p.setString(1, livroEmprestado.getCpfLivroEmprestado());
// 			p.setString(2, livroEmprestado.getNomeLivroEmprestado());
// 			p.setString(3, livroEmprestado.getNascLivroEmprestado());
// 			p.setString(4, livroEmprestado.getEmail());
// 			p.setString(5, livroEmprestado.getStatusResp());
// 			p.setString(6, livroEmprestado.getNomeResp());
// 			p.setString(7, livroEmprestado.getDataNascResp());

// 			p.setInt(8, livroEmprestado.getIdLivroEmprestado());

// 			p.executeUpdate();

// 		} catch (SQLException e) {
// 			e.printStackTrace();
// 			return false;
// 		}
// 		return true;
// 	}
}