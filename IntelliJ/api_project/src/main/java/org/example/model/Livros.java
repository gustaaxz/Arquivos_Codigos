package org.example.model;

public class Livros {
    private int id, ano, idEmprestimo, idLivro;
    private String titulo, autor, tituloLivro;
    private boolean disponivel;

    public Livros(int id, int ano, String titulo, String autor, boolean disponivel) {
        this.id = id;
        this.ano = ano;
        this.titulo = titulo;
        this.autor = autor;
        this.disponivel = disponivel;
    }

    public Livros(int ano, String titulo, String autor, boolean disponivel) {
        this.ano = ano;
        this.titulo = titulo;
        this.autor = autor;
        this.disponivel = disponivel;
    }

    public Livros(String titulo, String autor, int ano) {
        this.titulo = titulo;
        this.autor = autor;
        this.ano = ano;
    }

    public Livros(int idEmprestimo, int idLivro, String tituloLivro) {
        this.idEmprestimo = idEmprestimo;
        this.idLivro = idLivro;
        this.tituloLivro = tituloLivro;
    }

    public Livros(int idLivro, boolean disponivel) {
        this.idLivro = idLivro;
        this.disponivel = disponivel;
    }

    public Livros() {

    }

    public int getIdEmprestimo() {
        return idEmprestimo;
    }

    public int getIdLivro() {
        return idLivro;
    }

    public String getTituloLivro() {
        return tituloLivro;
    }

    public int getId() {
        return id;
    }

    public int getAno() {
        return ano;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getAutor() {
        return autor;
    }

    public boolean isDisponivel() {
        return disponivel;
    }

    public void setAno(int ano) {
        this.ano = ano;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public void setDisponivel(boolean disponivel) {
        this.disponivel = disponivel;
    }

    public void setIdEmprestimo(int idEmprestimo) {
        this.idEmprestimo = idEmprestimo;
    }

    public void setIdLivro(int idLivro) {
        this.idLivro = idLivro;
    }

    public void setTituloLivro(String tituloLivro) {
        this.tituloLivro = tituloLivro;
    }
}
