package br.com.salaarcoiris.rest;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import br.com.salaarcoiris.bd.Conexao;
import br.com.salaarcoiris.jdbc.JDBCDashboardDAO;


@Path("emprestimo")
public class DashboardRest extends UtilRest {
	@GET
	@Path("/buscarQtdEmprestimoFinalizado")
	@Consumes("application/*")
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarQtdEmprestimoFinalizado() {
		try {
			List<JsonObject> listaEmprestimos = new ArrayList<JsonObject>();
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCDashboardDAO jdbcEmprestimo = new JDBCDashboardDAO(conexao);
			listaEmprestimos = jdbcEmprestimo.buscarQtdEmprestimoFinalizado();
			
			conec.fecharConexao();

			String json = new Gson().toJson(listaEmprestimos);
			return this.buildResponse(json);
		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	
	@GET
	@Path("/buscarQtdEmprestimoGeral")
	@Consumes("application/*")
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarQtdEmprestimoGeral() {
		try {
			List<JsonObject> listaEmprestimos = new ArrayList<JsonObject>();
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCDashboardDAO jdbcEmprestimo = new JDBCDashboardDAO(conexao);
			listaEmprestimos = jdbcEmprestimo.buscarQtdEmprestimoGeral();
			
			conec.fecharConexao();

			String json = new Gson().toJson(listaEmprestimos);
			return this.buildResponse(json);
		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
}

