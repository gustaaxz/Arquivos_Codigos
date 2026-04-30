package senai.service.equipamento;

import senai.database.Conexao;
import senai.model.Equipamento;
import senai.repository.equipamento.EquipamentoRepositoryImpl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class EquipamentoServiceImpl implements EquipamentoService {
    private EquipamentoRepositoryImpl repository = new EquipamentoRepositoryImpl();

    @Override
    public Equipamento criarEquipamento(Equipamento equipamento) throws SQLException {
        if (!fornecedorExiste(equipamento.getFornecedorId())) {
            throw new RuntimeException("Fornecedor inválido ou inexistente!");
        }

        return repository.criarEquipamento(equipamento);
    }

    @Override
    public Equipamento buscarPorId(int id) throws SQLException {
        return repository.buscarEquipamentoPorId(id);
    }

    @Override
    public List<Equipamento> buscarPorFornecedorId(int fornecedorId) throws SQLException {
        return repository.listarEquipamentosPorFornecedor(fornecedorId);
    }

    @Override
    public void atualizarEquipamento(Equipamento equipamento) throws SQLException {
        if (!equipamentoExiste(equipamento.getId())) {
            throw new RuntimeException("Equipamento não encontrado para atualização!");
        }

        if (!fornecedorExiste(equipamento.getFornecedorId())) {
            throw new RuntimeException("Fornecedor inválido ou inexistente!");
        }

        repository.atualizarEquipamento(equipamento);
    }

    @Override
    public void deletarEquipamento(int id) throws SQLException {
        repository.deletarEquipamento(id);
    }

    private boolean fornecedorExiste(int fornecedorId) throws SQLException {
        String query = "SELECT id FROM Fornecedor WHERE id = ?";

        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(query)) {
            stmt.setInt(1, fornecedorId);

            try (ResultSet rs = stmt.executeQuery()) {
                return rs.next();
            }
        }
    }

    private boolean equipamentoExiste(int id) throws SQLException {
        String query = "SELECT id FROM Equipamento WHERE id = ?";

        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(query)) {
            stmt.setInt(1, id);

            try (ResultSet rs = stmt.executeQuery()) {
                return rs.next();
            }
        }
    }
}
