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
import br.com.salaarcoiris.jdbc.JDBCResponsavelDAO;
import br.com.salaarcoiris.modelo.Responsavel;


@Path("responsavel")
public class ResponsavelRest extends UtilRest{
	@POST
	@Path("/inserir")
	@Consumes("application/*")
	public Response inserir(String responsavelParam) {
		try {
			Responsavel responsavel = new Gson().fromJson(responsavelParam, Responsavel.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			
			JDBCResponsavelDAO jdbcResponsavel = new JDBCResponsavelDAO(conexao);
			boolean retorno  = jdbcResponsavel.inserir(responsavel);
			String msg="";
			
			if(retorno) {
				msg = "Responsavel cadastrado com sucesso!";
			}else {
				msg = "Erro ao cadastrar aluno.";
			}
			
			conec.fecharConexao();
			
			return this.buildResponse(msg);
		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
}