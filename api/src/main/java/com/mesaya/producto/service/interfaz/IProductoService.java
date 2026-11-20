package com.mesaya.producto.service.interfaz;

import com.mesaya.producto.dto.ProductoRequestDTO;
import com.mesaya.producto.dto.ProductoResponseDTO;
import java.util.List;

public interface IProductoService {
	List<ProductoResponseDTO> listar(String categoria, Boolean disponible);
	ProductoResponseDTO obtenerPorId(Long id);
	ProductoResponseDTO crear(ProductoRequestDTO dto);
	ProductoResponseDTO actualizar(Long id, ProductoRequestDTO dto);
	void eliminar(Long id);
}
