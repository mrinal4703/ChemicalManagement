package com.example.chem_manage.CompanyOrders;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@CrossOrigin("https://localhost:3000")
public class CompanyOrdersController {
    private CompanyOrdersRepository companyOrdersRepository;
    @Autowired
    public CompanyOrdersController(CompanyOrdersRepository companyOrdersRepository){
        this.companyOrdersRepository=companyOrdersRepository;
    }
    @PostMapping("/newcompanysignup")
    public CompanyOrders newSignup(@RequestBody CompanyOrders newCompanyOrders){
        try{
            CompanyOrders savedCompanyOrders = companyOrdersRepository.save(newCompanyOrders);
            return savedCompanyOrders;
        }
        catch (Exception e){
            e.printStackTrace();
            throw e;
        }
    }

    @GetMapping("/getreport/company/{companyEmail}")
    public List<Object[]> getReportByCompanyEmail(@PathVariable String companyEmail) {
        return companyOrdersRepository.findCompanyOrdersAndOrderListByCompanyEmail(companyEmail);
    }

    @GetMapping("/getreport/all")
    public List<Object[]> getAllCompanyOrdersAndOrderList() {
        return companyOrdersRepository.findAllCompanyOrdersAndOrderList();
    }

    @GetMapping("/getreport/count")
    public Integer getCountOfAllCompanyOrdersAndOrderList() {
        return companyOrdersRepository.findCompanyOrdersAndOrderListCount();
    }
}
