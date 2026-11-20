package com.mesaya.repository;

import com.mesaya.entity.Mesa;
import com.mesaya.entity.Mesa.EstadoMesa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MesaRepository extends JpaRepository<Mesa, Long> {
	List<Mesa> findByEstado(EstadoMesa estado);
	long countByEstado(EstadoMesa estado);
	boolean existsByNumero(Integer numero);
	boolean existsByNumeroAndIdMesaNot(Integer numero, Long idMesa);
}
