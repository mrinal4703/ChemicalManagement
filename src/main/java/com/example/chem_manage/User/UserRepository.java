package com.example.chem_manage.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);

    @Query(value = "SELECT * FROM user WHERE rankk NOT IN ('Raw materials provider', 'Company')", nativeQuery = true)
    List<User> findUsersByRankkNotInRawMaterialsAndCompany();

    @Query(value = "SELECT u.*, co.* FROM user u INNER JOIN companyorders co ON u.email = co.company_email", nativeQuery = true)
    List<Object[]> findAllUsersWithCompanyOrders();

    @Query(value = "SELECT u.*, ra.* FROM user u INNER JOIN rawmaterialsprovider ra ON u.email = ra.provideremail", nativeQuery = true)
    List<Object[]> findAllUsersWithRawMaterialProvider();
}
