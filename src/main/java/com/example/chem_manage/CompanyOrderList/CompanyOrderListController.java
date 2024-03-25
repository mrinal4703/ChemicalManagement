package com.example.chem_manage.CompanyOrderList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("https://localhost:3000")
public class CompanyOrderListController {
    private CompanyOrderListRepository companyOrderListRepository;
    @Autowired
    public CompanyOrderListController(CompanyOrderListRepository companyOrderListRepository){
        this.companyOrderListRepository = companyOrderListRepository;
    }


    @GetMapping("/getcompanyorders")
    public List<CompanyOrderList> getAllOrders(){return companyOrderListRepository.findAll();}

    @PostMapping("/orderchemicals")
    public CompanyOrderList newCompnayOrderList(@RequestBody CompanyOrderList newcompanyOrderList){
        try{
            CompanyOrderList saveCompanyOrderList = companyOrderListRepository.save(newcompanyOrderList);
            return saveCompanyOrderList;
        }
        catch (Exception e){
            e.printStackTrace();
            throw e;
        }
    }

}
