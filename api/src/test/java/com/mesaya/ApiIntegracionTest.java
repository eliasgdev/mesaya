package com.mesaya;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mesaya.config.DatosDemo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class ApiIntegracionTest {

	@Autowired MockMvc mvc;
	@Autowired ObjectMapper json;

	private String token;

	@BeforeEach
	void iniciarSesion() throws Exception {
		token = login(DatosDemo.EMAIL_DEMO, DatosDemo.CLAVE_DEMO);
	}

	@Test
	void sinTokenLaApiResponde401() throws Exception {
		mvc.perform(get("/api/productos")).andExpect(status().isUnauthorized());
		mvc.perform(get("/api/productos").header("Authorization", "Bearer token-falso"))
				.andExpect(status().isUnauthorized());
	}

	@Test
	void loginFallidoNoRevelaSiElCorreoExiste() throws Exception {
		String mensajeClaveMala = mvc.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON)
						.content("{\"email\":\"" + DatosDemo.EMAIL_DEMO + "\",\"password\":\"incorrecta\"}"))
				.andExpect(status().isUnauthorized()).andReturn().getResponse().getContentAsString();
		String mensajeCorreoInexistente = mvc.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON)
						.content("{\"email\":\"nadie@example.com\",\"password\":\"incorrecta\"}"))
				.andExpect(status().isUnauthorized()).andReturn().getResponse().getContentAsString();
		assert json.readTree(mensajeClaveMala).get("mensaje").equals(json.readTree(mensajeCorreoInexistente).get("mensaje"));
	}

	@Test
	void registroDevuelveTokenYPerfilFunciona() throws Exception {
		String respuesta = mvc.perform(post("/api/auth/registro").contentType(MediaType.APPLICATION_JSON)
						.content("{\"nombre\":\"Nueva Persona\",\"email\":\"Nueva@Example.com\",\"password\":\"clave-segura\"}"))
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.usuario.email").value("nueva@example.com"))
				.andReturn().getResponse().getContentAsString();
		String nuevoToken = json.readTree(respuesta).get("token").asText();
		mvc.perform(get("/api/auth/perfil").header("Authorization", "Bearer " + nuevoToken))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.nombre").value("Nueva Persona"));
	}

	@Test
	void flujoCompletoDeUnPedido() throws Exception {
		// Mesa 1 está libre en los datos de ejemplo
		long idMesa = buscarIdMesa(1);
		long idProducto = json.readTree(autenticado(get("/api/productos"))).get(0).get("idProducto").asLong();

		String creado = mvc.perform(post("/api/pedidos").header("Authorization", "Bearer " + token)
						.contentType(MediaType.APPLICATION_JSON)
						.content("{\"idMesa\":" + idMesa + ",\"items\":[{\"idProducto\":" + idProducto + ",\"cantidad\":2}]}"))
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.estado").value("CREADA"))
				.andExpect(jsonPath("$.nombreUsuario").value("Usuario Demo"))
				.andReturn().getResponse().getContentAsString();
		long idPedido = json.readTree(creado).get("idPedido").asLong();

		// La mesa queda ocupada y no admite otro pedido
		mvc.perform(get("/api/mesas/" + idMesa).header("Authorization", "Bearer " + token))
				.andExpect(jsonPath("$.estado").value("OCUPADA"));
		mvc.perform(post("/api/pedidos").header("Authorization", "Bearer " + token)
						.contentType(MediaType.APPLICATION_JSON)
						.content("{\"idMesa\":" + idMesa + ",\"items\":[{\"idProducto\":" + idProducto + ",\"cantidad\":1}]}"))
				.andExpect(status().isBadRequest());

		// Avanza hasta entregado y la mesa se libera
		mvc.perform(patch("/api/pedidos/" + idPedido + "/estado").header("Authorization", "Bearer " + token))
				.andExpect(jsonPath("$.estado").value("EN_PREPARACION"));
		mvc.perform(patch("/api/pedidos/" + idPedido + "/estado").header("Authorization", "Bearer " + token))
				.andExpect(jsonPath("$.estado").value("ENTREGADA"));
		mvc.perform(get("/api/mesas/" + idMesa).header("Authorization", "Bearer " + token))
				.andExpect(jsonPath("$.estado").value("DISPONIBLE"));

		// Un pedido entregado ya no recibe productos
		mvc.perform(post("/api/pedidos/" + idPedido + "/detalles").header("Authorization", "Bearer " + token)
						.contentType(MediaType.APPLICATION_JSON)
						.content("{\"idProducto\":" + idProducto + ",\"cantidad\":1}"))
				.andExpect(status().isBadRequest());

		// Y el producto ya usado no se puede borrar
		mvc.perform(delete("/api/productos/" + idProducto).header("Authorization", "Bearer " + token))
				.andExpect(status().isBadRequest());
	}

	@Test
	void noSePuedeBorrarUnItemDeOtroPedido() throws Exception {
		JsonNode pedidos = json.readTree(autenticado(get("/api/pedidos")));
		long idPedidoA = pedidos.get(0).get("idPedido").asLong();
		long idDetalleDeB = pedidos.get(1).get("detalles").get(0).get("idDetalle").asLong();
		mvc.perform(delete("/api/pedidos/" + idPedidoA + "/detalles/" + idDetalleDeB)
						.header("Authorization", "Bearer " + token))
				.andExpect(status().isNotFound());
	}

	@Test
	void dashboardResumeLosDatosDeEjemplo() throws Exception {
		mvc.perform(get("/api/dashboard/resumen").header("Authorization", "Bearer " + token))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.productosActivos").value(10))
				.andExpect(jsonPath("$.pedidosActivos").value(2));
	}

	private String login(String email, String clave) throws Exception {
		String r = mvc.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON)
						.content("{\"email\":\"" + email + "\",\"password\":\"" + clave + "\"}"))
				.andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
		return json.readTree(r).get("token").asText();
	}

	private String autenticado(org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder req) throws Exception {
		return mvc.perform(req.header("Authorization", "Bearer " + token))
				.andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
	}

	private long buscarIdMesa(int numero) throws Exception {
		for (JsonNode m : json.readTree(autenticado(get("/api/mesas"))))
			if (m.get("numero").asInt() == numero) return m.get("idMesa").asLong();
		throw new IllegalStateException("No existe la mesa " + numero);
	}
}
