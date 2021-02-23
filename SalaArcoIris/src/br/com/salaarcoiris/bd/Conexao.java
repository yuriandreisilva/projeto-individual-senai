package br.com.salaarcoiris.bd;

import java.sql.Connection;

public class Conexao {

	private Connection conexao;
	// conexao do tipo Connection

	public Connection abrirConexao() {
		try {
			// Passamos o forName, método da classe, padrão da biblioteca, para estabelecer uma nova instância, com o 
			// método padrão da biblioteca também
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			// conexão irá receber os dados do servidor, com a ajuda do "DriverManager" (aquele baixado no projeto, nas libraries,
			// que é o que faz a ligação do front com back
			// getConnection() método da biblioteca, para "assimilar" os dados do tipo e identificação do servidor
			// jdbc = java database connection 
			// tipo de banco: mysql
			// localhost = servidor
			// sala_arco_iris = nome do banco
			// + o usuário e senha
			conexao = java.sql.DriverManager.getConnection("jdbc:mysql://localhost/sala_arco_iris?"
					+"user=root&password=root&useTimezone=true&serverTimezone=UTC");
		}catch(Exception e) {
			e.printStackTrace();
		}
		return conexao;
	}
public void fecharConexao() {
	try {
		conexao.close();
	}catch(Exception e) {
		e.printStackTrace();
	}
}
}