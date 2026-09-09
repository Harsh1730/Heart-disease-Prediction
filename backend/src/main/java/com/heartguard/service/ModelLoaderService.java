package com.heartguard.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.heartguard.model.ModelData;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.InputStream;

@Service
public class ModelLoaderService {
    private static final Logger logger = LoggerFactory.getLogger(ModelLoaderService.class);
    
    private final ObjectMapper objectMapper;
    private ModelData modelData;

    public ModelLoaderService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @PostConstruct
    public void init() {
        try {
            logger.info("Loading ML Model parameters from classpath: model_data.json...");
            ClassPathResource resource = new ClassPathResource("model_data.json");
            try (InputStream is = resource.getInputStream()) {
                this.modelData = objectMapper.readValue(is, ModelData.class);
            }
            logger.info("Successfully loaded ML Model: {} with {} neighbors, {} training points and {} feature dimensions.",
                    modelData.getAlgorithm(),
                    modelData.getnNeighbors(),
                    modelData.getTotalSamples(),
                    modelData.getColumns().size());
        } catch (Exception e) {
            logger.error("FATAL: Failed to load model_data.json from classpath!", e);
            throw new IllegalStateException("Could not load model_data.json", e);
        }
    }

    public ModelData getModelData() {
        return modelData;
    }
}
