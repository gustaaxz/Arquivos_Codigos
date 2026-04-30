package org.example.repository;

import org.example.Conexao;
import org.example.model.Emprestimos;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;

public class EmprestimoRepository {

    public static void registrarEmprestimoLivro(Emprestimos emprestimo) throws SQLException {
        String command = """
                INSERT INTO emprestimos
                (livro_id, usuario_id, data_emprestimo)
                VALUES (?, ?, ?)
                """;

        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(command)) {
            stmt.setInt(1, emprestimo.getLivro_id());
            stmt.setInt(2, emprestimo.getUsuario_id());
            stmt.setTimestamp(3, new Timestamp(emprestimo.getData_emprestimo().getTime()));
            stmt.execute();
        }
    }

    public static void registrarDevolucaoLivro(int livroId) throws SQLException {
        String command = """
                UPDATE emprestimos
                SET data_devolucao = ?
                WHERE livro_id = ? AND data_devolucao IS NULL
                """;

        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(command)) {
            stmt.setTimestamp(1, new Timestamp(System.currentTimeMillis()));
            stmt.setInt(2, livroId);
            stmt.executeUpdate();
        }
    }
}