package org.example.repository;

import org.example.model.Produto;

import java.sql.SQLException;
import java.util.List;

public class ProdutoRepositoryImpl implements ProdutoRepository{

    @Override
    public Produto save(Produto produto) throws SQLException {
        return null;
    }

    @Override
    public List<Produto> findAll() throws SQLException {
        return List.of();
    }

    @Override
    public Produto findById(int id) throws SQLException {
        return null;
    }

    @Override
    public Produto update(Produto produto) throws SQLException {
        return null;
    }

    @Override
    public void deleteById(int id) throws SQLException {

    }
}
