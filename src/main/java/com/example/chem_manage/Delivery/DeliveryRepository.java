package com.example.chem_manage.Delivery;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DeliveryRepository extends JpaRepository<Delivery, Integer> {
    @Query(value = "SELECT d.*, co.company_name, co.manage_name, co.company_type, co.rankk, co.company_address, co.company_phoneno, co.order_nos, col.order_list, col.order_status, col.order_date, col.delivered_date " +
            "FROM delivery d " +
            "INNER JOIN companyorders co ON d.company_email = co.company_email " +
            "INNER JOIN companyorderlist col ON d.company_email = col.company_email ORDER BY col.order_date", nativeQuery = true)
    List<Object[]> findAllDeliveryWithCompanyOrdersAndOrderList();

}
