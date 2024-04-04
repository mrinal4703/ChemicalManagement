package com.example.chem_manage.ChemicalReport;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ChemicalReportRepository extends JpaRepository<ChemicalReport, Integer> {
    List<ChemicalReport> findByHazarduous(String hazarduous);

    @Modifying
    @Transactional
    @Query("UPDATE ChemicalReport c SET c.quantity = :quantity WHERE c.name = :name")
    void updateQuantityByName(@Param("name") String name, @Param("quantity") Long quantity);

    Optional<ChemicalReport> findByName(String name); // Add this method

}
