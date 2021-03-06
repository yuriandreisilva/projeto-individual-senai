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
import br.com.salaarcoiris.jdbc.JDBCAlunoDAO;
import br.com.salaarcoiris.modelo.Aluno;

@Path("aluno")
public class AlunoRest extends UtilRest {
	@POST
	@Path("/inserirA")
	@Consumes("application/*")
	public Response inserirA(String alunoParam) {
		// System.out.println(alunoParam);
		try {
			Aluno aluno = new Gson().fromJson(alunoParam, Aluno.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();

			JDBCAlunoDAO jdbcAluno = new JDBCAlunoDAO(conexao);
			boolean retorno = jdbcAluno.inserirA(aluno);

			// System.out.println(retorno);
			conec.fecharConexao();

			return this.buildResponse(retorno);
		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}

	@GET
	@Path("/buscarA")
	@Consumes("application/*")
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarA(@QueryParam("valorBusca") String nome) {
		try {
			List<JsonObject> listaAlunos = new ArrayList<JsonObject>();
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCAlunoDAO jdbcAluno = new JDBCAlunoDAO(conexao);
			listaAlunos = jdbcAluno.buscarA(nome);
			conec.fecharConexao();

			String json = new Gson().toJson(listaAlunos);
			return this.buildResponse(json);
		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}

	@DELETE
	@Path("/excluir/{idAluno}")
	@Consumes("application/*")
	public Response excluirA(@PathParam("idAluno") int idAluno) {
		try {
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCAlunoDAO jdbcAluno = new JDBCAlunoDAO(conexao);

			boolean retorno = jdbcAluno.deletarA(idAluno);

			String msg = "";
			if (retorno) {
				msg = "Aluno excluído com sucesso!";
			} else {
				msg = "Erro ao excluir Aluno!";
			}

			conec.fecharConexao();

			return this.buildResponse(msg);

		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}

	@GET
	@Path("/checkIdA")
	@Produces(MediaType.APPLICATION_JSON)

	public Response checkIdA(@QueryParam("idAluno") int idAluno) {
		try {
			Aluno aluno = new Aluno();
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCAlunoDAO jdbcAluno = new JDBCAlunoDAO(conexao);

			aluno = jdbcAluno.checkIdA(idAluno);

			conec.fecharConexao();
			return this.buildResponse(aluno);

		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}

	@PUT
	@Path("/alterarA")
	@Consumes("application/*")
	public Response alterarA(String alunoParam) {
		try {
			Aluno aluno = new Gson().fromJson(alunoParam, Aluno.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCAlunoDAO jdbcAluno = new JDBCAlunoDAO(conexao);

			boolean retorno = jdbcAluno.alterarA(aluno);

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
}