package br.com.salaarcoiris.jdbc;

import java.sql.Connection;
//import com.mysql.jdbc.Connection;
import java.sql.ResultSet;

import br.com.salaarcoiris.modelo.Usuario;

public class JDBCAutenticaDAO {
	private Connection conexao;
	public JDBCAutenticaDAO(Connection conexao) {
		//TODO Auto-generated constructor stub
		this.conexao = conexao;
	}
	
	public boolean consultar (Usuario dadosautentica) {
		try {
			String comando = "SELECT * FROM adm_usuario WHERE emailUsuario ='"+dadosautentica.getEmailUsuario()+"' and senhaUsuario = '"+dadosautentica.getSenhaUsuario()+"'";
		
		java.sql.Statement stmt = conexao.createStatement();
		ResultSet rs = stmt.executeQuery(comando);
		System.out.println(comando);
		if(rs.next()) {
				return true;
			}else {
				return false;
			}
		}catch(Exception e){
			return false;
		}
	}
}
