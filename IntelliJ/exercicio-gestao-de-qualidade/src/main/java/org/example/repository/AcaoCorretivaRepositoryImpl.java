package org.example.repository;

import org.example.database.Conexao;
import org.example.model.AcaoCorretiva;

import java.sql.*;


public class AcaoCorretivaRepositoryImpl {
    public AcaoCorretiva registrarConclusaoDeAcao(AcaoCorretiva acao) throws SQLException {
        String save = """
                INSERT INTO AcaoCorretiva 
                (falhaId, dataHoraInicio, dataHoraFim, responsavel, descricaoAcao) 
                VALUES 
                (?, ?, ?, ?, ?)
                """;

        String updateFalha = """
                UPDATE Falha 
                SET status = 'RESOLVIDA' 
                WHERE id = ?
                """;

        String selectFalha = """
                SELECT criticidade, equipamentoId 
                FROM Falha 
                WHERE id = ?
                """;

        String updateEquipamento = """
                UPDATE Equipamento 
                SET statusOperacional = 'OPERACIONAL' 
                WHERE id = ?
                """;

        try (Connection conn = Conexao.conectar()) {
            try (PreparedStatement stmtAcao = conn.prepareStatement(save)) {
                stmtAcao.setLong(1, acao.getFalhaId());
                stmtAcao.setObject(2, acao.getDataHoraInicio());
                stmtAcao.setObject(3, acao.getDataHoraFim());
                stmtAcao.setString(4, acao.getResponsavel());
                stmtAcao.setString(5, acao.getDescricaoArea());
                stmtAcao.executeUpdate();
            }

            String criticidade = "";
            long equipamentoId = -1;

            try (PreparedStatement stmtBusca = conn.prepareStatement(selectFalha)) {
                stmtBusca.setLong(1, acao.getFalhaId());
                try (ResultSet rs = stmtBusca.executeQuery()) {
                    if (rs.next()) {
                        criticidade = rs.getString("criticidade");
                        equipamentoId = rs.getLong("equipamentoId");
                    } else {
                        throw new RuntimeException("Equipamento não encontrado!");
                    }
                }
            }

            try (PreparedStatement stmtFalha = conn.prepareStatement(updateFalha)) {
                stmtFalha.setLong(1, acao.getFalhaId());
                stmtFalha.executeUpdate();
            }

            if ("CRITICA".equalsIgnoreCase(criticidade)) {
                try (PreparedStatement stmtEq = conn.prepareStatement(updateEquipamento)) {
                    stmtEq.setLong(1, equipamentoId);
                    stmtEq.executeUpdate();
                }
            }
        }
        return acao;
    }
}
