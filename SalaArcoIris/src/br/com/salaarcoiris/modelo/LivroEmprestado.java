package br.com.salaarcoiris.modelo;

import java.util.Date;
import java.io.Serializable;

public class LivroEmprestado implements Serializable {

	private static final long serialVersionUID = 1L;
	private int idEmprestimo;
	private int id;
	private int qtd;

	
	public int getIdEmprestimo() {
		return idEmprestimo;
	}
	public void setIdEmprestimo(int idEmprestimo) {
		this.idEmprestimo = idEmprestimo;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getQtd() {
		return qtd;
	}
	public void setQtd(int qtd) {
		this.qtd = qtd;
	}
	
}
