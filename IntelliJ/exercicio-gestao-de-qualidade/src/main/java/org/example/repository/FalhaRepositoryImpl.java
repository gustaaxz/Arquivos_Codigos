package org.example.repository;

import org.example.database.Conexao;
import org.example.model.Falha;

import java.math.BigDecimal;
import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class FalhaRepositoryImpl {
    public FalhaRepositoryImpl() {
    }

    public Falha registrarNovaFalha(Falha falha) throws SQLException {
        String command = """
            INSERT INTO Falha
            (equipamentoId, dataHoraOcorrencia, descricao, criticidade, status, tempoParadaHoras)
            VALUES
            (?,?,?,?,?,?)
            """;

        try(Connection conn = Conexao.conectar();
            PreparedStatement stmt = conn.prepareStatement(command,
                    PreparedStatement.RETURN_GENERATED_KEYS)){

            stmt.setLong(1, falha.getEquipamentoId());
            stmt.setObject(2, falha.getDataHoraOcorrencia());
            stmt.setString(3, falha.getDescricao());
            stmt.setString(4, falha.getCriticidade());
            stmt.setString(5, "ABERTA");
            stmt.setObject(6, falha.getTempoParadaHoras());
            stmt.executeUpdate();

            falha.setStatus("ABERTA");

            if ("CRITICA".equalsIgnoreCase(falha.getCriticidade())) {
                updateSalvarEquipamento(falha.getEquipamentoId());
            }

            ResultSet rs = stmt.getGeneratedKeys();
            if(rs.next()){
                falha.setId(rs.getLong(1));
                return falha;
            }
            return null;
        }
    }

    public List<Falha> buscarFalhasCriticasAbertas() throws SQLException {
        String query = """
                SELECT equipamentoId, dataHoraOcorrencia, descricao, criticidade, status, tempoParadaHoras
                FROM Falha
                """;
        List<Falha> falhasAbertas = new ArrayList<>();
        try(Connection conn = Conexao.conectar();
            PreparedStatement stmt = conn.prepareStatement(query)){

            ResultSet rs = stmt.executeQuery();

            while(rs.next()){
                int equipamentoId = rs.getInt("equipamentoId");
                String dataHoraOcorrencia = rs.getString("dataHoraOcorrencia");
                String descricao = rs.getString("descricao");
                String criticidade = rs.getString("criticidade");
                String status = rs.getString("status");
                String tempoParadoHoras = rs.getString("tempoParadaHoras");

                var falhasCriticasAbertas = new Falha(equipamentoId, dataHoraOcorrencia, descricao, criticidade, status, tempoParadoHoras);
                falhasAbertas.add(falhasCriticasAbertas);
            }
        }
        return falhasAbertas;
    }

    public void updateSalvarEquipamento(Long id) throws SQLException {
        String command = """
                UPDATE Equipamento
                SET statusOperacional = 'EM_MANUTENCAO'
                WHERE id = ?
                """;
        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(command)){
            stmt.setLong(1, id);
            stmt.executeUpdate();
        }
    }

    public List<Falha> listarTodasFalhascriticas() throws SQLException {
        List<Falha> falhas = new ArrayList<>();
        String command = """
                SELECT id, equipamentoId, dataHoraOcorrencia, descricao, criticidade, status, tempoParadaHoras
                From Falha
                WHERE status = 'ABERTA' AND criticidade = 'CRITICA'
                """;
        try(Connection conn = Conexao.conectar();
            PreparedStatement stmt = conn.prepareStatement(command)){
                ResultSet rs = stmt.executeQuery();
                while(rs.next()) {
                    Long id = rs.getLong("id");
                    Long equipamentoId = rs.getLong("equipamentoId");
                    LocalDateTime dataHoraOcorrencia = rs.getObject("dataHoraOcorrencia", LocalDateTime.class);
                    String descricao = rs.getString("descricao");
                    String criticidade = rs.getString("criticidade");
                    String status = rs.getString("status");
                    BigDecimal tempoParadaHoras = rs.getBigDecimal("tempoParadaHoras");

                    var falha = new Falha(id, equipamentoId, dataHoraOcorrencia, descricao, criticidade, status, tempoParadaHoras);
                    falhas.add(falha);
                }
        }
        return falhas;
    }
}