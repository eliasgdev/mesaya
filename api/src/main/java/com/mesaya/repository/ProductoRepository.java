package com.mesaya.repository;

import com.mesaya.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
	List<Producto> findByCategoria(String categoria);
	List<Producto> findByDisponible(Boolean disponible);
	List<Producto> findByCategoriaAndDisponible(String categoria, Boolean disponible);
	long countByDisponible(Boolean disponible);
}
