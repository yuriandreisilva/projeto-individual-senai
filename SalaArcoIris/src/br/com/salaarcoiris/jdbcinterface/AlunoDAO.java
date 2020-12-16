package br.com.salaarcoiris.jdbcinterface;

import java.util.List;
import com.google.gson.JsonObject;
import br.com.salaarcoiris.modelo.Aluno;

public interface AlunoDAO {
	public boolean inserir (Aluno aluno);
	public List<JsonObject> buscar(String nome);
	public boolean deletar(int idAluno);
	public Aluno checkIdA(int idAluno);
	public boolean alterarA(Aluno aluno);
	
}