package com.synchro.contas.service;

import com.synchro.contas.model.ContaContabil;
import com.synchro.contas.repository.ContaContabilRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContaContabilService {

    private final ContaContabilRepository repository;

    public ContaContabilService(ContaContabilRepository repository) {
        this.repository = repository;
    }

    public List<ContaContabil> listarTodas() {
        return repository.findAll();
    }

    public Optional<ContaContabil> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public ContaContabil salvar(ContaContabil conta) {
        return repository.save(conta);
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}
