package br.com.salaarcoiris.rest;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import br.com.salaarcoiris.bd.Conexao;
import br.com.salaarcoiris.jdbc.JDBCLivroDAO;
import br.com.salaarcoiris.modelo.Livro;

//INDICA O OBJETO POR LOCAL: LIVRO
@Path("livro")
public class LivroRest extends UtilRest{
	@POST
	// INDICA A CLASSE PELO: INSERIRL, QUE É ABERTO EM SEGUIDA
	@Path("/inserirL")
	// PEGARÁ TODA A APLICAÇÃO APÓS O *
	@Consumes("application/*")
	// INICIA A CLASSE COM O INSERIRL E PASSA O OBJETO EM FORMATO DE STRING COMO livroParam
	public Response inserirL(String livroParam) {
		//System.out.println(livroParam);
		try {
			Livro livro = new Gson().fromJson(livroParam, Livro.class);
			// FAZ O OBJETO RECEBER COM BIBLIOTECA GSON, DE JSON, COM OS ATRIBUTOS INSTANCIADO PARA A CLASSE LIVRO
			Conexao conec = new Conexao();
			// obojeto Conexao com nome conec recebe um novo método de conexão, método padrão da biblioteca
			// conexao do tipo Connection recebe a abertura da conexao, conec.método-criado gira a chave para o 
			// "motor" funcionar 
			Connection conexao = conec.abrirConexao();
			
			JDBCLivroDAO jdbcLivro = new JDBCLivroDAO(conexao);
			boolean retorno  = jdbcLivro.inserirL(livro);
			// RETORNO RECEBE DO JDBC UMA RESPOSTA TRUE OR FALSE, SE ESTIVER CORRETA
			// A LINHA DE COMANDO, O PARÂMETRO, OS MÉTODOS GETTERS/SETTERS E DEMAIS ITENS
			// ENTRARÁ NO IF COM MENSAGEM DE SUCESSO, IF VERIFICA SE TRUE, SE NÃO, MSG DE ERRO
			String msg="";
			
			if(retorno) {
				msg = "Livro cadastrado com sucesso!";
			}else {
				msg = "Erro ao cadastrar livro.";
			}
			
			conec.fecharConexao();
			
			// CONSTRÓI A RESPOSTA, PASSANDO A MENSAGEM
			// NO UTIL REST HÁ ESTA RESPOSTA CONSTRUIDA COM MÉTODO
			return this.buildResponse(msg);
		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
}