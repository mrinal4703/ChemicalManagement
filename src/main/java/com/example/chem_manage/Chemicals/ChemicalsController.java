package com.example.chem_manage.Chemicals;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("https://localhost:3000")
public class ChemicalsController {
    private final ChemicalsRepository chemicalsRepository;

    @Autowired
    public ChemicalsController(ChemicalsRepository chemicalsRepository){
        this.chemicalsRepository = chemicalsRepository;
    }

    @GetMapping("/getAllChemicals")
    public List<Chemicals> getALlChemicals(){
        return chemicalsRepository.findAll();
    }

    @PostMapping("/newchemicals")
    public Chemicals newChemicals(@RequestBody Chemicals newChemicals){
        try{
            Chemicals saveChemicals = chemicalsRepository.save(newChemicals);
            return saveChemicals;
        }
        catch (Exception e){
            e.printStackTrace();
            throw e;
        }
    }

    @PutMapping("/updateChemical/{id}")
    public ResponseEntity<?> updateChemical(@PathVariable Integer id, @RequestBody Chemicals updatedChemical) {
        try {
            Chemicals existingChemical = chemicalsRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Chemical not found with id " + id));

            existingChemical.setExpiry_date(updatedChemical.getExpiry_date());
            existingChemical.setHazarduous(updatedChemical.getHazarduous());
            existingChemical.setNature(updatedChemical.getNature());
            existingChemical.setpH(updatedChemical.getpH());
            existingChemical.setAssess("Assessed");

            Chemicals updatedChem = chemicalsRepository.save(existingChemical);
            return ResponseEntity.ok(updatedChem);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating chemical: " + e.getMessage());
        }
    }

}
