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
import br.com.salaarcoiris.jdbc.JDBCUsuarioDAO;
import br.com.salaarcoiris.modelo.Usuario;


@Path("usuario")
public class UsuarioRest extends UtilRest{
	@POST
	@Path("/inserirU")
	@Consumes("application/*")
	public Response inserirU(String usuarioParam) {
		//System.out.println(usuarioParam);
		try {
			Usuario usuario = new Gson().fromJson(usuarioParam, Usuario.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			
			JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO(conexao);
			boolean retorno  = jdbcUsuario.inserirU(usuario);
			
//			System.out.println(retorno);
			conec.fecharConexao();
			
			return this.buildResponse(retorno);
		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	
	@GET
	@Path("/buscarU")
	@Consumes("application/*")
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarU(@QueryParam("valorBusca") String  emailUser) {
		try {
			List<JsonObject> listaUsuarios = new ArrayList<JsonObject>();
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO (conexao);
			listaUsuarios = jdbcUsuario.buscarU(emailUser);
			conec.fecharConexao();
			
			String json = new Gson().toJson(listaUsuarios);
			return this.buildResponse(json);
		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}				
	}
	
	@DELETE
	@Path("/excluir/{idUsuario}")
	@Consumes("application/*")
	public Response excluirA(@PathParam("idUsuario") int idUsuario) {
		try {
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO (conexao);
			
			boolean retorno = jdbcUsuario.deletarU(idUsuario);
			
			String msg = "";
			if(retorno) {
				msg="Usuario excluído com sucesso!";
			}else {
				msg="Erro ao excluir Usuario!";
			}
			
			conec.fecharConexao();
			
			return this.buildResponse(msg);
			
		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}			
	}
	
	@GET
	@Path("/checkIdU")
	@Produces(MediaType.APPLICATION_JSON)

	public Response checkIdU(@QueryParam("idUsuario")int idUsuario) {
		try {
			Usuario usuario= new Usuario();
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO (conexao);

			usuario = jdbcUsuario.checkIdU(idUsuario);

			conec.fecharConexao();
			return this.buildResponse(usuario);

		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	@PUT
	@Path("/alterarU")
	@Consumes("application/*")
	public Response alterarU(String usuarioParam) {
		try {
			Usuario usuario = new Gson().fromJson(usuarioParam, Usuario.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO (conexao);

			boolean retorno = jdbcUsuario.alterarU(usuario);

			conec.fecharConexao();
			return this.buildResponse(retorno);
		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	
}