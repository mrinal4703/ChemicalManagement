package com.example.chem_manage.DeliveryList;

import jakarta.persistence.*;

@Entity
@Table(name = "deliverylist")
public class DeliveryList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    public Integer getId() {
        return id;
    }

    public DeliveryList() {
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCompany_email() {
        return company_email;
    }

    public void setCompany_email(String company_email) {
        this.company_email = company_email;
    }

    public String getOrder_list() {
        return order_list;
    }

    public void setOrder_list(String order_list) {
        this.order_list = order_list;
    }

    private String company_email;
    @Column(length = 1500)
    private String order_list;

    public DeliveryList(Integer id, String company_email, String order_list) {
        this.id = id;
        this.company_email = company_email;
        this.order_list = order_list;
    }
}
