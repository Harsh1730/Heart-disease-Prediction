package com.heartguard;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.heartguard.dto.PredictionRequest;
import com.heartguard.dto.PredictionResponse;
import com.heartguard.service.HeartDiseasePredictionService;
import com.heartguard.service.ModelLoaderService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class HeartDiseasePredictionServiceTest {

    private HeartDiseasePredictionService service;

    @BeforeEach
    public void setup() {
        ModelLoaderService loader = new ModelLoaderService(new ObjectMapper());
        loader.init();
        service = new HeartDiseasePredictionService(loader);
    }

    @Test
    public void testHealthyAthletePrediction() {
        PredictionRequest req = new PredictionRequest();
        req.setAge(30);
        req.setSex("M");
        req.setChestPainType("ATA");
        req.setRestingBP(110);
        req.setCholesterol(170);
        req.setFastingBS(0);
        req.setRestingECG("Normal");
        req.setMaxHR(180);
        req.setExerciseAngina("N");
        req.setOldpeak(0.0);
        req.setStSlope("Up");

        PredictionResponse response = service.predict(req);

        assertNotNull(response);
        assertEquals(0, response.getPrediction(), "Healthy athlete should have 0 prediction (negative)");
        assertTrue(response.getRiskScorePercentage() <= 40.0);
        assertEquals(5, response.getNearestNeighbors().size());
        assertFalse(response.getRecommendations().isEmpty());
    }

    @Test
    public void testHighRiskCardiacPatientPrediction() {
        PredictionRequest req = new PredictionRequest();
        req.setAge(65);
        req.setSex("M");
        req.setChestPainType("ASY");
        req.setRestingBP(165);
        req.setCholesterol(290);
        req.setFastingBS(1);
        req.setRestingECG("ST");
        req.setMaxHR(110);
        req.setExerciseAngina("Y");
        req.setOldpeak(2.8);
        req.setStSlope("Flat");

        PredictionResponse response = service.predict(req);

        assertNotNull(response);
        assertEquals(1, response.getPrediction(), "Severe cardiac symptoms should predict 1 (positive)");
        assertTrue(response.getRiskScorePercentage() >= 60.0);
        assertTrue(response.getRiskFactors().size() >= 3, "Should flag multiple risk factors");
        assertTrue(response.getRecommendations().stream().anyMatch(r -> r.contains("Cardiology Consultation")));
    }
}
