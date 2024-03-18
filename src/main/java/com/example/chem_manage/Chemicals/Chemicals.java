package com.example.chem_manage.Chemicals;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name="chemicals")
public class Chemicals {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private Long chemquantity;
    private String quantity_type;

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    private Long quantity;
    private String nature;

    public Chemicals() {
    }

    public Chemicals(Integer id, String name, Long chemquantity, Long quantity, String assess, String quantity_type, String nature, Date production_date, Date expiry_date, Float pH, String hazarduous) {
        this.id = id;
        this.name = name;
        this.chemquantity = chemquantity;
        this.quantity_type = quantity_type;
        this.nature = nature;
        this.production_date = production_date;
        this.expiry_date = expiry_date;
        this.pH = pH;
        this.quantity = quantity;
        this.hazarduous = hazarduous;
        this.assess = assess;
//        this.rawmaterial_name = rawmaterial_name;
    }

    private Date production_date;
    private Date expiry_date;
    private Float pH;
    private String hazarduous;

//    public String getRawmaterial_name() {
//        return rawmaterial_name;
//    }
//
//    public void setRawmaterial_name(String rawmaterial_name) {
//        this.rawmaterial_name = rawmaterial_name;
//    }
//
//    private String rawmaterial_name;

    public String getAssess() {
        return assess;
    }

    public void setAssess(String assess) {
        this.assess = assess;
    }

    public String assess;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getChemquantity() {
        return chemquantity;
    }

    public void setChemquantity(Long chemquantity) {
        this.chemquantity = chemquantity;
    }

    public String getQuantity_type() {
        return quantity_type;
    }

    public void setQuantity_type(String quantity_type) {
        this.quantity_type = quantity_type;
    }

    public String getNature() {
        return nature;
    }

    public void setNature(String nature) {
        this.nature = nature;
    }

    public Date getProduction_date() {
        return production_date;
    }

    public void setProduction_date(Date production_date) {
        this.production_date = production_date;
    }

    public Date getExpiry_date() {
        return expiry_date;
    }

    public void setExpiry_date(Date expiry_date) {
        this.expiry_date = expiry_date;
    }

    public Float getpH() {
        return pH;
    }

    public void setpH(Float pH) {
        this.pH = pH;
    }

    public String getHazarduous() {
        return hazarduous;
    }

    public void setHazarduous(String hazarduous) {
        this.hazarduous = hazarduous;
    }


}
