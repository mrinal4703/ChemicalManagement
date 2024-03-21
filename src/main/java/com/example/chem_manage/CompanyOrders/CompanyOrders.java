package com.example.chem_manage.CompanyOrders;

import jakarta.persistence.*;

@Entity
@Table(name="companyorders")
public class CompanyOrders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String company_name;
//    private String order_list;
//    @OneToMany
//    @JoinTable(
//            name = "companyorders_chemicalreport",
//            joinColumns = @JoinColumn(name = "companyorders_id"),
//            inverseJoinColumns = @JoinColumn(name = "chemicalreport_id")
//    )
//    private List<ChemicalReport> chemicals;
////    private
}
