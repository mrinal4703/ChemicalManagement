package com.example.chem_manage.RawMaterialsProvider;

import jakarta.persistence.*;

@Entity
@Table(name ="rawmaterialsprovider")
public class RawMaterialsProvider {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String provideremail;
    private String providername;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRankk() {
        return rankk;
    }

    public void setRankk(String rankk) {
        this.rankk = rankk;
    }

    private String rankk;

    private String password;

    public RawMaterialsProvider(Integer id, String provideremail, String providername, String providerComp, String rawmaterialsname, String password, String rankk) {
        this.id = id;
        this.provideremail = provideremail;
        this.providername = providername;
        this.providerComp = providerComp;
        this.rawmaterialsname = rawmaterialsname;
        this.password = password;
        this.rankk = rankk;
    }

    public RawMaterialsProvider() {
    }

    private String providerComp;
    private String rawmaterialsname;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getProvideremail() {
        return provideremail;
    }

    public void setProvideremail(String provideremail) {
        this.provideremail = provideremail;
    }

    public String getProvidername() {
        return providername;
    }

    public void setProvidername(String providername) {
        this.providername = providername;
    }

    public String getProviderComp() {
        return providerComp;
    }

    public void setProviderComp(String providerComp) {
        this.providerComp = providerComp;
    }

    public String getRawmaterialsname() {
        return rawmaterialsname;
    }

    public void setRawmaterialsname(String rawmaterialsname) {
        this.rawmaterialsname = rawmaterialsname;
    }


}
