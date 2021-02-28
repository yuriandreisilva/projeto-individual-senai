package br.com.salaarcoiris.modelo;

import java.util.Date;
import java.io.Serializable;

public class Aluno implements Serializable {

	private static final long serialVersionUID = 1L;
	private int idAluno, idResp;
	private String cpfAluno;
	private String nomeAluno;
	private String nascAluno;
	private String email;
	private int senha;
	
	private String nomeResp;
	private String dataNascResp;
	
	public String getNomeResp() {
		return nomeResp;
	}
	public void setNomeResp(String nomeResp) {
		this.nomeResp = nomeResp;
	}
	public String getDataNascResp() {
		return dataNascResp;
	}
	public void setDataNascResp(String dataNascResp) {
		this.dataNascResp = dataNascResp;
	}
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
	public String getCpfAluno() {
		return cpfAluno;
	}
	public void setCpfAluno(String cpfAluno) {
		this.cpfAluno = cpfAluno;
	}
	public String getNomeAluno() {
		return nomeAluno;
	}
	public void setNomeAluno(String nomeAluno) {
		this.nomeAluno = nomeAluno;
	}
	
	public String getNascAluno() {
		return nascAluno;
	}
	public void setNascAluno(String nascAluno) {
		this.nascAluno = nascAluno;
	}
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public int getSenha() {
		return senha;
	}
	public void setSenha(int senha) {
		this.senha = senha;
	}
	
	
}
