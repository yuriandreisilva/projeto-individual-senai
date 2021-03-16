package br.com.salaarcoiris.jdbc;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.JsonObject;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import br.com.salaarcoiris.jdbcinterface.UsuarioDAO;
import br.com.salaarcoiris.modelo.Usuario;

public class JDBCUsuarioDAO implements UsuarioDAO {

	private Connection conexao;

	public JDBCUsuarioDAO(Connection conexao) {
		this.conexao = conexao;
	}

	public boolean inserirU(Usuario usuario) {
		String comando = " INSERT INTO adm_usuario (emailUsuario, senhaUsuario, status, permissao) "
				+ "values (?,?,?,?);";

		PreparedStatement p;

		try {

			p = this.conexao.prepareStatement(comando);

			p.setString(1, usuario.getEmailUsuario());
			p.setString(2, usuario.getSenhaUsuario());
			p.setBoolean(3, usuario.getStatus());
			p.setInt(4, usuario.getPermissao());

			p.execute();

		} catch (SQLException e) {
			e.printStackTrace();

			return false;
		}
		return true;
	}

	public List<JsonObject> buscarU(String emailUser) {

		String comando = "SELECT * " + "FROM adm_usuario ";
		if (emailUser != "") {
			comando += "WHERE adm_usuario.emailUsuario LIKE '%" + emailUser + "%' ";
		}
		comando += "ORDER BY adm_usuario.emailUsuario ASC";
		List<JsonObject> listaUsuarios = new ArrayList<JsonObject>();
		JsonObject usuario = null;

		try {

			Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);

			while (rs.next()) {

				int id = rs.getInt("idUsuario");
				String emailUsuario = rs.getString("emailUsuario");
				String senhaUsuario = rs.getString("senhaUsuario");
				int status = rs.getInt("status");
				Boolean permissao = rs.getBoolean("permissao");

				usuario = new JsonObject();
				usuario.addProperty("idUsuario", id);
				usuario.addProperty("emailUsuario", emailUsuario);
				usuario.addProperty("senhaUsuario", senhaUsuario);
				usuario.addProperty("status", status);
				usuario.addProperty("permissao", permissao);

				listaUsuarios.add(usuario);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return listaUsuarios;
	}

	// DELETE - usuario

	public boolean deletarU(int idUsuario) {
		String comando = "DELETE FROM adm_usuario WHERE idUsuario = ?";
		PreparedStatement p;
		try {
			p = this.conexao.prepareStatement(comando);
			p.setInt(1, idUsuario);
			p.execute();
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	// UPDATE - usuario

	public Usuario checkIdU(int idUsuario) {
		String comando = "select * from adm_usuario " + "where adm_usuario.idUsuario = ?";
		Usuario usuario = new Usuario();
		try {
			PreparedStatement p = this.conexao.prepareStatement(comando);
			p.setInt(1, idUsuario);
			ResultSet rs = p.executeQuery();
			while (rs.next()) {

				int id = rs.getInt("idUsuario");
				String emailUsuario = rs.getString("emailUsuario");
				String senhaUsuario = rs.getString("senhaUsuario");
				Boolean status = rs.getBoolean("status");
				int permissao = rs.getInt("permissao");

				usuario.setEmailUsuario(emailUsuario);
				usuario.setSenhaUsuario(senhaUsuario);
				usuario.setStatus(status);
				usuario.setPermissao(permissao);

				usuario.setIdUsuario(id);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return usuario;
	}

	public boolean alterarU(Usuario usuario) {
		String comando = "UPDATE adm_usuario " + "SET emailUsuario=?, senhaUsuario=?, status=?, permissao=? "
				+ " WHERE idUsuario=?";
		PreparedStatement p;
		try {

			p = this.conexao.prepareStatement(comando);

			p.setString(1, usuario.getEmailUsuario());
			p.setString(2, usuario.getSenhaUsuario());
			p.setBoolean(3, usuario.getStatus());
			p.setInt(4, usuario.getPermissao());

			p.setInt(5, usuario.getIdUsuario());

			p.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
}