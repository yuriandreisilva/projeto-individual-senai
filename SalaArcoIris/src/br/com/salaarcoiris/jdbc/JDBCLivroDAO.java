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

import br.com.salaarcoiris.jdbcinterface.LivroDAO;
import br.com.salaarcoiris.modelo.Livro;

public class JDBCLivroDAO implements LivroDAO{

	private Connection conexao;

	public JDBCLivroDAO(Connection conexao) {
		this.conexao = conexao;
	}

	public boolean inserirL(Livro livro) {
		// SQL
		// INJECTION QUERY, LINHA DE COMANDO EM SQL PARA INSERÇÃO NO BD
		String comando = " INSERT INTO livro (nomeLivro, codigoLivro, anoLivro, qtdEstoque, statusLivro) "
				+ "values (?,?,?,?,?);";

		// PREPAREDSTATEMENT É UM ATRIBUTO DA CLASSE, PARA PREPARAR O AMBIENTE
		// P É UM OBJETO DESTE TIPO
		PreparedStatement p;

		try {
			// NESTA CONEXÃO, P RECEBE A LINHA DE COMANDO COM AMBIENTE PREPARADO
			p = this.conexao.prepareStatement(comando);

			// SETA OS VALORES, NAS DEMAIS POSIÇÕES, EM ORDEM SEQUENCIAL MESMO
			// COM SEUS RESPECTIVOS TIPOS E USANDO A INSTÂNCIA COM OS GETTERES PARA ISSO
			// OBJETO LIVRO É PASSADO POR PARÂMETRO PARA REFERENCIAR
			p.setString(1, livro.getNomeLivro());
			p.setString(2, livro.getCodigoLivro());
			p.setInt(3, livro.getAnoLivro());
			p.setInt(4, livro.getQtdEstoque());
			p.setInt(5, livro.getStatusLivro());

			// EXECUTA A LINHA DE COMANDO COM OS VALORES CORRETOS
			p.execute();

		}catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		
		// RETORNA VERDADEIRO O BOOLEANO PARA O LIVRO REST
		// 
		return true;
	}
	
	public List<JsonObject>buscarL(String nome){
		System.out.println(nome);
		String comando = "SELECT * "+
				"FROM livro ";
		if (nome != "") {
			comando += "WHERE livro.nomeLivro LIKE '%"+ nome + "%' "; 
		}
		comando += "ORDER BY livro.nomeLivro ASC";		
		List<JsonObject> listaLivros = new ArrayList<JsonObject>();
		JsonObject livro = null;

		try {

			Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);

			while(rs.next()) {

				int idLivro = rs.getInt("idLivro");
				String nomeLivro = rs.getString("nomeLivro");
				String codigoLivro = rs.getString("codigoLivro");
				int anoLivro = rs.getInt("anoLivro");
				int qtdEstoque = rs.getInt("qtdEstoque");
				int statusLivro = rs.getInt("statusLivro");
				
				livro = new JsonObject();
				livro.addProperty("idLivro", idLivro);				
				livro.addProperty("nomeLivro", nomeLivro);
				livro.addProperty("codigoLivro", codigoLivro);
				livro.addProperty("anoLivro", anoLivro);
				livro.addProperty("qtdEstoque", qtdEstoque);
				livro.addProperty("statusLivro", statusLivro);

				listaLivros.add(livro);
			}

		}catch (Exception e) {
			e.printStackTrace();
		}
		return listaLivros;
	}
	
	// DELETE - livro
	
	public boolean deletarL(int idLivro) {
		String comando = "DELETE FROM livro WHERE idLivro = ?";
		PreparedStatement p;
		try {
			p=this.conexao.prepareStatement(comando);
			p.setInt(1, idLivro);
			p.execute();
		}catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	// UPDATE - livro
	
	public Livro checkIdL(int idLivro) {
		String comando = "select * from livro " +
				"where livro.idLivro = ?";
		Livro livro = new Livro();
		try {
			PreparedStatement p = this.conexao.prepareStatement(comando);
			p.setInt(1, idLivro);
			ResultSet rs = p.executeQuery();
			while (rs.next()) {
				int id = rs.getInt("idLivro");
				String nomeLivro = rs.getString("nomeLivro");
				String codigoLivro = rs.getString("codigoLivro");
				int anoLivro = rs.getInt("anoLivro");
				int qtdEstoque = rs.getInt("qtdEstoque");
				int statusLivro = rs.getInt("statusLivro");
				
				livro.setNomeLivro(nomeLivro);
				livro.setCodigoLivro(codigoLivro);
				livro.setAnoLivro(anoLivro);
				livro.setQtdEstoque(qtdEstoque);
				livro.setStatusLivro(statusLivro);

				
				livro.setIdLivro(idLivro);
				

			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return livro;
	}
		
		public boolean alterarL(Livro livro) {		
			String comando = "UPDATE livro "
					+ "SET nomeLivro=?, codigoLivro=?, anoLivro=?, qtdEstoque=? , statusLivro=?"
					+ " WHERE idLivro=?";
			PreparedStatement p;
			try {
				
				p = this.conexao.prepareStatement(comando);
								
				p.setString(1, livro.getNomeLivro());
				p.setString(2, livro.getCodigoLivro());
				p.setInt(3, livro.getAnoLivro());
				p.setInt(4, livro.getQtdEstoque());
				p.setInt(5, livro.getStatusLivro());
				p.setInt(6, livro.getIdLivro());

				p.executeUpdate();

			}catch (SQLException e) {
				e.printStackTrace();
				return false;
			}
			return true;
		}
}