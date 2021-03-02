package br.com.salaarcoiris.modelo;

import java.io.Serializable;

public class Responsavel implements Serializable {

	private static final long serialVersionUID = 1L;
	private int idResponsavel;
	private String nomeResp;
	private String nascResp;
	
	public int getIdResponsavel() {
		return idResponsavel;
	}
	public void setIdResponsavel(int idResponsavel) {
		this.idResponsavel = idResponsavel;
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