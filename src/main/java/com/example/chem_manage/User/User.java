package com.example.chem_manage.User;

import jakarta.persistence.*;

@Entity
@Table(name="user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;

    public String getRankk() {
        return rankk;
    }

    public void setRankk(String rankk) {
        this.rankk = rankk;
    }

    private String rankk;

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Column(unique = true)
    private String email;
    private String password;
    public User(Integer id, String name, String rankk, String email, String password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.rankk = rankk;
        this.password = password;
    }
    public User() {
    }
}
