package org.example;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ContatoDAO {

    public void salvar(Contato contato) throws SQLException {
        String command = """
                INSERT INTO contato
                (nome, numero)
                VALUES
                (?,?)
                """;
        try(Connection conn = Conexao.conectar();
            PreparedStatement stmt = conn.prepareStatement(command)){
            stmt.setString(1, contato.getNome());
            stmt.setString(2, contato.getNumero());
            stmt.executeUpdate();
        }

    }

    public List<Contato> listarContatos() throws SQLException{
        List<Contato> contatos = new ArrayList<>();
        String query = """
                SELECT id, nome, numero
                FROM contato;
                """;
        try(Connection conn = Conexao.conectar();
            PreparedStatement stmt = conn.prepareStatement(query)){
            ResultSet rs = stmt.executeQuery();
            while(rs.next()){
                int id = rs.getInt("id");
                String nome = rs.getString("nome");
                String numero = rs.getString("numero");

                contatos.add(new Contato(id,nome,numero));
            }
        }
        return contatos;
    }

    public void atualizarContato(Contato contato) throws SQLException{
        String command = """
                UPDATE contato
                SET nome = ?, numero = ?
                WHERE id = ?;
                """;

        try(Connection conn = Conexao.conectar();
            PreparedStatement stmt = conn.prepareStatement(command)){

            stmt.setString(1, contato.getNome());
            stmt.setString(2, contato.getNumero());
            stmt.setInt(3, contato.getId());
            stmt.executeUpdate();
        }
    }

    public List<Contato> buscarContato(String nomeBusca) throws SQLException {
        List<Contato> contatos = new ArrayList<>();
        String query = "SELECT id, nome, numero " + "FROM contato " + "WHERE nome LIKE ?";

        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(query)) {

                stmt.setString(1, "%" + nomeBusca + "%");

            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    int id = rs.getInt("id");
                    String nome = rs.getString("nome");
                    String numero = rs.getString("numero");
                    contatos.add(new Contato(id, nome, numero));
                }
            }
        }
        return contatos;
    }

    public void excluirContato(int idExclusao) throws SQLException{
        String command = """
                DELETE FROM contato WHERE id = ?;
                """;

        try(Connection conn = Conexao.conectar();
            PreparedStatement stmt = conn.prepareStatement(command)){

            stmt.setInt(1, idExclusao);
            stmt.executeUpdate();
        }
    }

    public List<Contato> buscarIdContato(List<Contato> contatos) throws SQLException {
        int ids = contatos.size();
        String stringInterrogacoes = "";

        for (int i = 0; i < ids; i++) {
            stringInterrogacoes += "?";
            if (i < ids - 1) {
                stringInterrogacoes += ", ";
            }
        }

        String query = "SELECT id, nome, numero " +
                       "FROM contato " +
                       "WHERE id IN (" + stringInterrogacoes + ")";

        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(query)) {

            for (int i = 0; i < contatos.size(); i++) {
                stmt.setInt(i + 1, contatos.get(i).getId());
            }

            try (ResultSet rs = stmt.executeQuery()) {
                List<Contato> resultados = new ArrayList<>();
                while (rs.next()) {
                    int id = rs.getInt("id");
                    String nome = rs.getString("nome");
                    String numero = rs.getString("numero");
                    resultados.add(new Contato(id, nome, numero));
                }
                return resultados;
            }
        }
    }
}

// Onde há valor que varia, colocar "?"