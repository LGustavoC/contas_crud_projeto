package com.synchro.contas.repository;

import com.synchro.contas.model.ContaContabil;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContaContabilRepository extends JpaRepository<ContaContabil, Long> {
}