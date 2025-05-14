package com.synchro.contas.controller;

import com.synchro.contas.model.ContaContabil;
import com.synchro.contas.service.ContaContabilService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contas")
@Tag(name = "Contas Contábeis", description = "Operações de CRUD para contas contábeis")
public class ContaContabilController {

    private final ContaContabilService service;

    public ContaContabilController(ContaContabilService service) {
        this.service = service;
    }

    @GetMapping
    @Operation(summary = "Listar todas as contas")
    public List<ContaContabil> listar() {
        return service.listarTodas();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar conta por ID")
    public ResponseEntity<ContaContabil> buscar(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Criar nova conta")
    public ContaContabil criar(@RequestBody ContaContabil conta) {
        return service.salvar(conta);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar conta existente")
    public ResponseEntity<ContaContabil> atualizar(@PathVariable Long id, @RequestBody ContaContabil novaConta) {
        return service.buscarPorId(id)
                .map(conta -> {
                    conta.setNome(novaConta.getNome());
                    conta.setValor(novaConta.getValor());
                    conta.setNatureza(novaConta.getNatureza());
                    conta.setDescricao(novaConta.getDescricao());
                    return ResponseEntity.ok(service.salvar(conta));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Excluir conta")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (service.buscarPorId(id).isPresent()) {
            service.excluir(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}