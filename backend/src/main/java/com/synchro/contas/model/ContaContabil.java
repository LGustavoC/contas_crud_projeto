package com.synchro.contas.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "conta_contabil")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContaContabil {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private Double valor;

    @Column(nullable = false, length = 1)
    private String natureza;

    private String descricao;
}