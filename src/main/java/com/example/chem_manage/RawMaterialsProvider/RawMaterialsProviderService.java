package com.example.chem_manage.RawMaterialsProvider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RawMaterialsProviderService {
    @Autowired
    private RawMaterialsProviderRepository rawMaterialsProviderRepository;

    public List<String> getAllProviderCompNames(){
        return rawMaterialsProviderRepository.findAllbyProviderCompname();
    }
}
