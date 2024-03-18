package com.example.chem_manage.RawMaterialsProvider;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RawMaterialsProviderRepository extends JpaRepository<RawMaterialsProvider, Integer> {
    @Query("SELECT DISTINCT providerComp FROM RawMaterialsProvider ")
    List<String> findAllbyProviderCompname();
}
