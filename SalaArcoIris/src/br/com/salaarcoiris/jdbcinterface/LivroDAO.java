package br.com.salaarcoiris.jdbcinterface;

import java.util.List;
import com.google.gson.JsonObject;
import br.com.salaarcoiris.modelo.Livro;

// INTERFACE PARA PADRONIZAR O PROJETO
// OBRIGARÁ O JDBC A TRABALHAR DESTA FORMA

public interface LivroDAO {
	public boolean inserirL (Livro livro);
	public List<JsonObject>buscarL(String nome);
	public boolean deletarL(int idLivro);
	public Livro checkIdL(int idLivro);
	public boolean alterarL(Livro livro);
	
}