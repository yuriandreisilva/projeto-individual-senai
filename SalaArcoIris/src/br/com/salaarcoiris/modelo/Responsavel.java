package br.com.salaarcoiris.modelo;

import java.util.Date;
import java.io.Serializable;

public class Responsavel implements Serializable {

	private static final long serialVersionUID = 1L;
	private int idResp;
	private String nomeResp;
	private String nascResp;
	
	public int getIdResp() {
		return idResp;
	}
	public void setIdResp(int idResp) {
		this.idResp = idResp;
	}
	public String getNomeResp() {
		return nomeResp;
	}
	public void setNomeResp(String nomeResp) {
		this.nomeResp = nomeResp;
	}
	public String getNascResp() {
		return nascResp;
	}
	public void setNascResp(String nascResp) {
		this.nascResp = nascResp;
	}
	
	
}