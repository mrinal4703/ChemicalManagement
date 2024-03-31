package com.example.chem_manage.Delivery;

import jakarta.persistence.*;

@Entity
@Table(name="delivery")
public class Delivery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    public Delivery() {
    }

    public Integer getId() {
        return id;
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

    private String company_email;

    public Delivery(Integer id, String company_email) {
        this.id = id;
        this.company_email = company_email;
    }

}
