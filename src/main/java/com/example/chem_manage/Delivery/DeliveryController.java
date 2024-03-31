package com.example.chem_manage.Delivery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("https://localhost:3000")
public class DeliveryController {
    private DeliveryRepository deliveryRepository;

    @Autowired
    public DeliveryController(DeliveryRepository deliveryRepository){
        this.deliveryRepository=deliveryRepository;
    }

    @PostMapping("/generatedelivery")
    public Delivery newRegisteredOrder(@RequestBody Delivery newDelivery){
        try{
            Delivery savedDelivery = deliveryRepository.save(newDelivery);
            return savedDelivery;
        }
        catch(Exception e){
            e.printStackTrace();
            throw e;
        }
    }

    @GetMapping("/getdeliveryforcards")
    public List<Object[]> getDeliveryfromCompany() {
        return deliveryRepository.findAllDeliveryWithCompanyOrdersAndOrderList();
    }
}
