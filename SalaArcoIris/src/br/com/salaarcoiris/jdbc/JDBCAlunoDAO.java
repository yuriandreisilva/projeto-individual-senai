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



public class JDBCAlunoDAO implements AlunoDAO{
	
private Connection conexao;

	public JDBCAlunoDAO(Connection conexao) {
		this.conexao = conexao;
	}
	
	public boolean inserir (Aluno aluno) {
		String comando = " INSERT INTO aluno (cpfAluno, nomeAluno, data_nasc, email, senha, responsavel_idresponsavel) "
				+ "values (?,?,?,?,?,?);";
				
				PreparedStatement p;
				
				try {
					
					p = this.conexao.prepareStatement(comando);
				
					p.setInt(1, aluno.getCpfAluno());
					p.setString(2, aluno.getNomeAluno());
					p.setString(3, aluno.getNascAluno());
					p.setString(4, aluno.getEmail());
					p.setString(5, aluno.getSenha());
					p.setInt(6, 1);
					
					p.execute();
					
				}catch (SQLException e) {
					e.printStackTrace();
					return false;
				}
				return true;
			}
}