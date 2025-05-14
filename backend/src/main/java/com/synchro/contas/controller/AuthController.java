package com.synchro.contas.controller;

import com.synchro.contas.dto.LoginRequest;
import com.synchro.contas.model.Usuario;
import com.synchro.contas.repository.UsuarioRepository;
import com.synchro.contas.security.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@Tag(name = "Autenticação", description = "Login de usuários")
public class AuthController {

    private final UsuarioRepository repository;
    private final JwtUtil jwtUtil;

    public AuthController(UsuarioRepository repository, JwtUtil jwtUtil) {
        this.repository = repository;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    @Operation(summary = "Login de usuário")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        Optional<Usuario> usuarioOpt = repository.findAll().stream()
                .filter(u -> u.getEmail().equals(request.getEmail()) && u.getSenha().equals(request.getSenha()))
                .findFirst();

        if (usuarioOpt.isPresent()) {
            String token = jwtUtil.gerarToken(request.getEmail());
            return ResponseEntity.ok(token);
        }

        return ResponseEntity.status(401).body("Credenciais inválidas");
    }
}
