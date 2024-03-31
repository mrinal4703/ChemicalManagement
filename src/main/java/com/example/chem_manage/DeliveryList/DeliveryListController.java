package com.example.chem_manage.DeliveryList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("https://localhost:3000")
public class DeliveryListController {
    private DeliveryListRepository deliveryListRepository;

    @Autowired
    public DeliveryListController(DeliveryListRepository deliveryListRepository){
        this.deliveryListRepository=deliveryListRepository;
    }

    @PostMapping("/cofirmdelivery")
    public DeliveryList newConfirmedDelivery(@RequestBody DeliveryList newDeliveryList){
        try{
            DeliveryList savedDeliveryList = deliveryListRepository.save(newDeliveryList);
            return savedDeliveryList;
        }
        catch (Exception e){
            e.printStackTrace();
            throw e;
        }
    }
}
