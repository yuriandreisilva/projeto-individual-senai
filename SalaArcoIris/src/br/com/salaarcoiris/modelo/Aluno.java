package br.com.salaarcoiris.modelo;

import java.util.Date;

public class Aluno {
	private int idAluno, idResp;
	private int cpfAluno;
	private String nomeAluno, nomeResp;
	private String nascAluno, nascResp;
	private String email;
	private String senha;
	
	
	public int getIdAluno() {
		return idAluno;
	}
	public void setIdAluno(int idAluno) {
		this.idAluno = idAluno;
	}
	public int getIdResp() {
		return idResp;
	}
	public void setIdResp(int idResp) {
		this.idResp = idResp;
	}
	public int getCpfAluno() {
		return cpfAluno;
	}
	public void setCpfAluno(int cpfAluno) {
		this.cpfAluno = cpfAluno;
	}
	public String getNomeAluno() {
		return nomeAluno;
	}
	public void setNomeAluno(String nomeAluno) {
		this.nomeAluno = nomeAluno;
	}
	public String getNomeResp() {
		return nomeResp;
	}
	public void setNomeResp(String nomeResp) {
		this.nomeResp = nomeResp;
	}
	public String getNascAluno() {
		return nascAluno;
	}
	public void setNascAluno(String nascAluno) {
		this.nascAluno = nascAluno;
	}
	public String getNascResp() {
		return nascResp;
	}
	public void setNascResp(String nascResp) {
		this.nascResp = nascResp;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getSenha() {
		return senha;
	}
	public void setSenha(String senha) {
		this.senha = senha;
	}
	
	
}
