package org.example.service.acaocorretiva;

import org.example.model.AcaoCorretiva;
import org.example.repository.AcaoCorretivaRepositoryImpl;

import java.sql.SQLException;

public class AcaoCorretivaServiceImpl implements AcaoCorretivaService{

    private final AcaoCorretivaRepositoryImpl acaoCorretiva = new AcaoCorretivaRepositoryImpl();

    @Override
    public AcaoCorretiva registrarConclusaoDeAcao(AcaoCorretiva acao) throws SQLException {
        return acaoCorretiva.registrarConclusaoDeAcao(acao);
    }
}
