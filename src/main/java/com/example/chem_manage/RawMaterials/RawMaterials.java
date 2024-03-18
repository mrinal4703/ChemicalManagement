package com.example.chem_manage.RawMaterials;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name="rawmaterials")
public class RawMaterials {

    public Date getOrdertime() {
        return ordertime;
    }

    public void setOrdertime(Date ordertime) {
        this.ordertime = ordertime;
    }

    private Date ordertime;
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

//    public String getRawmaterial_name() {
//        return rawmaterial_name;
//    }
//
//    public void setRawmaterial_name(String rawmaterial_name) {
//        this.rawmaterial_name = rawmaterial_name;
//    }

    public String getRawmaterial_for() {
        return rawmaterial_for;
    }

    public void setRawmaterial_for(String rawmaterial_for) {
        this.rawmaterial_for = rawmaterial_for;
    }

    public String getOrdereremail() {
        return ordereremail;
    }

    public void setOrdereremail(String ordereremail) {
        this.ordereremail = ordereremail;
    }

    private String ordereremail;
//    public Long getTimetaken() {
//        return timetaken;
//    }
//
//    public void setTimetaken(Long timetaken) {
//        this.timetaken = timetaken;
//    }

//    private Long timetaken;
    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public String getTrack() {
        return track;
    }

    public void setTrack(String track) {
        this.track = track;
    }

    public void updateTrack(String track) {
        setTrack("Ready");
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
//    private String rawmaterial_name;
    private String rawmaterial_for;

    private Long quantity;
    private String track;
    public RawMaterials() {
    }

    public Date getFinishtime() {
        return finishtime;
    }

    public void setFinishtime(Date finishtime) {
        this.finishtime = finishtime;
    }

    public Date finishtime;

    public String getProviderComp() {
        return providerComp;
    }

    public void setProviderComp(String providerComp) {
        this.providerComp = providerComp;
    }

    public String providerComp;


//    public Chemicals getChemicals() {
//        return chemicals;
//    }
//
//    public void setChemicals(Chemicals chemicals) {
//        this.chemicals = chemicals;
//    }
//
//    @ManyToOne
//    @JoinColumn(name = "id")
//    private Chemicals chemicals;

    public RawMaterials(Integer id,  String ordereremail, Date ordertime, Date finishtime, String rawmaterial_for, Long quantity, String track, String providerComp) {
        this.id = id;
//        this.timetaken = timetaken;
//        this.rawmaterial_name = rawmaterial_name;
        this.rawmaterial_for = rawmaterial_for;
        this.quantity = quantity;
        this.track = track;
        this.ordereremail = ordereremail;
        this.ordertime = ordertime;
        this.finishtime = finishtime;
        this.providerComp = providerComp;
    }


}
