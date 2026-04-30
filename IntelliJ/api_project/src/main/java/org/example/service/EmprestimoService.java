package org.example.service;

import org.example.model.Emprestimos;
import org.example.model.Livros;
import org.example.repository.EmprestimoRepository;
import org.example.repository.LivroRepository;
import java.util.Date;

public class EmprestimoService {

    public static void emprestarLivro(int livroId, int usuarioId) {
        Emprestimos emprestimo = new Emprestimos(livroId, usuarioId, new Date(), null);

        try {
            EmprestimoRepository.registrarEmprestimoLivro(emprestimo);

            Livros livro = new Livros();
            livro.setIdLivro(livroId);
            livro.setDisponivel(false);
            LivroRepository.atualizarStatusDisponibilidadeLivro(livro);

            System.out.println("Livro ID " + livroId + " emprestado ao Usuário ID " + usuarioId);
        } catch (Exception e) {
            System.err.println("Erro: Verifique se o Livro e o Usuário existem no banco.");
            e.printStackTrace();
        }
    }

    public static void devolverLivro(int livroId) {
        try {
            EmprestimoRepository.registrarDevolucaoLivro(livroId);

            Livros livro = new Livros();
            livro.setIdLivro(livroId);
            livro.setDisponivel(true);
            LivroRepository.atualizarStatusDisponibilidadeLivro(livro);

            System.out.println("Livro ID " + livroId + " devolvido com sucesso!");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}