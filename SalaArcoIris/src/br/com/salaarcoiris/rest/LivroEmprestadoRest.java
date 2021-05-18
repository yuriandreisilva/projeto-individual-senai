package br.com.salaarcoiris.rest;

import java.sql.Connection;

import java.util.ArrayList;
import java.util.List;

import java.util.Arrays;

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
//import org.json.JSONArray;

//import org.json.JSONArray;


import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
import com.mysql.cj.conf.ConnectionUrl.Type;
import com.mysql.cj.x.protobuf.MysqlxCrud.Collection;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import br.com.salaarcoiris.bd.Conexao;
import br.com.salaarcoiris.jdbc.JDBCLivroEmprestadoDAO;
import br.com.salaarcoiris.modelo.LivroEmprestado;

@Path("livroEmprestado")
public class LivroEmprestadoRest extends UtilRest {
	@POST
	@Path("/inserirLE")
	@Consumes("application/*")
	public Response inserirLE(String livroEmprestadoParam) {
		 System.out.println(livroEmprestadoParam);
		try {
			LivroEmprestado[] livroEmprestado = new Gson().fromJson(livroEmprestadoParam, LivroEmprestado[].class);

			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			
			JDBCLivroEmprestadoDAO jdbcEmprestimo = new JDBCLivroEmprestadoDAO(conexao);
			boolean retorno  = jdbcEmprestimo.inserirLE(livroEmprestado);
					
			System.out.println(retorno);
			conec.fecharConexao();
			
			return this.buildResponse(livroEmprestadoParam);
			

		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}

// 	@GET
// 	@Path("/buscarLE")
// 	@Consumes("application/*")
// 	@Produces(MediaType.APPLICATION_JSON)
// 	public Response buscarLE(@QueryParam("valorBusca") String nome) {
// 		try {
// 			List<JsonObject> listaLivroEmprestados = new ArrayList<JsonObject>();
// 			Conexao conec = new Conexao();
// 			Connection conexao = conec.abrirConexao();
// 			JDBCLivroEmprestadoDAO jdbcLivroEmprestado = new JDBCLivroEmprestadoDAO(conexao);
// 			listaLivroEmprestados = jdbcLivroEmprestado.buscarLE(nome);
// 			conec.fecharConexao();

// 			String json = new Gson().toJson(listaLivroEmprestados);
// 			return this.buildResponse(json);
// 		} catch (Exception e) {
// 			e.printStackTrace();
// 			return this.buildErrorResponse(e.getMessage());
// 		}
// 	}

// 	@DELETE
// 	@Path("/excluir/{idLivroEmprestado}")
// 	@Consumes("application/*")
// 	public Response excluirA(@PathParam("idLivroEmprestado") int idLivroEmprestado) {
// 		try {
// 			Conexao conec = new Conexao();
// 			Connection conexao = conec.abrirConexao();
// 			JDBCLivroEmprestadoDAO jdbcLivroEmprestado = new JDBCLivroEmprestadoDAO(conexao);

// 			boolean retorno = jdbcLivroEmprestado.deletarLE(idLivroEmprestado);

// 			String msg = "";
// 			if (retorno) {
// 				msg = "LivroEmprestado excluído com sucesso!";
// 			} else {
// 				msg = "Erro ao excluir LivroEmprestado!";
// 			}

// 			conec.fecharConexao();

// 			return this.buildResponse(msg);

// 		} catch (Exception e) {
// 			e.printStackTrace();
// 			return this.buildErrorResponse(e.getMessage());
// 		}
// 	}

// 	@GET
// 	@Path("/checkIdLE")
// 	@Produces(MediaType.APPLICATION_JSON)

// 	public Response checkIdLE(@QueryParam("idLivroEmprestado") int idLivroEmprestado) {
// 		try {
// 			LivroEmprestado livroEmprestado = new LivroEmprestado();
// 			Conexao conec = new Conexao();
// 			Connection conexao = conec.abrirConexao();
// 			JDBCLivroEmprestadoDAO jdbcLivroEmprestado = new JDBCLivroEmprestadoDAO(conexao);

// 			livroEmprestado = jdbcLivroEmprestado.checkIdLE(idLivroEmprestado);

// 			conec.fecharConexao();
// 			return this.buildResponse(livroEmprestado);

// 		} catch (Exception e) {
// 			e.printStackTrace();
// 			return this.buildErrorResponse(e.getMessage());
// 		}
// 	}

// 	@PUT
// 	@Path("/alterarLE")
// 	@Consumes("application/*")
// 	public Response alterarLE(String livroEmprestadoParam) {
// 		try {
// 			LivroEmprestado livroEmprestado = new Gson().fromJson(livroEmprestadoParam, LivroEmprestado.class);
// 			Conexao conec = new Conexao();
// 			Connection conexao = conec.abrirConexao();
// 			JDBCLivroEmprestadoDAO jdbcLivroEmprestado = new JDBCLivroEmprestadoDAO(conexao);

// 			boolean retorno = jdbcLivroEmprestado.alterarLE(livroEmprestado);

// 			String msg = "";
// 			if (retorno) {
// 				msg = "Cadastro alterado com sucesso!";
// 			} else {
// 				msg = "Erro ao alterar cadastro";
// 			}
// 			conec.fecharConexao();
// 			return this.buildResponse(msg);
// 		} catch (Exception e) {
// 			e.printStackTrace();
// 			return this.buildErrorResponse(e.getMessage());
// 		}
// 	}
 }