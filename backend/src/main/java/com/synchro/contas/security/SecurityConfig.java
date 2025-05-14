// package com.synchro.contas.security;

// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {
//     // @Bean
//     // public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//     //     http.authorizeRequests(authorizeRequests -> authorizeRequests.anyRequest()
//     //     .permitAll());
//     //     return http.build();
//     // }
//     // private final JwtUtil jwtUtil;

//     // public SecurityConfig(JwtUtil jwtUtil) {
//     //     this.jwtUtil = jwtUtil;
//     // }
//     // @Bean
//     // public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//     //     http.authorizeRequests(authorizeRequests -> authorizeRequests.anyRequest()
//     //     .permitAll());
//     //     return http.build();
//     // }

//     // @Bean
//     // public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//     //     return http
//     //         .csrf(AbstractHttpConfigurer::disable)
//     //         .authorizeHttpRequests(auth -> auth
//     //             .requestMatchers(
//     //                 "/auth/login",
//     //                 "/v3/api-docs/**",
//     //                 "/swagger-ui/**",
//     //                 "/swagger-ui.html"
//     //             ).permitAll()
//     //             .anyRequest().authenticated()
//     //         )
//     //         .addFilterBefore(new JwtFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class)
//     //         .build();
//     // }
// }
