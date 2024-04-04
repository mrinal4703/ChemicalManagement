package com.example.chem_manage.CompanyOrderList;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name="companyorderlist")
public class CompanyOrderList {
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

    public String getOrder_list() {
        return order_list;
    }

    public void setOrder_list(String order_list) {
        this.order_list = order_list;
    }

    public String getOrder_status() {
        return order_status;
    }

    public void setOrder_status(String order_status) {
        this.order_status = order_status;
    }

    public Date getOrder_date() {
        return order_date;
    }

    public void setOrder_date(Date order_date) {
        this.order_date = order_date;
    }

    public Date getDelivered_date() {
        return delivered_date;
    }

    public void setDelivered_date(Date delivered_date) {
        this.delivered_date = delivered_date;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String company_email;

    public CompanyOrderList(Integer id, String company_email, String order_list, String order_status, Date order_date, Date delivered_date) {
        this.id = id;
        this.company_email = company_email;
        this.order_list = order_list;
        this.order_status = order_status;
        this.order_date = order_date;
        this.delivered_date = delivered_date;
    }

    public CompanyOrderList() {
    }

    @Column(length = 1500)
    private String order_list;
    private String order_status;
    private Date  order_date;
    private Date delivered_date;
}
