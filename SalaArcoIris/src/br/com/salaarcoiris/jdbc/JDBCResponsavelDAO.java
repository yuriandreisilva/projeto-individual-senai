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

import br.com.salaarcoiris.jdbcinterface.ResponsavelDAO;
import br.com.salaarcoiris.modelo.Responsavel;

public class JDBCResponsavelDAO implements ResponsavelDAO{
	
private Connection conexao;

	public JDBCResponsavelDAO(Connection conexao) {
		this.conexao = conexao;
	}
	
	public boolean inserir (Responsavel responsavel) {
		String comando = " INSERT INTO responsavel (idresposavel, nomeResp, data_nasc) "
				+ "values (?,?,?);";
				
				PreparedStatement p;
				
				try {
					
					p = this.conexao.prepareStatement(comando);
				
					p.setInt(1, responsavel.getIdResp());
					p.setString(2, responsavel.getNomeResp());
					p.setString(3, responsavel.getNascResp());
					
					
					p.execute();
					
				}catch (SQLException e) {
					e.printStackTrace();
					return false;
				}
				return true;
			}
}