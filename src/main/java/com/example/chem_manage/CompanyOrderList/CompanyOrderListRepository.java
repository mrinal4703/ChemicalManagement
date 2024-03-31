package com.example.chem_manage.CompanyOrderList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.Optional;

public interface CompanyOrderListRepository extends JpaRepository<CompanyOrderList, Integer> {
    @Query("SELECT c FROM CompanyOrderList c WHERE c.company_email = ?1")
    Optional<CompanyOrderList> findByCompanyEmail(String companyEmail);
}
