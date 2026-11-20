package com.mesaya.repository;

import com.mesaya.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
	Optional<Cliente> findByEmail(String email);
	boolean existsByEmail(String email);

	@Query("SELECT c FROM Cliente c WHERE " +
		   "LOWER(c.nombre) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
		   "LOWER(c.email)  LIKE LOWER(CONCAT('%', :q, '%'))")
	List<Cliente> buscarPorNombreOEmail(@Param("q") String query);
}
