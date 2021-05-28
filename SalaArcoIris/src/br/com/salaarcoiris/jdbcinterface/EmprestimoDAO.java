package br.com.salaarcoiris.jdbcinterface;

import java.util.List;
import com.google.gson.JsonObject;
import br.com.salaarcoiris.modelo.Emprestimo;

public interface EmprestimoDAO {
	public boolean inserirE (Emprestimo emprestimo);
	public int buscarUltimoId();
	public List<JsonObject>buscarE(String valorBusca);
	// public boolean deletarE(int idEmprestimo);
	// public Emprestimo checkIdE(int idEmprestimo);
	// public boolean alterarE(Emprestimo emprestimo);
	
}
