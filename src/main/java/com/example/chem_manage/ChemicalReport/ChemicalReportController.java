package com.example.chem_manage.ChemicalReport;

import com.example.chem_manage.Chemicals.ResourceNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin("https://localhost:3000")
public class ChemicalReportController {

    private final ChemicalReportRepository chemicalReportRepository;

    @Autowired
    public ChemicalReportController(ChemicalReportRepository chemicalReportRepository) {this.chemicalReportRepository=chemicalReportRepository;}

    @PostMapping("/newreport")
    public ChemicalReport newReport(@RequestBody ChemicalReport newChemicalReport) {
        System.out.println("Received new report request: " + newChemicalReport.toString());

        try {
            ChemicalReport savedChemicalReport = chemicalReportRepository.save(newChemicalReport);
            System.out.println("Saved report: " + savedChemicalReport.toString());
            return savedChemicalReport;
        } catch (Exception e) {
            System.err.println("Error saving report: " + e.getMessage());
            e.printStackTrace();
            throw e; // Rethrow the exception or handle it appropriately
        }
    }

    @GetMapping("/getreport/{id}")
    public List<ChemicalReport> getChemicalReportbyId(@PathVariable Integer id){
        return chemicalReportRepository.findAllById(Collections.singleton(id));
    }

    @GetMapping("/chemical-reports")
    public List<ChemicalReport> getAllChemicalReports() {
        return chemicalReportRepository.findAll();
    }

    @GetMapping("/chemical-reports/{hazarduous}")
    public List<ChemicalReport> getChemicalReportsByHazarduous(@PathVariable String hazarduous) {
        return chemicalReportRepository.findByHazarduous(hazarduous);
    }

    @PutMapping("/updateChemicalReport/{id}")
    public ResponseEntity<?> updateChemicalReport(@PathVariable Integer id, @RequestBody ChemicalReport updatedChemicalReport) {
        try {
            ChemicalReport existingChemicalReport = chemicalReportRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Chemical not found with id " + id));

            existingChemicalReport.setExpiry_date(updatedChemicalReport.getExpiry_date());
            existingChemicalReport.setHazarduous(updatedChemicalReport.getHazarduous());
            existingChemicalReport.setNature(updatedChemicalReport.getNature());
            existingChemicalReport.setVolatility(updatedChemicalReport.getVolatility());
            existingChemicalReport.setToxicity(updatedChemicalReport.getToxicity());
            existingChemicalReport.setPersistence(updatedChemicalReport.getPersistence());
            existingChemicalReport.setpH(updatedChemicalReport.getpH());

            ChemicalReport updatedChemReport = chemicalReportRepository.save(existingChemicalReport);
            return ResponseEntity.ok(updatedChemReport);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating chemical: " + e.getMessage());
        }
    }

    @Modifying
    @Transactional
    @PutMapping("/updateChemicalReportQuantities")
    public ResponseEntity<?> updateChemicalReportQuantities(@RequestBody List<Map<String, Object>> updates) {
        try {
            for (Map<String, Object> update : updates) {
                String name = (String) update.get("name");
                Long quantity = ((Number) update.get("quantity")).longValue();

                Optional<ChemicalReport> chemicalOptional = chemicalReportRepository.findByName(name);
                if (chemicalOptional.isEmpty()) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Chemical not found with name " + name);
                }
                ChemicalReport chemical = chemicalOptional.get();

                Long updatedQuantity = chemical.getQuantity() - quantity;
                if (updatedQuantity < 0) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Quantity cannot be negative.");
                }

                chemical.setQuantity(updatedQuantity);
                chemicalReportRepository.save(chemical);
            }
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating chemical report quantities: " + e.getMessage());
        }
    }

}
