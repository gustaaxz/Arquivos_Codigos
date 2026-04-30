package org.example.service;

import org.example.model.Livros;
import org.example.repository.LivroRepository;

import java.sql.SQLException;
import java.util.List;

public class LivroService {

    public static void cadastrarLivro(String tituloLivro, String autorLivro, int anoLivro) {
        Livros livro = new Livros(tituloLivro, autorLivro, anoLivro);
        try {
            LivroRepository.cadastrarLivroBancoDeDados(livro);
            System.out.println("Livro cadastrado com sucesso!");
        } catch (Exception e) {
            System.out.println("Erro ao cadastrar livro.");
            e.printStackTrace();
        }
    }

    public static void consultarTodosLivrosCadastrados() {
        List<Livros> lista = LivroRepository.consultarTodosLivros();
        if (lista.isEmpty()) {
            System.out.println("Nenhum livro encontrado.");
        } else {
            for (Livros l : lista) {
                System.out.println("Título: " + l.getTitulo() + " | Autor: " + l.getAutor() + " | Ano: " + l.getAno());
            }
        }
    }

    public static void consultarTodosEmprestimosFeitos() {
        List<Livros> lista = LivroRepository.consultarTodosEmprestimosFeitos();
        if (lista.isEmpty()) {
            System.out.println("Nenhum empréstimo registrado.");
        } else {
            for (Livros l : lista) {
                System.out.println("ID Empréstimo: " + l.getId() + " | Título: " + l.getTitulo());
            }
        }
    }

    public static void atualizarStatusDisponibilidadeLivro(int idLivro, boolean disponivel) {
        Livros livro = new Livros(idLivro, disponivel);
        livro.setIdLivro(idLivro);
        livro.setDisponivel(disponivel);

        try {
            LivroRepository.atualizarStatusDisponibilidadeLivro(livro);
            System.out.println("Status de disponibilidade atualizado com sucesso!");
        } catch (SQLException e) {
            System.out.println("Erro ao atualizar disponibilidade.");
            e.printStackTrace();
        }
    }
}