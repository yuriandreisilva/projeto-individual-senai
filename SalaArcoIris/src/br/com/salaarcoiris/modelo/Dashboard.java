package br.com.salaarcoiris.modelo;

import java.io.Serializable;

public class Dashboard implements Serializable {

	private static final long serialVersionUID = 1L;
	private int qtd_emprestimo;
	private int status_emprestimo;
	private String mes_emprestimo;
	
	
	public int getQtd_emprestimo() {
		return qtd_emprestimo;
	}
	public void setQtd_emprestimo(int qtd_emprestimo) {
		this.qtd_emprestimo = qtd_emprestimo;
	}
	public String getMes_emprestimo() {
		return mes_emprestimo;
	}
	public void setMes_emprestimo(String mes_emprestimo) {
		this.mes_emprestimo = mes_emprestimo;
	}
	public int getStatus_emprestimo() {
		return status_emprestimo;
	}
	public void setStatus_emprestimo(int status_emprestimo) {
		this.status_emprestimo = status_emprestimo;
	}
	

}
