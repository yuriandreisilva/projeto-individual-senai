package br.com.salaarcoiris.modelo;

import java.util.Date;
import java.io.Serializable;

public class Livro implements Serializable {

	private static final long serialVersionUID = 1L;
	private int idLivro, statusLivro, qtdEstoque;
	private String nomeLivro;
	private String codigoLivro;
	private String publicacao;
	
	public int getIdLivro() {
		return idLivro;
	}
	public void setIdLivro(int idLivro) {
		this.idLivro = idLivro;
	}
	public int getStatusLivro() {
		return statusLivro;
	}
	public void setStatusLivro(int statusLivro) {
		this.statusLivro = statusLivro;
	}
	public String getPublicacao() {
		return publicacao;
	}
	public void setPublicacao(String publicacao) {
		this.publicacao = publicacao;
	}
	public int getQtdEstoque() {
		return qtdEstoque;
	}
	public void setQtdEstoque(int qtdEstoque) {
		this.qtdEstoque = qtdEstoque;
	}
	public String getNomeLivro() {
		return nomeLivro;
	}
	public void setNomeLivro(String nomeLivro) {
		this.nomeLivro = nomeLivro;
	}
	public String getCodigoLivro() {
		return codigoLivro;
	}
	public void setCodigoLivro(String codigoLivro) {
		this.codigoLivro = codigoLivro;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
	
}
