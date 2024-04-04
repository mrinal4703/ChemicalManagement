package com.example.chem_manage.CompanyOrderList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @GetMapping("/getdeliveryforcardsstatus")
    public List<String> getDeliveryStatus() {
        return companyOrderListRepository.getAllOrderStatus();
    }

    @PutMapping("/updateDelivery/{companyEmail}")
    public ResponseEntity<?> updateCompanyOrderList(@PathVariable String companyEmail, @RequestBody CompanyOrderList updatedCompanyList) {
        try {
            Optional<CompanyOrderList> optionalExistingOrderList = companyOrderListRepository.findByCompanyEmail(companyEmail);
            if (optionalExistingOrderList.isPresent()) {
                CompanyOrderList existingOrderList = optionalExistingOrderList.get();
                existingOrderList.setOrder_status(updatedCompanyList.getOrder_status());
                existingOrderList.setDelivered_date(updatedCompanyList.getDelivered_date());
                CompanyOrderList updatedOrderList = companyOrderListRepository.save(existingOrderList);
                return ResponseEntity.ok(updatedOrderList);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating order list: " + e.getMessage());
        }
    }


}
