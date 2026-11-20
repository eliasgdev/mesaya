package com.mesaya.producto.service.impl;

import com.mesaya.entity.Producto;
import com.mesaya.exception.BusinessException;
import com.mesaya.exception.ResourceNotFoundException;
import com.mesaya.producto.dto.ProductoRequestDTO;
import com.mesaya.producto.dto.ProductoResponseDTO;
import com.mesaya.producto.service.interfaz.IProductoService;
import com.mesaya.repository.DetallePedidoRepository;
import com.mesaya.repository.ProductoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductoServiceImpl implements IProductoService {

	private final ProductoRepository productoRepository;
	private final DetallePedidoRepository detallePedidoRepository;

	@Override
	@Transactional(readOnly = true)
	public List<ProductoResponseDTO> listar(String categoria, Boolean disponible) {
		List<Producto> lista;
		if (categoria != null && disponible != null)
			lista = productoRepository.findByCategoriaAndDisponible(categoria, disponible);
		else if (categoria != null)
			lista = productoRepository.findByCategoria(categoria);
		else if (disponible != null)
			lista = productoRepository.findByDisponible(disponible);
		else
			lista = productoRepository.findAll();
		return lista.stream().map(this::toDTO).collect(Collectors.toList());
	}

	@Override
	@Transactional(readOnly = true)
	public ProductoResponseDTO obtenerPorId(Long id) {
		return toDTO(buscar(id));
	}

	@Override
	@Transactional
	public ProductoResponseDTO crear(ProductoRequestDTO dto) {
		Producto p = new Producto();
		mapear(dto, p);
		return toDTO(productoRepository.save(p));
	}

	@Override
	@Transactional
	public ProductoResponseDTO actualizar(Long id, ProductoRequestDTO dto) {
		Producto p = buscar(id);
		mapear(dto, p);
		return toDTO(productoRepository.save(p));
	}

	@Override
	@Transactional
	public void eliminar(Long id) {
		buscar(id);
		if (detallePedidoRepository.existsByProductoIdProducto(id))
			throw new BusinessException("El producto aparece en pedidos registrados. Márcalo como no disponible en lugar de eliminarlo.");
		productoRepository.deleteById(id);
	}

	private Producto buscar(Long id) {
		return productoRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado: " + id));
	}

	private void mapear(ProductoRequestDTO dto, Producto p) {
		p.setNombre(dto.getNombre());
		p.setDescripcion(dto.getDescripcion());
		p.setPrecio(dto.getPrecio());
		p.setCategoria(dto.getCategoria());
		p.setImagenUrl(dto.getImagenUrl());
		p.setDisponible(dto.getDisponible());
		p.setStock(dto.getStock());
	}

	private ProductoResponseDTO toDTO(Producto p) {
		return new ProductoResponseDTO(p.getIdProducto(), p.getNombre(), p.getDescripcion(),
				p.getPrecio(), p.getCategoria(), p.getImagenUrl(), p.getDisponible(), p.getStock());
	}
}
