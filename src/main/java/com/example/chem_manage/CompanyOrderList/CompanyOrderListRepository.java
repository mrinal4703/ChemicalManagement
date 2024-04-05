package com.example.chem_manage.CompanyOrderList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CompanyOrderListRepository extends JpaRepository<CompanyOrderList, Integer> {
    @Query("SELECT c FROM CompanyOrderList c WHERE c.company_email = ?1")
    Optional<CompanyOrderList> findByCompanyEmail(String companyEmail);

    @Query(value = "SELECT order_status FROM companyorderlist", nativeQuery = true)
    List<String> getAllOrderStatus();

//    @Query(value = "SELECT order_status FROM companyorderlist WHERE order_status = :status", nativeQuery = true)
//    List<String> getAllOrderStatus(@Param("status") String status);
}
