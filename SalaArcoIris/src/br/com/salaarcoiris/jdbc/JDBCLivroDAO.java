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
		return true;
	}
}