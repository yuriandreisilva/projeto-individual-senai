package br.com.salaarcoiris.jdbcinterface;

import java.util.List;
import com.google.gson.JsonObject;
import br.com.salaarcoiris.modelo.Aluno;

public interface AlunoDAO {
	public boolean inserir (Aluno aluno);
	
}