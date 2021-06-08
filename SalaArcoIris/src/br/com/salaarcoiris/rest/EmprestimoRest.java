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
import br.com.salaarcoiris.jdbc.JDBCEmprestimoDAO;
import br.com.salaarcoiris.modelo.Aluno;
import br.com.salaarcoiris.modelo.Emprestimo;

@Path("emprestimo")
public class EmprestimoRest extends UtilRest {
	@POST
	@Path("/inserirE")
	@Consumes("application/*")
	public Response inserirE(String emprestimoParam) {
		 
		try {
			Emprestimo emprestimo = new Gson().fromJson(emprestimoParam, Emprestimo.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();

			JDBCEmprestimoDAO jdbcEmprestimo = new JDBCEmprestimoDAO(conexao);
			boolean retorno = jdbcEmprestimo.inserirE(emprestimo);

			conec.fecharConexao();

			return this.buildResponse(retorno);
		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}

	@GET
	@Path("/buscarUltimoId")
	@Consumes("application/*")
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarUltimoId() {
		try {
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCEmprestimoDAO jdbcEmprestimo = new JDBCEmprestimoDAO(conexao);
			
			int id = jdbcEmprestimo.buscarUltimoId();
			conec.fecharConexao();

			return this.buildResponse(id);
		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}

	@GET
	@Path("/buscarE")
	@Consumes("application/*")
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarE(@QueryParam("valorBusca") String valorBusca) {
		try {
			List<JsonObject> listaEmprestimos = new ArrayList<JsonObject>();
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCEmprestimoDAO jdbcEmprestimo = new JDBCEmprestimoDAO(conexao);
			listaEmprestimos = jdbcEmprestimo.buscarE(valorBusca);
			
			conec.fecharConexao();

			String json = new Gson().toJson(listaEmprestimos);
			return this.buildResponse(json);
		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
		
 	@PUT
 	@Path("/alterarStatus")
 	@Consumes("application/*")
 	public Response alterarStatus(String emprestimoParam) {
 		try {
 			Emprestimo emprestimo = new Gson().fromJson(emprestimoParam, Emprestimo.class);
 			Conexao conec = new Conexao();
 			Connection conexao = conec.abrirConexao();
 			JDBCEmprestimoDAO jdbcEmprestimo = new JDBCEmprestimoDAO(conexao);

 			boolean retorno = jdbcEmprestimo.alterarStatus(emprestimo);

 			String msg = "";
 			if (retorno) {
 				msg = "Cadastro alterado com sucesso!";
 			} else {
 				msg = "Erro ao alterar cadastro";
 			}
 			conec.fecharConexao();
 			return this.buildResponse(msg);
 		} catch (Exception e) {
 			e.printStackTrace();
 			return this.buildErrorResponse(e.getMessage());
 		}
 	}
 	
 	@PUT
 	@Path("/quitarE")
// 	@Produces("application/json")
 	@Consumes("application/*")
 	public Response quitarE(String emprestimoParam) {
 		try {
// 			System.out.println(idEmprestimo +" chegando");
 			Emprestimo emprestimo = new Gson().fromJson(emprestimoParam, Emprestimo.class);
 			Conexao conec = new Conexao();
 			Connection conexao = conec.abrirConexao();
 			JDBCEmprestimoDAO jdbcEmprestimo = new JDBCEmprestimoDAO(conexao);

 			boolean retorno = jdbcEmprestimo.quitarE(emprestimo);

 			String msg = "";
 			if (retorno) {
 				msg = "Cadastro alterado com sucesso!";
 			} else {
 				msg = "Erro ao alterar cadastro";
 			}
 			conec.fecharConexao();
 			return this.buildResponse(msg);
 		} catch (Exception e) {
 			e.printStackTrace();
 			return this.buildErrorResponse(e.getMessage());
 		}
 	}

// 	@DELETE
// 	@Path("/excluir/{idEmprestimo}")
// 	@Consumes("application/*")
// 	public Response excluirA(@PathParam("idEmprestimo") int idEmprestimo) {
// 		try {
// 			Conexao conec = new Conexao();
// 			Connection conexao = conec.abrirConexao();
// 			JDBCEmprestimoDAO jdbcEmprestimo = new JDBCEmprestimoDAO(conexao);

// 			boolean retorno = jdbcEmprestimo.deletarE(idEmprestimo);

// 			String msg = "";
// 			if (retorno) {
// 				msg = "Emprestimo excluído com sucesso!";
// 			} else {
// 				msg = "Erro ao excluir Emprestimo!";
// 			}

// 			conec.fecharConexao();

// 			return this.buildResponse(msg);

// 		} catch (Exception e) {
// 			e.printStackTrace();
// 			return this.buildErrorResponse(e.getMessage());
// 		}
// 	}

// 	@GET
// 	@Path("/checkIdE")
// 	@Produces(MediaType.APPLICATION_JSON)

// 	public Response checkIdE(@QueryParam("idEmprestimo") int idEmprestimo) {
// 		try {
// 			Emprestimo emprestimo = new Emprestimo();
// 			Conexao conec = new Conexao();
// 			Connection conexao = conec.abrirConexao();
// 			JDBCEmprestimoDAO jdbcEmprestimo = new JDBCEmprestimoDAO(conexao);

// 			emprestimo = jdbcEmprestimo.checkIdE(idEmprestimo);

// 			conec.fecharConexao();
// 			return this.buildResponse(emprestimo);

// 		} catch (Exception e) {
// 			e.printStackTrace();
// 			return this.buildErrorResponse(e.getMessage());
// 		}
// 	}

// 	@PUT
// 	@Path("/alterarE")
// 	@Consumes("application/*")
// 	public Response alterarE(String emprestimoParam) {
// 		try {
// 			Emprestimo emprestimo = new Gson().fromJson(emprestimoParam, Emprestimo.class);
// 			Conexao conec = new Conexao();
// 			Connection conexao = conec.abrirConexao();
// 			JDBCEmprestimoDAO jdbcEmprestimo = new JDBCEmprestimoDAO(conexao);

// 			boolean retorno = jdbcEmprestimo.alterarE(emprestimo);

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