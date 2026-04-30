package org.example.service.equipamento;

import org.example.model.Equipamento;
import org.example.repository.EquipamentoRepositoryImpl;

import java.sql.SQLException;

public class EquipamentoServiceImpl implements EquipamentoService{

    private final EquipamentoRepositoryImpl equipamentoRepository = new EquipamentoRepositoryImpl();

    @Override
    public Equipamento criarEquipamento(Equipamento equipamento) throws SQLException {
        return equipamentoRepository.criar(equipamento);
    }

    @Override
    public Equipamento buscarEquipamentoPorId(Long id) throws SQLException {
        return equipamentoRepository.buscarEquipamentoPorId(id);
    }
}
