package com.example.chem_manage.RawMaterials;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RawMaterialsRepository extends JpaRepository<RawMaterials, Integer> {
    List<RawMaterials> findByTrack(String pending);
}
