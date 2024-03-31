package com.example.chem_manage.CompanyOrders;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

//@Repository
public interface CompanyOrdersRepository extends JpaRepository<CompanyOrders, Integer> {
//    @Query("SELECT co FROM CompanyOrders co WHERE co.company_email = :companyEmail")
//    List<CompanyOrders> findAllByCompanyEmail(String companyEmail);
@Query(value = "SELECT co.manage_name, co.company_name, co.company_type, co.rankk, co.company_address, co.company_phoneno, co.order_nos, col.* " +
        "FROM CompanyOrders co " +
        "INNER JOIN CompanyOrderList col ON co.company_email = col.company_email " +
        "WHERE co.company_email = :companyEmail", nativeQuery = true)
List<Object[]> findCompanyOrdersAndOrderListByCompanyEmail(String companyEmail);

    @Query(value = "SELECT co.manage_name, co.company_name, co.company_type, co.rankk, co.company_address, co.company_phoneno, co.order_nos, col.* " +
            "FROM CompanyOrders co " +
            "INNER JOIN CompanyOrderList col ON co.company_email = col.company_email", nativeQuery = true)
    List<Object[]> findAllCompanyOrdersAndOrderList();

    @Query(value = "SELECT COUNT(*) " +
            "FROM CompanyOrders co " +
            "INNER JOIN CompanyOrderList col ON co.company_email = col.company_email", nativeQuery = true)
    Integer findCompanyOrdersAndOrderListCount();

}
