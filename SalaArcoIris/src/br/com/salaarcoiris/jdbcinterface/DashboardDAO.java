package br.com.salaarcoiris.jdbcinterface;

import java.util.List;
import com.google.gson.JsonObject;

public interface DashboardDAO {
	public List<JsonObject>buscarQtdEmprestimoFinalizado();	
}
