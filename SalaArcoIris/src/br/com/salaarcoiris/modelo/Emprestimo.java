package br.com.salaarcoiris.modelo;

import java.util.Date;
import java.io.Serializable;

public class Emprestimo implements Serializable {

	private static final long serialVersionUID = 1L;
	private int idEmprestimo;
	private String dataEmprestimo;
	private String dataDevolucao;
	private int status;
	private float valorMulta;
	private int idAluno;
	private int idUsuario;

    private int nomeAluno;
    private int cpfAluno;

    public int getIdEmprestimo() {
        return  idEmprestimo;
    }

    public void setIdEmprestimo(int idEmprestimo) {
        this.idEmprestimo =  idEmprestimo;
    }

    public String getDataEmprestimo() {
        return  dataEmprestimo;
    }

    public void setDataEmprestimo(String dataEmprestimo) {
        this.dataEmprestimo =  dataEmprestimo;
    }

    public String getDataDevolucao() {
        return  dataDevolucao;
    }

    public void setDataDevolucao(String dataDevolucao) {
        this.dataDevolucao =  dataDevolucao;
    }

    public int getStatus() {
        return  status;
    }

    public void setStatus(int status) {
        this.status =  status;
    }

    public float getValorMulta() {
        return  valorMulta;
    }

    public void setValorMulta(float valorMulta) {
        this.valorMulta =  valorMulta;
    }

    public int getIdAluno() {
        return  idAluno;
    }

    public void setIdAluno(int idAluno) {
        this.idAluno =  idAluno;
    }

    public int getIdUsuario() {
        return  idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario =  idUsuario;
    }

	public int getNomeAluno() {
        return  nomeAluno;
    }

    public void setNomeAluno(int nomeAluno) {
        this.nomeAluno =  nomeAluno;
    }

    public int getCpfAluno() {
        return  cpfAluno;
    }

    public void setCpfAluno(int cpfAluno) {
        this.cpfAluno =  cpfAluno;
    }
}
