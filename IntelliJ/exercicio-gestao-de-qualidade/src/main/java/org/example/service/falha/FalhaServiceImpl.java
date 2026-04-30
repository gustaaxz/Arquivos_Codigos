package org.example.service.falha;

import org.example.model.Equipamento;
import org.example.model.Falha;
import org.example.repository.EquipamentoRepositoryImpl;
import org.example.repository.FalhaRepositoryImpl;

import java.sql.SQLException;
import java.util.List;

public class FalhaServiceImpl implements FalhaService{

    private final FalhaRepositoryImpl falhaRepository = new FalhaRepositoryImpl();
    private final EquipamentoRepositoryImpl equipamentoRepository = new EquipamentoRepositoryImpl();

    public Falha registrarNovaFalha(Falha falha) throws SQLException {
        equipamentoRepository.buscarEquipamentoPorId(falha.getEquipamentoId());
        return falhaRepository.registrarNovaFalha(falha);
    }

    @Override
    public List<Falha> buscarFalhasCriticasAbertas() throws SQLException {
        return falhaRepository.listarTodasFalhascriticas();
    }
}
