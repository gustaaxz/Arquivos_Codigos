package org.example;

import org.example.repository.LivroRepository;
import org.example.service.EmprestimoService;
import org.example.service.LivroService;
import org.example.service.UsuarioService;

public class Main {
    public static void main(String[] args) {
        // cadastrarLivro();
        // consultarTodosLivrosCadastrados();
        // consultarTodosEmprestimosFeitos();
        // atualizarStatusDisponibilidadeLivro();
        // cadastrarUsuario();
        // listarUsuarios();
        // emprestarLivro();
        // devolverLivro();
    }

    public static void cadastrarLivro() {
        String tituloLivro = "O Pequeno Príncipe";
        String autorLivro = "Antoine de Saint-Exupéry";
        int anoLivro = 1943;
        LivroService.cadastrarLivro(tituloLivro,autorLivro, anoLivro);
    }

    public static void consultarTodosLivrosCadastrados(){
        LivroService.consultarTodosLivrosCadastrados();
    }

    public static void consultarTodosEmprestimosFeitos() {
        LivroService.consultarTodosEmprestimosFeitos();
    }

    public static void atualizarStatusDisponibilidadeLivro() {
        int idLivro = 2;
        boolean disponivel = false; // false (0 - INDISPONIVEL)
        // boolean disponivel = true (1 - DISPONIVEL)
        LivroService.atualizarStatusDisponibilidadeLivro(idLivro, disponivel);
    }

    public static void emprestarLivro() {
        int livroId = 1;
        int usuarioId = 1;

        EmprestimoService.emprestarLivro(livroId, usuarioId);
    }

    public static void devolverLivro(){
        int livroId = 1;

        EmprestimoService.devolverLivro(livroId);
    }

    public static void cadastrarUsuario(){
        String nome = "Roberto";
        String email = "roberto@gmail.com";

        UsuarioService.cadastrarUsuario(nome, email);
    }

    public static void listarUsuarios(){
        UsuarioService.listarUsuarios();
    }
}