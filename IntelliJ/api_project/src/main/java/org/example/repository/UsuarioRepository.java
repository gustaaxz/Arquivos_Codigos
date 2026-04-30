package org.example.repository;

import org.example.Conexao;
import org.example.model.Usuario;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class UsuarioRepository {

    public static void cadastrarUsuarioBancoDeDados(Usuario usuario) throws SQLException {
        String command = """
                INSERT INTO usuarios
                (nome, email)
                VALUES (?, ?)
                """;

        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(command)) {
            stmt.setString(1, usuario.getNome());
            stmt.setString(2, usuario.getEmail());
            stmt.execute();
        }
    }

    public static List<Usuario> consultarTodosUsuarios() {
        String query = """
                SELECT id, nome, email 
                FROM usuarios
                """;
        List<Usuario> lista = new ArrayList<>();

        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(query)) {
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                lista.add(new Usuario(
                        rs.getInt("id"),
                        rs.getString("nome"),
                        rs.getString("email")
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return lista;
    }
}