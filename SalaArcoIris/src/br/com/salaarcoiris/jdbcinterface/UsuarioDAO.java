package br.com.salaarcoiris.jdbcinterface;

import java.util.List;
import com.google.gson.JsonObject;
import br.com.salaarcoiris.modelo.Usuario;

public interface UsuarioDAO {
	public boolean inserirU (Usuario usuario);
	public List<JsonObject>buscarU(String emailUser);
	public boolean deletarU(int idUsuario);
	public Usuario checkIdU(int idUsuario);
	public boolean alterarU(Usuario usuario);
	
}