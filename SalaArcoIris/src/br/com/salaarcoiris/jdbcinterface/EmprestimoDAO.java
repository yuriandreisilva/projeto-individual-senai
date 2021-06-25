package br.com.salaarcoiris.jdbcinterface;

import java.util.List;
import com.google.gson.JsonObject;
import br.com.salaarcoiris.modelo.Emprestimo;

public interface EmprestimoDAO {
	public boolean inserirE (Emprestimo emprestimo);
	public int buscarUltimoId();
	public List<JsonObject>buscarE(String valorBusca); // Todos
	
	public List<JsonObject>buscarEmprestimoAndamento(String valorBusca);
	public List<JsonObject>buscarEmprestimoAtrasado(String valorBusca);
	public List<JsonObject>buscarEmprestimoFinalizado(String valorBusca);
	
	public List<JsonObject>buscarEmprestimoAndamentoAtrasado(String valorBusca);
	public List<JsonObject>buscarEmprestimoAndamentoFinalizado(String valorBusca);
	public List<JsonObject>buscarEmprestimoAtrasadoFinalizado(String valorBusca);
	
	public boolean alterarStatus(Emprestimo emprestimo);
	public boolean quitarE(Emprestimo emprestimo);
	public boolean prorrogarE(Emprestimo emprestimo);
	public List<JsonObject>buscarEmprestimoEspecifico(int valorBusca);
	
	
	
	// public boolean deletarE(int idEmprestimo);
	// public Emprestimo checkIdE(int idEmprestimo);
	// public boolean alterarE(Emprestimo emprestimo);
	
}
