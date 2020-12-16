package br.com.salaarcoiris.jdbcinterface;

import java.util.List;
import com.google.gson.JsonObject;
import br.com.salaarcoiris.modelo.Aluno;

public interface AlunoDAO {
	public boolean inserirA (Aluno aluno);
	public List<JsonObject> buscarA(String nome);
	public boolean deletarA(int idAluno);
	public Aluno checkIdA(int idAluno);
	public boolean alterarA(Aluno aluno);
	
}