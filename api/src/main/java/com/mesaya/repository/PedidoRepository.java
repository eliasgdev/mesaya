package com.mesaya.repository;

import com.mesaya.entity.Pedido;
import com.mesaya.entity.Pedido.EstadoPedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
	List<Pedido> findByEstado(EstadoPedido estado);
	long countByEstadoIn(List<EstadoPedido> estados);
	boolean existsByMesaIdMesaAndEstadoIn(Long idMesa, List<EstadoPedido> estados);

	@Query("SELECT COUNT(p) FROM Pedido p WHERE p.estado = 'ENTREGADA' " +
		   "AND p.fechaCreacion >= :inicio AND p.fechaCreacion < :fin")
	long countEntregadosEntre(@Param("inicio") LocalDateTime inicio,
							  @Param("fin")    LocalDateTime fin);
}
