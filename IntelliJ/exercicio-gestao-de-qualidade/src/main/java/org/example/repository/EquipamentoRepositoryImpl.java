package org.example.repository;

import org.example.database.Conexao;
import org.example.model.Equipamento;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class EquipamentoRepositoryImpl {
    public Equipamento criar(Equipamento equipamento) throws SQLException {
        String command = """
                INSERT INTO Equipamento
                (nome, numeroDeSerie, areaSetor, statusOperacional)
                VALUES
                (?,?,?,?)
                """;
        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(command,
                     PreparedStatement.RETURN_GENERATED_KEYS)){
            stmt.setString(1, equipamento.getNome());
            stmt.setString(2, equipamento.getNumeroDeSerie());
            stmt.setString(3, equipamento.getAreaSetor());
            stmt.setString(4, "OPERACIONAL");
            stmt.executeUpdate();

            ResultSet rs = stmt.getGeneratedKeys();

            if(rs.next()){
                equipamento.setId(rs.getLong(1));
                return equipamento;
            }
        }
        return equipamento;
    }

    public Equipamento buscarEquipamentoPorId(long id) throws SQLException {
        String query = """
                SELECT id, nome, numeroDeSerie, areaSetor, statusOperacional
                FROM Equipamento
                WHERE id = ?
                """;

        try(Connection conn = Conexao.conectar();
            PreparedStatement stmt = conn.prepareStatement(query)){
            stmt.setLong(1, id);
            ResultSet rs = stmt.executeQuery();
            if(rs.next()){
                String nome = rs.getString("nome");
                String numeroDeSerie = rs.getString("numeroDeSerie");
                String areaSetor = rs.getString("areaSetor");
                String statusOperacional = rs.getString("statusOperacional");

                return new Equipamento(id, nome, numeroDeSerie, areaSetor, statusOperacional);

            } else {
                throw new IllegalArgumentException("Equipamento não encontrado!");
            }
        }
    }
}