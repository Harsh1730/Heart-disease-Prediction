package com.heartguard.controller;

import com.heartguard.dto.*;
import com.heartguard.service.HeartDiseasePredictionService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class HeartDiseasePredictionController {

    private final HeartDiseasePredictionService predictionService;

    public HeartDiseasePredictionController(HeartDiseasePredictionService predictionService) {
        this.predictionService = predictionService;
    }

    @PostMapping("/predict")
    public ResponseEntity<PredictionResponse> predict(@Valid @RequestBody PredictionRequest request) {
        PredictionResponse response = predictionService.predict(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/predict/batch")
    public ResponseEntity<BatchPredictionResponse> predictBatch(@Valid @RequestBody BatchPredictionRequest batchRequest) {
        BatchPredictionResponse response = predictionService.predictBatch(batchRequest);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/presets")
    public ResponseEntity<List<PresetPatient>> getPresets() {
        return ResponseEntity.ok(predictionService.getPresets());
    }

    @GetMapping("/model/info")
    public ResponseEntity<ModelInfoResponse> getModelInfo() {
        return ResponseEntity.ok(predictionService.getModelInfo());
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> getHealth() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("service", "CardioGuard AI Clinical Engine");
        health.put("version", "1.0.0");
        health.put("timestamp", Instant.now().toString());
        health.put("framework", "Spring Boot 3.3.4");
        return ResponseEntity.ok(health);
    }
}
