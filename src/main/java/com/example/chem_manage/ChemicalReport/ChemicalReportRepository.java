package com.example.chem_manage.ChemicalReport;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChemicalReportRepository extends JpaRepository<ChemicalReport, Integer> {
    List<ChemicalReport> findByHazarduous(String hazarduous);
}
