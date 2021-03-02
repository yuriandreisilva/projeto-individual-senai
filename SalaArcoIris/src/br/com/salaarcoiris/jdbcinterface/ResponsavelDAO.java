package br.com.salaarcoiris.jdbcinterface;

import java.util.List;
import com.google.gson.JsonObject;

import br.com.salaarcoiris.modelo.Responsavel;

public interface ResponsavelDAO {
	public boolean inserirR(Responsavel responsavel);
	public boolean alterarR(Responsavel responsavel);
	public Responsavel checkIdR(int idResponsavel);
	public boolean deletarR(int idResponsavel);
	
}