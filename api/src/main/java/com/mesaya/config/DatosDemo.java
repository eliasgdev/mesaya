package com.mesaya.config;

import com.mesaya.entity.*;
import com.mesaya.entity.Mesa.EstadoMesa;
import com.mesaya.entity.Pedido.EstadoPedido;
import com.mesaya.repository.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Carga un restaurante de ejemplo la primera vez que arranca la aplicación
 * (base vacía), para que la demo se pueda probar sin configurar nada.
 * Usuario: demo@mesaya.co  /  Contraseña: MesaYa2026
 */
@Component
@RequiredArgsConstructor
@ConditionalOnProperty(name = "mesaya.demo.datos", havingValue = "true")
public class DatosDemo implements CommandLineRunner {

	public static final String EMAIL_DEMO = "demo@mesaya.co";
	public static final String CLAVE_DEMO = "MesaYa2026";

	private static final Logger log = LoggerFactory.getLogger(DatosDemo.class);

	private final UsuarioRepository usuarioRepository;
	private final MesaRepository mesaRepository;
	private final ProductoRepository productoRepository;
	private final ClienteRepository clienteRepository;
	private final PedidoRepository pedidoRepository;
	private final PasswordEncoder passwordEncoder;

	@Override
	@Transactional
	public void run(String... args) {
		if (usuarioRepository.count() > 0) return;

		Usuario demo = new Usuario();
		demo.setNombre("Usuario Demo");
		demo.setEmail(EMAIL_DEMO);
		demo.setPasswordHash(passwordEncoder.encode(CLAVE_DEMO));
		demo.setActivo(true);
		usuarioRepository.save(demo);

		int[] capacidades = {2, 4, 4, 6, 2, 4, 8, 4};
		List<Mesa> mesas = new java.util.ArrayList<>();
		for (int i = 0; i < capacidades.length; i++) {
			Mesa m = new Mesa();
			m.setNumero(i + 1);
			m.setCapacidad(capacidades[i]);
			m.setEstado(i + 1 == 7 ? EstadoMesa.RESERVADA : EstadoMesa.DISPONIBLE);
			mesas.add(mesaRepository.save(m));
		}

		List<Producto> menu = List.of(
				producto("Bandeja paisa", "Fríjoles, arroz, chicharrón, carne molida, huevo, maduro y arepa", 32000, "Platos fuertes", 20),
				producto("Ajiaco santafereño", "Con pollo, mazorca, crema y alcaparras", 28000, "Platos fuertes", 15),
				producto("Hamburguesa de la casa", "Carne de res, queso, tocineta y papas", 24000, "Comida rápida", 25),
				producto("Arepa con queso", "Arepa asada con queso campesino", 9000, "Entradas", 40),
				producto("Empanadas (x3)", "Empanadas de carne con ají", 8000, "Entradas", 30),
				producto("Limonada de coco", "Natural, 400 ml", 9000, "Bebidas", 50),
				producto("Jugo de lulo", "En agua o en leche, 400 ml", 7000, "Bebidas", 50),
				producto("Gaseosa", "350 ml", 5000, "Bebidas", 60),
				producto("Postre de natas", "Receta tradicional", 8500, "Postres", 12),
				producto("Torta tres leches", "Porción individual", 9000, "Postres", 10));
		productoRepository.saveAll(menu);

		Cliente ana = cliente("Ana Rodríguez", "3001234567", "ana.rodriguez@example.com");
		Cliente carlos = cliente("Carlos Martínez", "3109876543", "carlos.martinez@example.com");
		clienteRepository.saveAll(List.of(ana, carlos, cliente("Laura Gómez", "3205550123", "laura.gomez@example.com")));

		pedido(demo, mesas.get(1), ana, EstadoPedido.EN_PREPARACION,
				"Sin cebolla", List.of(menu.get(0), menu.get(5)), List.of(2, 2));
		pedido(demo, mesas.get(4), carlos, EstadoPedido.CREADA,
				null, List.of(menu.get(2), menu.get(7)), List.of(1, 1));

		log.info("Datos de ejemplo cargados. Usuario demo: {}", EMAIL_DEMO);
	}

	private Producto producto(String nombre, String descripcion, double precio, String categoria, int stock) {
		Producto p = new Producto();
		p.setNombre(nombre);
		p.setDescripcion(descripcion);
		p.setPrecio(precio);
		p.setCategoria(categoria);
		p.setDisponible(true);
		p.setStock(stock);
		return p;
	}

	private Cliente cliente(String nombre, String telefono, String email) {
		Cliente c = new Cliente();
		c.setNombre(nombre);
		c.setTelefono(telefono);
		c.setEmail(email);
		return c;
	}

	private void pedido(Usuario usuario, Mesa mesa, Cliente cliente, EstadoPedido estado,
						String observaciones, List<Producto> productos, List<Integer> cantidades) {
		Pedido p = new Pedido();
		p.setUsuario(usuario);
		p.setMesa(mesa);
		p.setCliente(cliente);
		p.setEstado(estado);
		p.setObservaciones(observaciones);
		for (int i = 0; i < productos.size(); i++) {
			DetallePedido d = new DetallePedido();
			d.setPedido(p);
			d.setProducto(productos.get(i));
			d.setCantidad(cantidades.get(i));
			d.setPrecioUnitario(productos.get(i).getPrecio());
			d.setSubtotal(productos.get(i).getPrecio() * cantidades.get(i));
			p.getDetalles().add(d);
		}
		pedidoRepository.save(p);
		mesa.setEstado(EstadoMesa.OCUPADA);
		mesaRepository.save(mesa);
	}
}
