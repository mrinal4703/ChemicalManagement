package com.example.chem_manage.RawMaterials;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("https://localhost:3000")
public class RawMaterialsController {
    private RawMaterialsRepository rawMaterialsRepository;
//    private RawMaterialsService rawMaterialsService;

    @Autowired
    public RawMaterialsController(RawMaterialsRepository rawMaterialsRepository) {this.rawMaterialsRepository=rawMaterialsRepository;}

    @PostMapping("/neworderforrawmaterials")
    public RawMaterials newReport(@RequestBody RawMaterials newRawMaterials) {
        System.out.println("Received new report request: " + newRawMaterials.toString());

        try {
            RawMaterials savedRawMaterials = rawMaterialsRepository.save(newRawMaterials);
            System.out.println("Saved report: " + savedRawMaterials.toString());
            return savedRawMaterials;
        } catch (Exception e) {
            System.err.println("Error saving report: " + e.getMessage());
            e.printStackTrace();
            throw e; // Rethrow the exception or handle it appropriately
        }
    }

    @GetMapping("/getrawmaterials")
    public List<RawMaterials> getAllRawMaterials(){return rawMaterialsRepository.findAll();}

//    @PutMapping("/updatetrack/{id}")
//    public ResponseEntity<String> updateTrack(@PathVariable Integer id, @RequestBody String track) {
//        try {
//            Optional<RawMaterials> rawMaterialOptional = rawMaterialsRepository.findById(id);
//            if (rawMaterialOptional.isPresent()) {
//                RawMaterials rawMaterial = rawMaterialOptional.get();
//
//                rawMaterial.setTrack(track);
//
//                rawMaterialsRepository.save(rawMaterial);
//
//                return ResponseEntity.ok("Track updated successfully");
//            } else {
//                return ResponseEntity.notFound().build();
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating track: " + e.getMessage());
//        }
//    }

    @PutMapping("/updatetrack/{id}")
    public ResponseEntity<String> updateTrack(@PathVariable Integer id, @RequestParam String track) {
        try {
            Optional<RawMaterials> rawMaterialOptional = rawMaterialsRepository.findById(id);
            if (rawMaterialOptional.isPresent()) {
                RawMaterials rawMaterial = rawMaterialOptional.get();

                rawMaterial.setTrack(track);

                rawMaterialsRepository.save(rawMaterial);

                return ResponseEntity.ok("Track updated successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating track: " + e.getMessage());
        }
    }


}
