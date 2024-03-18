package com.example.chem_manage.ChemicalReport;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name="chemicalreport")
public class ChemicalReport {
    public ChemicalReport() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

//    public String getChemcode() {
//        return chemcode;
//    }
//
//    public void setChemcode(String chemcode) {
//        this.chemcode = chemcode;
//    }
//
//    public String chemcode;
    public Float getpH() {
        return pH;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    private String name;

    public void setpH(Float pH) {
        this.pH = pH;
    }

    private Float pH;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getHazarduous() {
        return hazarduous;
    }

    public void setHazarduous(String hazarduous) {
        this.hazarduous = hazarduous;
    }

    public String getNature() {
        return nature;
    }

    public void setNature(String nature) {
        this.nature = nature;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public Date getExpiry_date() {
        return expiry_date;
    }

    public void setExpiry_date(Date expiry_date) {
        this.expiry_date = expiry_date;
    }

    private String hazarduous;
    private String nature;
    private Long quantity;
    private Date expiry_date;

    public Date getProduction_date() {
        return production_date;
    }

    public void setProduction_date(Date production_date) {
        this.production_date = production_date;
    }

    private Date production_date;

    public String getQuantity_type() {
        return quantity_type;
    }

    public void setQuantity_type(String quantity_type) {
        this.quantity_type = quantity_type;
    }

    private String quantity_type;
    private String volatility;

    public String getVolatility() {
        return volatility;
    }

    public void setVolatility(String volatility) {
        this.volatility = volatility;
    }

    public String getToxicity() {
        return toxicity;
    }

    public void setToxicity(String toxicity) {
        this.toxicity = toxicity;
    }

    public String getPersistence() {
        return persistence;
    }

    public void setPersistence(String persistence) {
        this.persistence = persistence;
    }

    private String toxicity;
    private String persistence;

    public ChemicalReport(Integer id, String name, String quantity_type, String hazarduous, String nature, Float pH, Long quantity, Date expiry_date, Date production_date, String volatility, String toxicity, String persistence) {
        this.id = id;
        this.name = name;
        this.quantity_type = quantity_type;
//        this.chemcode = chemcode;
        this.hazarduous = hazarduous;
        this.nature = nature;
        this.quantity = quantity;
        this.pH = pH;
        this.expiry_date = expiry_date;
        this.production_date = production_date;
        this.volatility = volatility;
        this.toxicity = toxicity;
        this.persistence = persistence;
    }


}
