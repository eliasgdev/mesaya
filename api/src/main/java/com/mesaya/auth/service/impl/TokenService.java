package com.mesaya.auth.service.impl;

import com.mesaya.entity.Usuario;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;

/** Emite el JWT que el frontend envía en cada petición. */
@Service
public class TokenService {

	private final JwtEncoder encoder;
	private final Duration duracion;

	public TokenService(JwtEncoder encoder,
						@Value("${mesaya.jwt.horas:8}") long horas) {
		this.encoder = encoder;
		this.duracion = Duration.ofHours(horas);
	}

	public String generar(Usuario usuario) {
		Instant ahora = Instant.now();
		JwtClaimsSet claims = JwtClaimsSet.builder()
				.issuer("mesaya")
				.issuedAt(ahora)
				.expiresAt(ahora.plus(duracion))
				.subject(String.valueOf(usuario.getIdUsuario()))
				.claim("nombre", usuario.getNombre())
				.claim("email", usuario.getEmail())
				.build();
		JwsHeader header = JwsHeader.with(MacAlgorithm.HS256).build();
		return encoder.encode(JwtEncoderParameters.from(header, claims)).getTokenValue();
	}

	public long segundosDeVigencia() {
		return duracion.toSeconds();
	}
}
