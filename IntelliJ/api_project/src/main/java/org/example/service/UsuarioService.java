package org.example.service;

import org.example.model.Usuario;
import org.example.repository.UsuarioRepository;
import java.util.List;

public class UsuarioService {

    public static void cadastrarUsuario(String nome, String email) {
        Usuario usuario = new Usuario(nome, email);
        try {
            UsuarioRepository.cadastrarUsuarioBancoDeDados(usuario);
            System.out.println("Usuário " + nome + " cadastrado com sucesso!");
        } catch (Exception e) {
            System.out.println("Erro ao cadastrar usuário.");
            e.printStackTrace();
        }
    }

    public static void listarUsuarios() {
        List<Usuario> lista = UsuarioRepository.consultarTodosUsuarios();

        if (lista.isEmpty()) {
            System.out.println("Nenhum usuário cadastrado.");
        } else {
            System.out.println("--- Lista de Usuários ---");
            for (Usuario u : lista) {
                System.out.println("ID: " + u.getId() + " | Nome: " + u.getNome() + " | Email: " + u.getEmail());
            }
        }
    }
}