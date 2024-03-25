package com.example.chem_manage.CompanyOrders;

import jakarta.persistence.*;

@Entity
@Table(name="companyorders")
public class CompanyOrders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    public String getManage_name() {
        return manage_name;
    }

    public void setManage_name(String manage_name) {
        this.manage_name = manage_name;
    }

    private String manage_name;
    private String company_name;
    private String company_email;
    private String company_type;

    public String getRankk() {
        return rankk;
    }

    public void setRankk(String rankk) {
        this.rankk = rankk;
    }

    private String rankk;

    public CompanyOrders() {
    }

    public CompanyOrders(Integer id, String company_name, String manage_name, String company_email, String rankk, String company_type, String company_address, Long company_phoneno, Integer order_nos) {
        this.id = id;
        this.manage_name = manage_name;
        this.company_name = company_name;
        this.company_email = company_email;
        this.company_type = company_type;
        this.company_address = company_address;
        this.company_phoneno = company_phoneno;
        this.order_nos = order_nos;
        this.rankk = rankk;
    }

    private String company_address;
    private Long company_phoneno;
    private Integer order_nos;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCompany_name() {
        return company_name;
    }

    public void setCompany_name(String company_name) {
        this.company_name = company_name;
    }

    public String getCompany_email() {
        return company_email;
    }

    public void setCompany_email(String company_email) {
        this.company_email = company_email;
    }

    public String getCompany_type() {
        return company_type;
    }

    public void setCompany_type(String company_type) {
        this.company_type = company_type;
    }

    public String getCompany_address() {
        return company_address;
    }

    public void setCompany_address(String company_address) {
        this.company_address = company_address;
    }

    public Long getCompany_phoneno() {
        return company_phoneno;
    }

    public void setCompany_phoneno(Long company_phoneno) {
        this.company_phoneno = company_phoneno;
    }

    public Integer getOrder_nos() {
        return order_nos;
    }

    public void setOrder_nos(Integer order_nos) {
        this.order_nos = order_nos;
    }


//    @Column(length = 1500)
//    private String order_list;
}
