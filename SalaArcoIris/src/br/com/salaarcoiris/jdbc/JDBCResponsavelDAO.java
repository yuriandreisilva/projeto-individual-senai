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
	
	public boolean inserirR (Responsavel responsavel) {
		String comando = " INSERT INTO responsavel (idResponsavel, nomeResp, dataNasc) "
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
	
	public Responsavel checkIdR(int idResponsavel) {
		String comando = "select * from responsavel " +
				"where responsavel.idResponsavel = ?";
		Responsavel responsavel = new Responsavel();
		try {
			PreparedStatement p = this.conexao.prepareStatement(comando);
			p.setInt(1, idResponsavel);
			ResultSet rs = p.executeQuery();
			while (rs.next()) {
				
				int idResp = rs.getInt("idResponsavel");
				String nomeResp = rs.getString("nomeResp");
				String nascResp = rs.getString("dataNasc");
				
				
				responsavel.setNomeResp(nomeResp);
				responsavel.setNascResp(nascResp);
				
				responsavel.setIdResp(idResp);
						

			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return responsavel;
	}
	public boolean alterarR(Responsavel responsavel) {		
		String comando = "UPDATE responsavel "
				+ "SET nomeResponsavel=?, dataNasc=? "
				+ " WHERE idResponsavel=?";
		PreparedStatement p;
		try {
			
			p = this.conexao.prepareStatement(comando);
			p.setString(1, responsavel.getNomeResp());
			p.setString(2, responsavel.getNascResp());

			p.executeUpdate();

		}catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
}