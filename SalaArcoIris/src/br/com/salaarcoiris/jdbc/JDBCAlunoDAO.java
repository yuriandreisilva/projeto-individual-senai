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

import br.com.salaarcoiris.jdbcinterface.AlunoDAO;
import br.com.salaarcoiris.modelo.Aluno;

public class JDBCAlunoDAO implements AlunoDAO {

	private Connection conexao;

	public JDBCAlunoDAO(Connection conexao) {
		this.conexao = conexao;
	}

	public boolean inserirA(Aluno aluno) {
		String comando = " INSERT INTO aluno (cpfAluno, nomeAluno, dataNasc, email, senha, statusResp, nomeResp, dataNascResp) "
				+ "values (?,?,?,?,?,?,?,?);";

		PreparedStatement p;

		try {

			p = this.conexao.prepareStatement(comando);

			p.setString(1, aluno.getCpfAluno());
			p.setString(2, aluno.getNomeAluno());
			p.setString(3, aluno.getNascAluno());
			p.setString(4, aluno.getEmail());
			p.setInt(5, aluno.getSenha());
			p.setString(6, aluno.getStatusResp());
			p.setString(7, aluno.getNomeResp());
			p.setString(8, aluno.getDataNascResp());

			p.execute();

		} catch (SQLException e) {
			e.printStackTrace();

			return false;
		}
		return true;
	}

	public List<JsonObject> buscarA(String nome) {

		String comando = "SELECT * FROM aluno ";
		if (nome != "") {
			comando += "WHERE aluno.nomeAluno LIKE '%" + nome + "%' ";
		}
		comando += "ORDER BY aluno.nomeAluno ASC";
		List<JsonObject> listaAlunos = new ArrayList<JsonObject>();
		JsonObject aluno = null;

		try {

			Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);

			while (rs.next()) {

				int id = rs.getInt("idAluno");
				String cpfAluno = rs.getString("cpfAluno");
				String nomeAluno = rs.getString("nomeAluno");
				String dataNasc = rs.getString("dataNasc");
				String email = rs.getString("email");
				int senha = rs.getInt("senha");
				String statusResp = rs.getString("statusResp");
				String nomeResp = rs.getString("nomeResp");
				String dataNascResp = rs.getString("dataNascResp");

				aluno = new JsonObject();
				aluno.addProperty("idAluno", id);
				aluno.addProperty("cpfAluno", cpfAluno);
				aluno.addProperty("nomeAluno", nomeAluno);
				aluno.addProperty("dataNasc", dataNasc);
				aluno.addProperty("email", email);
				aluno.addProperty("senha", senha);
				aluno.addProperty("statusResp", statusResp);
				aluno.addProperty("nomeResp", nomeResp);
				aluno.addProperty("dataNascResp", dataNascResp);

				listaAlunos.add(aluno);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return listaAlunos;
	}

	// DELETE - aluno

	public boolean deletarA(int idAluno) {
		String comando = "DELETE FROM aluno WHERE idAluno = ?";
		PreparedStatement p;
		try {
			p = this.conexao.prepareStatement(comando);
			p.setInt(1, idAluno);
			p.execute();
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	// UPDATE - aluno

	public Aluno checkIdA(int idAluno) {
		String comando = "select * from aluno " + "where aluno.idAluno = ?";
		Aluno aluno = new Aluno();
		try {
			PreparedStatement p = this.conexao.prepareStatement(comando);
			p.setInt(1, idAluno);
			ResultSet rs = p.executeQuery();
			while (rs.next()) {
				int id = rs.getInt("idAluno");
				String cpfAluno = rs.getString("cpfAluno");
				String nomeAluno = rs.getString("nomeAluno");
				String dataNasc = rs.getString("dataNasc");
				String email = rs.getString("email");
				int senha = rs.getInt("senha");
				String statusResp = rs.getString("statusResp");
				String nomeResp = rs.getString("nomeResp");
				String dataNascResp = rs.getString("dataNascResp");

				aluno.setCpfAluno(cpfAluno);
				aluno.setNomeAluno(nomeAluno);
				aluno.setNascAluno(dataNasc);
				aluno.setEmail(email);
				aluno.setSenha(senha);
				aluno.setStatusResp(statusResp);
				aluno.setNomeResp(nomeResp);
				aluno.setDataNascResp(dataNascResp);

				aluno.setIdAluno(id);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return aluno;
	}

	public boolean alterarA(Aluno aluno) {
		String comando = "UPDATE aluno " + "SET cpfAluno=?, nomeAluno=?, dataNasc=?, email=?, statusResp=?, nomeResp=?, dataNascResp=? "
				+ " WHERE idAluno=?";
		PreparedStatement p;
		try {

			p = this.conexao.prepareStatement(comando);

			p.setString(1, aluno.getCpfAluno());
			p.setString(2, aluno.getNomeAluno());
			p.setString(3, aluno.getNascAluno());
			p.setString(4, aluno.getEmail());
			p.setString(5, aluno.getStatusResp());
			p.setString(6, aluno.getNomeResp());
			p.setString(7, aluno.getDataNascResp());

			p.setInt(8, aluno.getIdAluno());

			p.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
}