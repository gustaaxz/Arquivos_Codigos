package org.example.repository;

import org.example.Conexao;
import org.example.model.Livros;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class LivroRepository {

    public static void cadastrarLivroBancoDeDados(Livros livros) throws SQLException {
        String command = """
                INSERT INTO livros
                (titulo, autor, ano)
                VALUES (?, ?, ?)
                """;

        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(command)) {
            stmt.setString(1, livros.getTitulo());
            stmt.setString(2, livros.getAutor());
            stmt.setInt(3, livros.getAno());
            stmt.execute();
        }
    }

    public static List<Livros> consultarTodosEmprestimosFeitos() {
        String query = """
                SELECT e.id, e.livro_id, l.titulo
                FROM emprestimos e
                JOIN livros l ON e.livro_id = l.id
                """;
        List<Livros> lista = new ArrayList<>();

        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(query)) {
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                lista.add(new Livros(
                        rs.getInt("id"),
                        rs.getInt("livro_id"),
                        rs.getString("titulo")
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return lista;
    }

    public static List<Livros> consultarTodosLivros() {
        String query = """
                SELECT titulo, autor, ano 
                FROM livros
                """;
        List<Livros> lista = new ArrayList<>();

        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(query)) {
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                lista.add(new Livros(
                        rs.getString("titulo"),
                        rs.getString("autor"),
                        rs.getInt("ano")
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return lista;
    }

    public static void atualizarStatusDisponibilidadeLivro(Livros livro) throws SQLException {
        String command = """
                UPDATE livros
                SET disponivel = ?
                WHERE id = ?
                """;

        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(command)) {
            stmt.setBoolean(1, livro.isDisponivel());
            stmt.setInt(2, livro.getIdLivro());
            stmt.executeUpdate();
        }
    }
}