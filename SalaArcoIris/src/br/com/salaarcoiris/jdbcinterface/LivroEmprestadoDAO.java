package br.com.salaarcoiris.jdbcinterface;

import java.util.List;
import com.google.gson.JsonObject;
import br.com.salaarcoiris.modelo.LivroEmprestado;

public interface LivroEmprestadoDAO {
	public boolean inserirLE (LivroEmprestado[] livroEmprestado);
 	public List<JsonObject>buscarLE(String id);
// 	public boolean deletarLE(int idLivroEmprestado);
// 	public LivroEmprestado checkIdLE(int idLivroEmprestado);
// 	public boolean alterarLE(LivroEmprestado livroEmprestado);	
}