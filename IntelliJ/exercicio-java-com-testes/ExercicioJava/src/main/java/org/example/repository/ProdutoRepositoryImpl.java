package org.example.repository;

import org.example.model.Produto;
import org.example.util.ConexaoBanco;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ProdutoRepositoryImpl implements ProdutoRepository {

    @Override
    public Produto save(Produto produto) throws SQLException {
        if (produto.getPreco() < 0) {
            throw new IllegalArgumentException();
        }
        String command = """
                INSERT INTO produto
                (nome, preco, quantidade, categoria)
                VALUES
                (?,?,?,?)
                """;
        try (Connection conn = ConexaoBanco.conectar();
             PreparedStatement stmt = conn.prepareStatement(command,
                     PreparedStatement.RETURN_GENERATED_KEYS)) {
            stmt.setString(1, produto.getNome());
            stmt.setDouble(2, produto.getPreco());
            stmt.setInt(3, produto.getQuantidade());
            stmt.setString(4, produto.getCategoria());

            stmt.executeUpdate();

            ResultSet rs = stmt.getGeneratedKeys();
            if (rs.next()) {
                produto.setId(rs.getInt(1));
                return produto;
            }
        }
        return null;
    }

    @Override
    public List<Produto> findAll() throws SQLException {
        String query = """
                SELECT id, nome, preco, quantidade, categoria
                FROM produto
                """;
        List<Produto> produtos = new ArrayList<>();
        try (Connection conn = ConexaoBanco.conectar();
             PreparedStatement stmt = conn.prepareStatement(query)) {
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                int id = rs.getInt("id");
                String nome = rs.getString("nome");
                Double preco = rs.getDouble("preco");
                int quantidade = rs.getInt("quantidade");
                String categoria = rs.getString("categoria");

                var produto = new Produto(id, nome, preco, quantidade, categoria);
                produtos.add(produto);
            }
        }
        return produtos;
    }

    @Override
    public Produto findById(int id) throws SQLException {
        String query = "SELECT id, nome, preco, quantidade, categoria " +
                       "FROM produto " +
                       "WHERE id = ?";

        try (Connection conn = ConexaoBanco.conectar();
             PreparedStatement stmt = conn.prepareStatement(query)) {
            stmt.setInt(1, id);

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return new Produto(
                        rs.getInt("id"),
                        rs.getString("nome"),
                        rs.getDouble("preco"),
                        rs.getInt("quantidade"),
                        rs.getString("categoria")
                    );
                }
            }
        }
        return null;
    }

    @Override
    public Produto update(Produto produto) throws SQLException {
        String command = """
                UPDATE produto
                SET nome = ?, 
                    preco = ?, 
                    quantidade = ?,
                    categoria = ?
                WHERE id = ?
                """;

        try (Connection conn = ConexaoBanco.conectar();
             PreparedStatement stmt = conn.prepareStatement(command)) {
            stmt.setString(1, produto.getNome());
            stmt.setDouble(2, produto.getPreco());
            stmt.setInt(3, produto.getQuantidade());
            stmt.setString(4, produto.getCategoria());
            stmt.setInt(5, produto.getId());
            stmt.executeUpdate();
        }
        return produto;
    }

    @Override
    public void deleteById(int id) throws SQLException {
        String command = """
                DELETE FROM produto 
                WHERE id = ?
                """;
        try (Connection conn = ConexaoBanco.conectar();
             PreparedStatement stmt = conn.prepareStatement(command)) {
            stmt.setInt(1, id);
            stmt.executeUpdate();
        }
    }
}
