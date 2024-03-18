package com.example.chem_manage.RawMaterialsProvider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("https://localhost:3000")
public class RawMaterialsProviderController {
    private RawMaterialsProviderRepository rawMaterialsProviderRepository;
    private RawMaterialsProviderService rawMaterialsProviderService;

    @Autowired
    RawMaterialsProviderController(RawMaterialsProviderRepository rawMaterialsProviderRepository, RawMaterialsProviderService rawMaterialsProviderService) {this.rawMaterialsProviderRepository = rawMaterialsProviderRepository;this.rawMaterialsProviderService = rawMaterialsProviderService;}

    @PostMapping("/newcompanysignup")
    public RawMaterialsProvider newSignup(@RequestBody RawMaterialsProvider newRawMaterialsProvider){
        try{
            RawMaterialsProvider savedRawMaterialsProvider = rawMaterialsProviderRepository.save(newRawMaterialsProvider);
            return savedRawMaterialsProvider;
        }
        catch (Exception e){
            e.printStackTrace();
            throw e;
        }
    }

    @GetMapping("/rawmaterialproviderslist")
    public List<RawMaterialsProvider> getAllRawMaterialRPoviders(){
        return rawMaterialsProviderRepository.findAll();
    }

    @GetMapping("/providercompnames")
    public List<String> getAllProviderCompNames() {
        return rawMaterialsProviderService.getAllProviderCompNames();
    }

}
